 "use client";

import { useState } from "react";

/* ═══════════════════════════════════════════════════
   TCU SOUND IDENTITY SYSTEM
   Trading Chef University · Market Kitchen
   Urban × Jamaican × American × Original
═══════════════════════════════════════════════════ */

const GOLD = "#F59E0B";
const DARK = "#0A0500";

const CHARACTERS = [
  {
    name: "Grandma Market",
    icon: "👵🏾",
    lens: "Market Laws",
    color: "#A78BFA",
    motif: "Warm piano · vinyl crackle · calm bell",
    motifFeel: "Like a Sunday morning in a wise woman's kitchen. Slow. Certain. Timeless.",
    bpm: "60–72",
    instruments: ["Grand piano", "Vinyl surface noise", "Soft bell", "Upright bass (sparse)"],
    tag: "ANCHOR",
    sampleLine: "Markets move between extremes.",
    audioShape: "Gentle descending melody. Never rushed. Feels like it's been playing forever."
  },
  {
    name: "Nana Value",
    icon: "🧓🏾",
    lens: "Accepted Value · Premium · Discount",
    color: "#FCD34D",
    motif: "Soft keys · warm bass · gentle balance tone",
    motifFeel: "Practical, calm, and precise. She can tell when price is too expensive or too cheap.",
    bpm: "70–82",
    instruments: ["Rhodes keys", "Warm pad", "Soft bass", "Gentle bell"],
    tag: "VALUE",
    sampleLine: "Price and value are not the same.",
    audioShape: "Balanced, centered melody that resolves cleanly."
  },
  {
    name: "Louie Liquidity",
    icon: "💧",
    lens: "Destination · Flow · Hunting",
    color: "#06B6D4",
    motif: "Sneaky bassline · water drops · ticking hi-hat",
    motifFeel: "Calculated. Slick. Like someone who already knows where you're going before you do.",
    bpm: "88–96",
    instruments: ["Funk bassline", "Water drop FX", "Closed hi-hat", "Muted electric piano"],
    tag: "TENSION",
    sampleLine: "I live where the stops are. Find me, find the money.",
    audioShape: "Groove-based. Repetitive. Feels like it's circling something. Never resolves fully."
  },
  {
    name: "Chef Goldie",
    icon: "👨🏾‍🍳",
    lens: "Structure · Control · Framework",
    color: "#F59E0B",
    motif: "Bright brass · confident drums",
    motifFeel: "Bold. Organized. In charge. The head chef calling orders in a busy kitchen.",
    bpm: "100–110",
    instruments: ["Trumpet stab", "Snare hit", "Upbeat brass ensemble", "Clap on 2&4"],
    tag: "POWER",
    sampleLine: "Structure is shifting. Read the kitchen.",
    audioShape: "Short, punchy motif. 4–6 notes. Sounds like a call to attention."
  },
  {
    name: "Rico Rhythm",
    icon: "🥁",
    lens: "Cycle · Timing · Phases",
    color: "#EC4899",
    motif: "Drums · claps · session countdown",
    motifFeel: "Dancehall energy meets school bell. Rhythmic and educational at the same time.",
    bpm: "96–108",
    instruments: ["Riddim drum pattern", "Hand clap", "Woodblock count", "Steel pan accent"],
    tag: "PULSE",
    sampleLine: "The rhythm is changing. Feel the session.",
    audioShape: "Syncopated Caribbean-influenced pattern. The beat you can count to. Repeatable."
  },
  {
    name: "Candle Kid",
    icon: "🕯️",
    lens: "Confirmation · Candlestick Language",
    color: "#FCD34D",
    motif: "Light plucks · spark sounds",
    motifFeel: "Bright, curious, quick. Like a kid discovering something. A moment of clarity.",
    bpm: "95–105",
    instruments: ["Ukulele pluck", "Xylophone hit", "Spark/electric FX", "Bright triangle"],
    tag: "DISCOVERY",
    sampleLine: "Wait for me. Don't chase me.",
    audioShape: "Single bright pluck followed by a pause. The silence after is the lesson."
  },
  {
    name: "Melissa Mayhem",
    icon: "🌪️",
    lens: "Emotion Personified",
    color: "#EF4444",
    motif: "Chaotic glitch · fast heartbeat · record scratch",
    motifFeel: "Panic. FOMO. Everything happening too fast. Recognizable because we've all been there.",
    bpm: "130–145",
    instruments: ["Glitch effect", "Fast 808 kick", "Record scratch", "Distorted piano stab"],
    tag: "CHAOS",
    sampleLine: "*(chases the candle, loses the trade)*",
    audioShape: "Starts normal, rapidly destabilizes. Never fully resolves. The discomfort IS the lesson."
  },
  {
    name: "Melody Mayhem",
    icon: "🎵",
    lens: "Process Personified",
    color: "#10B981",
    motif: "Smooth chords · calm metronome",
    motifFeel: "The opposite of Melissa. Settled. Patient. Every beat is intentional.",
    bpm: "72–85",
    instruments: ["Rhodes electric piano", "Soft metronome tick", "Warm pad", "Subtle bass"],
    tag: "FLOW",
    sampleLine: "*(follows the process, waits for the setup, enters clean)*",
    audioShape: "Even, steady progression. The resolution that Melissa never finds. Satisfying."
  },
  {
    name: "The Trading Chef",
    icon: "👨🏾‍🍳",
    lens: "The Integrator",
    color: "#C9A84C",
    motif: "Full theme — all motifs combined",
    motifFeel: "Everything comes together. Brass + drums + piano + riddim. The complete recipe.",
    bpm: "100",
    instruments: ["Full ensemble", "All character motifs layered", "Choir swell", "Bass anchor"],
    tag: "COMPLETE",
    sampleLine: "Every ingredient has a purpose. The recipe is the trade.",
    audioShape: "Builds from sparse to full. Each section adds a new layer. The final chord is earned."
  }
];

const AUDIO_CUES = [
  { name: "Kitchen Is Open", icon: "🔔", type: "Main Theme", desc: "Intro, YouTube Shorts, loading, missions", feel: "Upbeat march. 88–100 BPM. The world is beginning.", color: "#F59E0B" },
  { name: "Burn Alarm", icon: "🔥", type: "Warning Cue", desc: "Risk signal — something is wrong", feel: "Short amber sound. 2–3 notes descending. Urgent but not scary.", color: "#EF4444" },
  { name: "The Pass", icon: "✅", type: "Entry Cue", desc: "Clean trade setup confirmed", feel: "Single clear chime. Positive. Confident.", color: "#10B981" },
  { name: "Tables Served", icon: "💰", type: "Win Cue", desc: "Trade completed. Lesson absorbed.", feel: "Cash register + plate ding. Warm. Celebratory. Short.", color: "#F59E0B" },
  { name: "No Trade", icon: "🚫", type: "Pass Cue", desc: "Setup not there. Wait.", feel: "Soft stop sound. Not negative — wise. The absence of sound IS the lesson.", color: "#A78BFA" },
  { name: "Roadmap Complete", icon: "⭐", type: "Victory Sting", desc: "Mission or level completed", feel: "Full 3-second sting. Build + release. Celebration.", color: "#06B6D4" }
];

const MAIN_THEME = {
  title: "KITCHEN IS OPEN",
  bpm: "88–100 BPM",
  timeSignature: "4/4",
  feel: "Marching + swaying. Caribbean riddim underpinning a bright American educational hook. Think Gracie's Corner meets dancehall classroom.",
  structure: [
    { section: "INTRO (0–4s)", desc: "TCU sonic logo. 3-note brass hit + plate ding. Drops into beat." },
    { section: "VERSE 1 (4–20s)", desc: "Beat establishes. Chef Goldie brass motif. Confident rhythm. Cooking sounds under the beat." },
    { section: "HOOK (20–36s)", desc: "Full group energy. Kids choir possible. Louie's bassline enters. Rico's riddim locks in." },
    { section: "VERSE 2 (36–52s)", desc: "Characters introduced. Candle Kid plucks. Grandma's piano drops in warm." },
    { section: "BRIDGE (52–60s)", desc: "Melissa chaos moment — beat disrupts. Melody calms it. The lesson in 8 seconds." },
    { section: "OUTRO (60–72s)", desc: "Trading Chef full theme. All motifs layer. Ends on resolution chord." }
  ],
  hook: {
    lines: [
      "Kitchen is open, follow the flow",
      "Price has a place it's trying to go",
      "Wait for the pass, don't chase the flame",
      "Protect the kitchen, play the game"
    ]
  }
};

const YOUTUBE_RULES = [
  { time: "0–2s", rule: "TCU Sonic Logo", detail: "3-note brass hit + plate ding. Every video. No exceptions. Audio brand lock." },
  { time: "2–5s", rule: "Character Motif Enters", detail: "When a character appears, their motif plays. Viewer learns the audio association." },
  { time: "5s+", rule: "Kitchen Is Open Beat", detail: "Trade plan appears. Beat drops. Energy shifts from intro to lesson." },
  { time: "Warning moment", rule: "Burn Alarm", detail: "Any risk, red zone, or don't-do-this moment gets the Burn Alarm cue." },
  { time: "Resolution", rule: "Tables Served / The Pass", detail: "Win = Tables Served. Clean entry = The Pass. These are emotional rewards." },
  { time: "End card", rule: "Roadmap Complete sting if mission done", detail: "Full sting on episode completion. Not every video — only mission completions." }
];

function MotifVisualizer({ character, active }) {
  const heights = {
    ANCHOR: [3,5,8,6,4,7,5,3,6,4,5,3],
    VALUE: [4,5,6,5,4,6,7,6,5,4,5,4],
    TENSION: [4,6,8,7,5,9,6,4,7,5,8,6],
    POWER: [2,8,9,7,2,8,9,7,2,8,9,2],
    PULSE: [6,8,6,8,6,8,6,8,6,8,6,8],
    DISCOVERY: [2,3,8,2,3,8,2,3,9,2,3,2],
    CHAOS: [9,2,8,3,9,1,8,4,9,2,7,9],
    FLOW: [4,5,6,7,6,5,4,5,6,7,6,5],
    COMPLETE: [3,4,5,6,7,8,7,8,9,8,9,9]
  };
  const h = heights[character.tag] || heights.ANCHOR;
  return (
    <div style={{ display:"flex", alignItems:"flex-end", gap:3, height:40, marginTop:10 }}>
      {h.map((v, i) => (
        <div key={i} style={{
          width: 6,
          borderRadius: 3,
          height: active ? `${v * 4}px` : `${v * 1.5}px`,
          background: active ? character.color : character.color + "40",
          transition: `height ${0.15 + i * 0.03}s ease`,
          animation: active ? `barPulse ${0.4 + (i % 3) * 0.15}s ease-in-out infinite alternate` : "none"
        }} />
      ))}
    </div>
  );
}

function CharacterCard({ char, isActive, onClick }) {
  return (
    <div onClick={() => onClick(char.name)}
      style={{
        background: isActive ? `linear-gradient(135deg, ${char.color}20 0%, ${char.color}08 100%)` : "rgba(255,255,255,0.02)",
        border: `1px solid ${isActive ? char.color + "60" : char.color + "20"}`,
        borderRadius: 16,
        padding: "18px 20px",
        cursor: "pointer",
        transition: "all 0.25s",
        transform: isActive ? "scale(1.02)" : "scale(1)"
      }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:10 }}>
        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          <span style={{ fontSize:28, filter: isActive ? `drop-shadow(0 0 8px ${char.color})` : "none" }}>{char.icon}</span>
          <div>
            <div style={{ fontSize:13, fontWeight:700, color: char.color, letterSpacing:"0.05em" }}>{char.name}</div>
            <div style={{ fontSize:10, opacity:0.5, marginTop:2, letterSpacing:"0.08em" }}>{char.tag}</div>
          </div>
        </div>
        <div style={{ fontSize:9, padding:"3px 10px", borderRadius:20, background: char.color + "20", color: char.color, fontWeight:700, letterSpacing:"0.1em" }}>{char.bpm} BPM</div>
      </div>

      <div style={{ fontSize:11, color: char.color, opacity:0.8, marginBottom:6, fontStyle:"italic" }}>{char.lens}</div>
      <MotifVisualizer character={char} active={isActive} />

      {isActive && (
        <div style={{ marginTop:14, borderTop: `1px solid ${char.color}20`, paddingTop:14 }}>
          <SectionLabel color={char.color}>MOTIF</SectionLabel>
          <div style={{ fontSize:12, opacity:0.75, marginBottom:10 }}>{char.motif}</div>
          <SectionLabel color={char.color}>FEEL</SectionLabel>
          <div style={{ fontSize:12, opacity:0.75, lineHeight:1.7, marginBottom:10 }}>{char.motifFeel}</div>
          <SectionLabel color={char.color}>INSTRUMENTS</SectionLabel>
          <div style={{ display:"flex", flexWrap:"wrap", gap:6, marginBottom:12 }}>
            {char.instruments.map(inst => (
              <span key={inst} style={{ fontSize:10, padding:"3px 10px", borderRadius:20, background: char.color + "15", border: `1px solid ${char.color}30`, color: char.color }}>{inst}</span>
            ))}
          </div>
          <SectionLabel color={char.color}>AUDIO SHAPE</SectionLabel>
          <div style={{ fontSize:12, opacity:0.7, lineHeight:1.7, marginBottom:10 }}>{char.audioShape}</div>
          <div style={{ padding:"12px 16px", borderRadius:10, background: char.color + "10", border: `1px solid ${char.color}25`, fontSize:12, fontStyle:"italic", opacity:0.85 }}>"{char.sampleLine}"</div>
        </div>
      )}
    </div>
  );
}

function SectionLabel({ children, color }) {
  return <div style={{ fontSize:11, fontWeight:700, color, marginBottom:6, letterSpacing:"0.1em" }}>{children}</div>;
}

function CueCard({ cue }) {
  const [pulse, setPulse] = useState(false);
  return (
    <div onClick={() => { setPulse(true); setTimeout(() => setPulse(false), 600); }}
      style={{
        background: pulse ? cue.color + "20" : "rgba(255,255,255,0.02)",
        border: `1px solid ${pulse ? cue.color : cue.color + "30"}`,
        borderRadius:14,
        padding:"16px 18px",
        cursor:"pointer",
        transition:"all 0.2s",
        transform: pulse ? "scale(1.03)" : "scale(1)"
      }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:8 }}>
        <div style={{ display:"flex", alignItems:"center", gap:8 }}>
          <span style={{ fontSize:22, animation: pulse ? "cuePulse 0.3s ease" : "none" }}>{cue.icon}</span>
          <div>
            <div style={{ fontSize:12, fontWeight:700, color: cue.color }}>{cue.name}</div>
            <div style={{ fontSize:9, opacity:0.45, letterSpacing:"0.1em", marginTop:1 }}>{cue.type.toUpperCase()}</div>
          </div>
        </div>
        {pulse && <div style={{ fontSize:9, color: cue.color, fontWeight:700, letterSpacing:"0.1em" }}>▶ PLAYING</div>}
      </div>
      <div style={{ fontSize:11, opacity:0.6, lineHeight:1.6, marginBottom:6 }}>{cue.desc}</div>
      <div style={{ fontSize:11, fontStyle:"italic", opacity:0.75, color: cue.color }}>{cue.feel}</div>
    </div>
  );
}

export default function TCUSoundIdentitySystem() {
  const [activeChar, setActiveChar] = useState(null);
  const [tab, setTab] = useState("theme");

  const tabs = [
    { id: "theme", label: "Main Theme", icon: "🎵" },
    { id: "characters", label: "Character Motifs", icon: "🎭" },
    { id: "cues", label: "Audio Cues", icon: "🔔" },
    { id: "youtube", label: "YouTube Rules", icon: "📺" },
    { id: "dna", label: "Cultural DNA", icon: "🌍" }
  ];

  return (
    <div style={{ minHeight:"100vh", background:`linear-gradient(180deg, ${DARK} 0%, #0D0700 50%, ${DARK} 100%)`, color:"#E8D5A3", fontFamily:"Georgia, 'Times New Roman', serif", padding:"0 0 60px" }}>
      <div style={{ background:`linear-gradient(180deg, rgba(245,158,11,0.12) 0%, transparent 100%)`, borderBottom:"1px solid rgba(245,158,11,0.2)", padding:"32px 24px 28px" }}>
        <div style={{ maxWidth:900, margin:"0 auto" }}>
          <div style={{ display:"flex", alignItems:"center", gap:14, marginBottom:16 }}>
            <span style={{ fontSize:44, filter:"drop-shadow(0 0 16px #F59E0B)" }}>🍳</span>
            <div>
              <div style={{ fontSize:10, letterSpacing:"0.3em", color:GOLD, opacity:0.7, marginBottom:6 }}>TRADING CHEF UNIVERSITY · SOUND IDENTITY SYSTEM</div>
              <h1 style={{ fontSize:"clamp(24px,5vw,42px)", fontWeight:900, background:"linear-gradient(135deg, #F59E0B 0%, #FCD34D 50%, #D97706 100%)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text", lineHeight:1.1, letterSpacing:"0.06em" }}>TCU SOUND IDENTITY</h1>
              <div style={{ fontSize:13, opacity:0.55, marginTop:8, fontStyle:"italic" }}>Chart + Character + Sound + Mission · Urban × Jamaican × American × Original</div>
            </div>
          </div>
          <div style={{ background:"rgba(245,158,11,0.06)", border:"1px solid rgba(245,158,11,0.2)", borderRadius:12, padding:"12px 18px", fontSize:12, lineHeight:1.8, opacity:0.8, maxWidth:760 }}>
            <strong style={{ color:GOLD }}>Why sound:</strong> Music is not background decoration. It is a learning anchor. Each character has a sonic identity that triggers recognition before a single word is spoken.
          </div>
        </div>
      </div>

      <div style={{ borderBottom:"1px solid rgba(245,158,11,0.15)", padding:"0 24px", display:"flex", gap:4, overflowX:"auto", background:"rgba(10,5,0,0.6)", backdropFilter:"blur(10px)", position:"sticky", top:0, zIndex:50 }}>
        {tabs.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{ padding:"14px 18px", background:"transparent", border:"none", borderBottom: tab === t.id ? `2px solid ${GOLD}` : "2px solid transparent", color: tab === t.id ? GOLD : "rgba(232,213,163,0.45)", cursor:"pointer", fontSize:12, fontWeight:700, letterSpacing:"0.08em", whiteSpace:"nowrap", transition:"all 0.2s" }}>
            {t.icon} {t.label.toUpperCase()}
          </button>
        ))}
      </div>

      <main style={{ maxWidth:900, margin:"0 auto", padding:"32px 24px" }}>
        {tab === "theme" && (
          <section>
            <div style={{ textAlign:"center", marginBottom:32 }}>
              <div style={{ fontSize:11, letterSpacing:"0.3em", color:GOLD, marginBottom:12 }}>MAIN THEME</div>
              <h2 style={{ fontSize:"clamp(28px,6vw,52px)", fontWeight:900, color:GOLD, letterSpacing:"0.1em", marginBottom:8 }}>"{MAIN_THEME.title}"</h2>
              <p style={{ fontSize:13, opacity:0.65, maxWidth:580, margin:"0 auto", lineHeight:1.8, fontStyle:"italic" }}>{MAIN_THEME.feel}</p>
            </div>

            <Panel title="THE HOOK">
              <div style={{ display:"flex", flexDirection:"column", gap:10, marginBottom:16 }}>
                {MAIN_THEME.hook.lines.map((line, i) => (
                  <div key={i} style={{ display:"flex", alignItems:"center", gap:14, padding:"12px 18px", borderRadius:12, background:i < 2 ? "rgba(6,182,212,0.08)" : "rgba(245,158,11,0.08)", border:`1px solid ${i < 2 ? "rgba(6,182,212,0.2)" : "rgba(245,158,11,0.2)"}` }}>
                    <span style={{ fontSize:13, fontWeight:700, color:i < 2 ? "#06B6D4" : GOLD, width:16, opacity:0.6 }}>{i + 1}</span>
                    <span style={{ fontSize:15, fontStyle:"italic", letterSpacing:"0.03em" }}>{line}</span>
                  </div>
                ))}
              </div>
              <div style={{ fontSize:12, opacity:0.6, lineHeight:1.8, padding:"12px 0", borderTop:"1px solid rgba(245,158,11,0.15)" }}>
                <strong style={{ color:GOLD }}>Lines 1+2</strong> = market truth. <strong style={{ color:"#06B6D4" }}>Lines 3+4</strong> = discipline.
              </div>
            </Panel>

            <SectionHeader>SONG STRUCTURE</SectionHeader>
            <Stack>
              {MAIN_THEME.structure.map((s, i) => (
                <GridRow key={i} left={s.section} right={s.desc} />
              ))}
            </Stack>
          </section>
        )}

        {tab === "characters" && (
          <section>
            <Intro title="CHARACTER MOTIFS">Every character has a sonic identity. When they appear on screen, their motif plays before a word is spoken.</Intro>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(280px, 1fr))", gap:16 }}>
              {CHARACTERS.map(char => (
                <CharacterCard key={char.name} char={char} isActive={activeChar === char.name} onClick={(name) => setActiveChar(prev => prev === name ? null : name)} />
              ))}
            </div>
          </section>
        )}

        {tab === "cues" && (
          <section>
            <Intro title="PSYCHOLOGY AUDIO CUES">These cues are the emotional punctuation of the TCU experience. They signal the lesson before the explanation.</Intro>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(260px, 1fr))", gap:16 }}>
              {AUDIO_CUES.map(cue => <CueCard key={cue.name} cue={cue} />)}
            </div>
          </section>
        )}

        {tab === "youtube" && (
          <section>
            <Intro title="YOUTUBE AUDIO RULES">Every TCU video uses the same audio language. Viewers should know they are in the Kitchen within two seconds.</Intro>
            <Stack>
              {YOUTUBE_RULES.map((rule, i) => (
                <GridRow key={i} left={`${rule.time} · ${rule.rule}`} right={rule.detail} />
              ))}
            </Stack>
          </section>
        )}

        {tab === "dna" && (
          <section>
            <Intro title="CULTURAL DNA">TCU sound is not generic educational music. It is original, personalized, and culturally rooted.</Intro>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(280px, 1fr))", gap:16 }}>
              {[
                { flag:"🇯🇲", label:"Jamaican Riddim", color:"#10B981", desc:"Rico Rhythm's syncopated pattern underpins the entire sound. The bounce, sway, and count." },
                { flag:"🇺🇸", label:"American Educational Pop", color:"#3B82F6", desc:"Bright melody, simple hook, repetition-first design. Proven learning formulas without copying style." },
                { flag:"🏙️", label:"Urban Confidence", color:"#F59E0B", desc:"Brass stabs, snare cracks, trap hi-hats, confident energy. A kitchen that commands respect." },
                { flag:"⭐", label:"Original TCU Identity", color:"#A855F7", desc:"No sample flips. No borrowed hooks. Everything built character-up from TCU canon." }
              ].map(dna => (
                <div key={dna.label} style={{ background:dna.color + "08", border:`1px solid ${dna.color}25`, borderRadius:16, padding:"22px" }}>
                  <div style={{ fontSize:32, marginBottom:10 }}>{dna.flag}</div>
                  <div style={{ fontSize:13, fontWeight:700, color:dna.color, marginBottom:10 }}>{dna.label}</div>
                  <div style={{ fontSize:12, opacity:0.75, lineHeight:1.8 }}>{dna.desc}</div>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>

      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        button { font-family: inherit; }
        ::-webkit-scrollbar { width: 5px; height: 5px; }
        ::-webkit-scrollbar-track { background: #0A0500; }
        ::-webkit-scrollbar-thumb { background: rgba(245,158,11,0.3); border-radius: 3px; }
        @keyframes barPulse { from { opacity: 0.7; } to { opacity: 1; } }
        @keyframes cuePulse { from { transform: scale(1.3); } to { transform: scale(1); } }
      `}</style>
    </div>
  );
}

function Intro({ title, children }) {
  return (
    <div style={{ marginBottom:24 }}>
      <SectionHeader>{title}</SectionHeader>
      <p style={{ fontSize:13, opacity:0.6, lineHeight:1.8, maxWidth:640 }}>{children}</p>
    </div>
  );
}

function SectionHeader({ children }) {
  return <div style={{ fontSize:11, letterSpacing:"0.2em", color:GOLD, marginBottom:16, fontWeight:700 }}>{children}</div>;
}

function Panel({ title, children }) {
  return (
    <div style={{ background:"linear-gradient(135deg, rgba(245,158,11,0.12) 0%, rgba(245,158,11,0.04) 100%)", border:"1px solid rgba(245,158,11,0.3)", borderRadius:20, padding:28, marginBottom:28 }}>
      <SectionHeader>{title}</SectionHeader>
      {children}
    </div>
  );
}

function Stack({ children }) {
  return <div style={{ display:"flex", flexDirection:"column", gap:10 }}>{children}</div>;
}

function GridRow({ left, right }) {
  return (
    <div style={{ display:"grid", gridTemplateColumns:"160px 1fr", gap:16, alignItems:"start", padding:"14px 18px", borderRadius:12, background:"rgba(255,255,255,0.02)", border:"1px solid rgba(245,158,11,0.12)" }}>
      <div style={{ fontSize:11, fontWeight:700, color:GOLD, opacity:0.8 }}>{left}</div>
      <div style={{ fontSize:12, opacity:0.75, lineHeight:1.6 }}>{right}</div>
    </div>
  );
}
