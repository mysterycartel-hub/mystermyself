// ============================================================
// Resend Email Module — MysterMyself
// Handles transactional emails (welcome, receipts, notifications)
// Canon: noreply@mystermyself.com | Brand: @mysterycartel
// ============================================================

interface SendEmailOptions {
  to: string
  subject: string
  html: string
  replyTo?: string
}

interface WelcomeEmailOptions {
  to: string
  name?: string
  lane?: string
}

const RESEND_API_KEY = process.env.RESEND_API_KEY ?? ''
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL ?? 'noreply@mystermyself.com'
const BRAND_NAME = 'MysterMyself'
const HANDLE = '@mysterycartel'

/**
 * Send a transactional email via Resend API.
 * Returns { success: true, id } on success or { success: false, error } on failure.
 */
export async function sendEmail(options: SendEmailOptions): Promise<{ success: boolean; id?: string; error?: string }> {
  if (!RESEND_API_KEY) {
    console.warn('[resend] No RESEND_API_KEY configured — email not sent')
    return { success: false, error: 'RESEND_API_KEY not configured' }
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: `${BRAND_NAME} <${FROM_EMAIL}>`,
        to: options.to,
        subject: options.subject,
        html: options.html,
        reply_to: options.replyTo ?? 'mysterycartel@gmail.com',
      }),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      console.error('[resend] Send failed:', response.status, errorData)
      return { success: false, error: `Resend API error: ${response.status}` }
    }

    const data = await response.json()
    return { success: true, id: data.id }
  } catch (error) {
    console.error('[resend] Network error:', error)
    return { success: false, error: 'Network error sending email' }
  }
}

/**
 * Send a welcome email after newsletter signup.
 * Personalizes based on lane (interest area) if provided.
 */
export async function sendWelcomeEmail(options: WelcomeEmailOptions): Promise<{ success: boolean; id?: string; error?: string }> {
  const { to, name, lane } = options

  const greeting = name ? `Hey ${name}` : 'Hey'
  const laneContent = getLaneContent(lane)

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0;padding:0;background-color:#060608;font-family:system-ui,-apple-system,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#060608;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;">
          <!-- Header -->
          <tr>
            <td style="padding:20px 0;text-align:center;">
              <h1 style="color:#C9A84C;font-size:28px;margin:0;letter-spacing:2px;">
                MYSTERMYSELF
              </h1>
              <p style="color:#F5F0E8;font-size:12px;margin:4px 0 0;letter-spacing:1px;">
                SCOTT-KING COAST
              </p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="background-color:#0A0A0C;padding:32px;border-radius:8px;border:1px solid #1a1a1f;">
              <h2 style="color:#F5F0E8;font-size:22px;margin:0 0 16px;">
                ${greeting}, you're in The Opportunity List.
              </h2>
              <p style="color:#F5F0E8;font-size:15px;line-height:1.6;margin:0 0 20px;">
                Welcome to Scott-King Coast. Nine districts. One system. Your legacy starts now.
              </p>

              ${laneContent}

              <p style="color:#F5F0E8;font-size:15px;line-height:1.6;margin:20px 0;">
                Every week you get drops — income plays, lessons, tools, and opportunities from across the Coast.
              </p>

              <!-- CTA -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center" style="padding:24px 0;">
                    <a href="https://mystermyself.com/coast"
                       style="background-color:#C9A84C;color:#060608;padding:14px 32px;text-decoration:none;font-weight:bold;font-size:14px;letter-spacing:1px;border-radius:4px;display:inline-block;">
                      EXPLORE THE COAST
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:24px 0;text-align:center;">
              <p style="color:#666;font-size:12px;margin:0;">
                ${HANDLE} · mystermyself.com
              </p>
              <p style="color:#444;font-size:11px;margin:8px 0 0;">
                You signed up for The Opportunity List. Unsubscribe anytime from your Beehiiv preferences.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`

  return sendEmail({
    to,
    subject: `You're in The Opportunity List — ${BRAND_NAME}`,
    html,
  })
}

/**
 * Returns lane-specific content block for the welcome email.
 */
function getLaneContent(lane?: string): string {
  if (!lane) return ''

  const lanes: Record<string, string> = {
    interest_trading_chef: `
      <div style="background-color:#060608;padding:16px;border-radius:6px;border-left:3px solid #C9A84C;margin:16px 0;">
        <p style="color:#C9A84C;font-size:13px;margin:0 0 4px;letter-spacing:1px;">YOUR LANE: MARKET MARINA</p>
        <p style="color:#F5F0E8;font-size:14px;margin:0;line-height:1.5;">
          Trading Chef University content coming your way. XAUUSD lessons, kitchen metaphors, and the 8-step Road Map.
          TCU Master Law: No Sweep. No Shift. No Trade.
        </p>
      </div>`,
    interest_route_harbor: `
      <div style="background-color:#060608;padding:16px;border-radius:6px;border-left:3px solid #0EA5E9;margin:16px 0;">
        <p style="color:#0EA5E9;font-size:13px;margin:0 0 4px;letter-spacing:1px;">YOUR LANE: ROUTE HARBOR</p>
        <p style="color:#F5F0E8;font-size:14px;margin:0;line-height:1.5;">
          Courier income drops. Medical courier routes, pharmacy connections, and how to build without job boards.
        </p>
      </div>`,
    interest_food: `
      <div style="background-color:#060608;padding:16px;border-radius:6px;border-left:3px solid #F97316;margin:16px 0;">
        <p style="color:#F97316;font-size:13px;margin:0 0 4px;letter-spacing:1px;">YOUR LANE: FLAVOR DISTRICT</p>
        <p style="color:#F5F0E8;font-size:14px;margin:0;line-height:1.5;">
          Breaded Or Not?! updates. Food business intel, pop-up drops, and catering plays.
          Feeding the World, One Wing at a Time.
        </p>
      </div>`,
    interest_ai: `
      <div style="background-color:#060608;padding:16px;border-radius:6px;border-left:3px solid #8B5CF6;margin:16px 0;">
        <p style="color:#8B5CF6;font-size:13px;margin:0 0 4px;letter-spacing:1px;">YOUR LANE: BLUEPRINT BAY</p>
        <p style="color:#F5F0E8;font-size:14px;margin:0;line-height:1.5;">
          AI tools, automation systems, agent workflows. Build smarter, not harder.
        </p>
      </div>`,
    interest_content: `
      <div style="background-color:#060608;padding:16px;border-radius:6px;border-left:3px solid #EC4899;margin:16px 0;">
        <p style="color:#EC4899;font-size:13px;margin:0 0 4px;letter-spacing:1px;">YOUR LANE: CREATOR PIER</p>
        <p style="color:#F5F0E8;font-size:14px;margin:0;line-height:1.5;">
          Content funnels, YouTube strategies, affiliate systems, and newsletter growth plays.
        </p>
      </div>`,
  }

  return lanes[lane] ?? ''
}
