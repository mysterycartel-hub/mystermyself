"use client"

import React from "react"
import MagicTree, { type MagicNode } from "@/components/ui/magic-tree"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

const SIGNUP = '/opportunity-list'

// Scott-King Coast district + resource structure
const coastStructure: MagicNode[] = [
  {
    id: "coast",
    name: "Scott-King Coast",
    type: "folder",
    sparkle: true,
    children: [
      {
        id: "route-harbor",
        name: "Route Harbor",
        type: "folder",
        sparkle: true,
        children: [
          { id: "rh-1", name: "Medical Courier Insider Edge.pdf", type: "file", sparkle: true },
          { id: "rh-2", name: "Route Harbor Method.md", type: "file" },
          { id: "rh-3", name: "Courier Income Lab", type: "folder", children: [
            { id: "rh-3-1", name: "outreach-scripts.md", type: "file" },
            { id: "rh-3-2", name: "route-math.csv", type: "file" },
          ]},
        ],
      },
      {
        id: "market-marina",
        name: "Market Marina (TCU)",
        type: "folder",
        sparkle: true,
        children: [
          { id: "mm-1", name: "8-Step Curriculum.md", type: "file", sparkle: true },
          { id: "mm-2", name: "XAUUSD Playbook.md", type: "file" },
          { id: "mm-3", name: "Characters", type: "folder", children: [
            { id: "mm-3-1", name: "Chef Goldie.json", type: "file", sparkle: true },
            { id: "mm-3-2", name: "Wickie.json", type: "file" },
            { id: "mm-3-3", name: "Louie Liquidity.json", type: "file" },
          ]},
        ],
      },
      {
        id: "fantasy-island",
        name: "Fantasy Island",
        type: "folder",
        children: [
          { id: "fi-1", name: "Draft Bible.pdf", type: "file", sparkle: true },
          { id: "fi-2", name: "Live Rankings.csv", type: "file" },
          { id: "fi-3", name: "Injury Alerts", type: "folder", children: [
            { id: "fi-3-1", name: "week-alerts.json", type: "file" },
          ]},
        ],
      },
      {
        id: "creator-pier",
        name: "Creator Pier",
        type: "folder",
        sparkle: true,
        children: [
          {
            id: "ai-vault",
            name: "AI Tool Vault",
            type: "folder",
            sparkle: true,
            children: [
              { id: "ai-1", name: "Claude.md", type: "file", sparkle: true },
              { id: "ai-2", name: "Canva.md", type: "file" },
              { id: "ai-3", name: "Beehiiv.md", type: "file" },
              { id: "ai-4", name: "Remotion.md", type: "file" },
            ],
          },
          {
            id: "affiliate-vault",
            name: "Affiliate Picks",
            type: "folder",
            children: [
              { id: "aff-1", name: "tools-with-programs.csv", type: "file" },
              { id: "aff-2", name: "disclosure-template.md", type: "file" },
            ],
          },
        ],
      },
      {
        id: "blueprint-bay",
        name: "Blueprint Bay",
        type: "folder",
        children: [
          { id: "bb-1", name: "automation-roadmap.md", type: "file" },
          { id: "bb-2", name: "[LOCKED] agents", type: "folder" },
        ],
      },
    ],
  },
  {
    id: "design-system",
    name: "Design System",
    type: "folder",
    sparkle: true,
    children: [
      { id: "ds-1", name: "mystermyself-design-system.md", type: "file", sparkle: true },
      { id: "ds-2", name: "route-harbor.md", type: "file" },
      { id: "ds-3", name: "trading-chef-universe.md", type: "file" },
      { id: "ds-4", name: "fantasy-island.md", type: "file" },
    ],
  },
]

export default function ToolVaultClient() {
  const [selectedNode, setSelectedNode] = React.useState<MagicNode | null>(null)

  return (
    <section style={{
      minHeight: '100vh',
      padding: 'clamp(120px, 15vw, 160px) clamp(20px, 5vw, 80px) 80px',
      background: 'var(--black)',
    }}>
      {/* Header */}
      <div style={{ marginBottom: 48 }}>
        <div className="section-label">
          <div className="section-label-line" style={{ background: '#A855F7' }} />
          <span className="section-label-text" style={{ color: '#A855F7' }}>Creator Pier</span>
        </div>
        <h1 style={{
          fontFamily: '"Bebas Neue", sans-serif',
          fontSize: 'clamp(3rem, 7vw, 6rem)',
          lineHeight: 0.92,
          letterSpacing: '0.02em',
          marginBottom: 16,
        }}>
          TOOL <span style={{ color: '#A855F7' }}>VAULT</span>
        </h1>
        <p style={{
          fontSize: '0.82rem',
          color: 'rgba(245,240,232,0.5)',
          fontFamily: '"Space Mono", monospace',
          lineHeight: 1.8,
          maxWidth: 520,
        }}>
          The full Scott-King Coast district structure, AI tools, affiliate resources, and
          design system — all in one place.
        </p>
      </div>

      {/* Two-column layout */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(280px, 400px) 1fr',
        gap: 'clamp(24px, 4vw, 48px)',
        alignItems: 'start',
      }}>
        {/* Tree panel */}
        <Card className="border border-[#A855F7]/20 bg-[#0d0d10]">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-mono uppercase tracking-widest text-[#A855F7]">
              District Explorer
            </CardTitle>
            <CardDescription className="text-xs" style={{ color: 'rgba(245,240,232,0.3)' }}>
              Click to expand. Select any node.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <MagicTree
              data={coastStructure}
              onSelect={(node) => setSelectedNode(node)}
            />
          </CardContent>
        </Card>

        {/* Detail panel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <Card className="border border-[#A855F7]/20 bg-[#0d0d10]">
            <CardHeader>
              <CardTitle style={{
                fontFamily: '"Bebas Neue", sans-serif',
                fontSize: '1.6rem',
                letterSpacing: '0.04em',
                color: selectedNode ? '#A855F7' : 'rgba(245,240,232,0.2)',
              }}>
                {selectedNode ? selectedNode.name : 'Select a node'}
              </CardTitle>
              {selectedNode && (
                <CardDescription style={{ color: 'rgba(245,240,232,0.4)', fontFamily: '"Space Mono", monospace', fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
                  {selectedNode.type} {selectedNode.sparkle ? '· ✦ sparkle' : ''} {selectedNode.children ? `· ${selectedNode.children.length} children` : ''}
                </CardDescription>
              )}
            </CardHeader>
            {selectedNode && (
              <CardContent>
                <Separator className="mb-4 bg-[#A855F7]/20" />
                <p style={{
                  fontSize: '0.75rem',
                  color: 'rgba(245,240,232,0.45)',
                  fontFamily: '"Space Mono", monospace',
                  lineHeight: 1.8,
                }}>
                  {selectedNode.type === 'folder'
                    ? `This folder contains ${selectedNode.children?.length ?? 0} item${(selectedNode.children?.length ?? 0) !== 1 ? 's' : ''}. Expand to explore.`
                    : `File node: ${selectedNode.name}. Subscribe to The Opportunity List to get access to resources as they are published.`}
                </p>
                {selectedNode.type === 'file' && (
                  <a
                    href={SIGNUP}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-block',
                      marginTop: 20,
                      padding: '10px 24px',
                      background: '#A855F7',
                      color: '#060608',
                      fontFamily: '"Space Mono", monospace',
                      fontSize: '0.62rem',
                      fontWeight: 700,
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      textDecoration: 'none',
                    }}
                  >
                    Get Access via Newsletter →
                  </a>
                )}
              </CardContent>
            )}
          </Card>

          {/* Affiliate disclosure */}
          <p style={{
            fontSize: '0.6rem',
            color: 'rgba(245,240,232,0.2)',
            fontFamily: '"Space Mono", monospace',
            lineHeight: 1.7,
          }}>
            <strong style={{ color: 'rgba(245,240,232,0.3)' }}>Affiliate Disclosure:</strong>{' '}
            MysterMyself may earn a commission from qualifying purchases through links in the Tool Vault.
            This does not affect recommendations.
          </p>
        </div>
      </div>
    </section>
  )
}
