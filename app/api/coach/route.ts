import { NextRequest, NextResponse } from 'next/server'
import { buildCoachSystemPrompt, buildCoachUserPrompt } from '@/lib/kitchen'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function POST(req: NextRequest) {
  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    return NextResponse.json(
      { error: 'ANTHROPIC_API_KEY not configured' },
      { status: 503 }
    )
  }

  let symbol = 'XAUUSD'
  let timeframe = '1H'

  try {
    const body = await req.json()
    if (body.symbol)    symbol    = String(body.symbol).slice(0, 20)
    if (body.timeframe) timeframe = String(body.timeframe).slice(0, 10)
  } catch {
    // use defaults
  }

  const systemPrompt = buildCoachSystemPrompt()
  const userPrompt   = buildCoachUserPrompt(symbol, timeframe)

  try {
    const anthropicRes = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'anthropic-beta': 'messages-2023-12-15',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 1024,
        stream: true,
        system: systemPrompt,
        messages: [{ role: 'user', content: userPrompt }],
      }),
    })

    if (!anthropicRes.ok) {
      const err = await anthropicRes.text()
      return NextResponse.json(
        { error: `Anthropic API error: ${anthropicRes.status}` },
        { status: 502 }
      )
    }

    // Stream the response back to the client
    const stream = new TransformStream<Uint8Array, Uint8Array>()
    const writer = stream.writable.getWriter()
    const encoder = new TextEncoder()
    const decoder = new TextDecoder()

    // Process SSE from Anthropic and extract text deltas
    ;(async () => {
      try {
        const reader = anthropicRes.body!.getReader()
        while (true) {
          const { done, value } = await reader.read()
          if (done) break

          const chunk = decoder.decode(value, { stream: true })
          const lines = chunk.split('\n')

          for (const line of lines) {
            if (!line.startsWith('data: ')) continue
            const data = line.slice(6).trim()
            if (data === '[DONE]') continue

            try {
              const evt = JSON.parse(data)
              if (evt.type === 'content_block_delta' && evt.delta?.type === 'text_delta') {
                await writer.write(encoder.encode(evt.delta.text))
              }
            } catch {
              // skip malformed SSE lines
            }
          }
        }
      } finally {
        writer.close()
      }
    })()

    return new NextResponse(stream.readable, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Transfer-Encoding': 'chunked',
        'Cache-Control': 'no-cache',
      },
    })
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : 'Unknown error'
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
