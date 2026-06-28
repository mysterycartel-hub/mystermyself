# Implementation Plan: Rumble Launch Content

## Overview

Create the complete content production asset structure for "The Claude Chronicles" Rumble launch under `/content/rumble-launch/`. This involves creating 11 static files (markdown and .srt) across 2 subdirectories on branch `ops/rumble-launch-v1`. No application code, dependencies, or build configuration is modified.

## Tasks

- [ ] 1. Create directory structure and Episode 1 script
  - [x] 1.1 Create `/content/rumble-launch/episode-01/script.md`
    - Create directory structure `/content/rumble-launch/episode-01/`
    - Write the full Episode 1 script with title "I Lost Weeks Of Work Because AI Forgot Everything — So I Built My Own System"
    - Include Metadata section (Series, Episode, Target Duration 8–12 min, Handle @mysterycartel)
    - Include ElevenLabs Direction section (voice name, pacing, tone, accent: West Palm Beach Caribbean-American)
    - Include CapCut Specs section (duration range, transition style, lower-thirds format, end card specs)
    - Write 1600–2400 words of spoken dialogue across minimum 5 numbered scenes with timestamps
    - Cover topics: AI memory loss, canon anchors, session state management, relay agent architecture
    - Reference @mysterycartel in intro and outro; reference Trading Chef avatar in scene directions
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7, 2.8, 2.9, 10.1, 10.3, 10.5_

  - [ ] 1.2 Create `/content/rumble-launch/episode-01/thumbnail-brief.md`
    - Specify dimensions (1280×720 px) and 90% safe zone
    - Specify Trading Chef avatar placement (quadrant + 50%–80% canvas height)
    - Specify text overlay (hook text, Bebas Neue headline, Space Mono secondary, weight, min size)
    - Assign Brand_Colors only (Black #060608, Gold #C9A84C, Red, Green, Fire Orange) to background, text, accent
    - Describe emotional tone (1–3 target emotions) and visual hook (primary contrast element)
    - Specify background composition treatment (solid/gradient/scene imagery)
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 10.4, 10.5_

  - [ ] 1.3 Create `/content/rumble-launch/episode-01/veo3-prompts.md`
    - Write one prompt per scene matching script scene numbers (50–200 words each)
    - For Trading Chef scenes: describe avatar pose, expression, environment
    - For non-avatar scenes: describe primary subject, environment, text/graphics
    - Reference Brand_Colors for all visual environments
    - Specify per prompt: camera movement, lighting descriptor, animation style
    - Specify 16:9 aspect ratio and target duration in seconds per prompt
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7, 10.4, 10.5_

  - [ ] 1.4 Create `/content/rumble-launch/episode-01/captions.srt`
    - Follow SubRip format: sequential integer IDs starting at 1
    - Use placeholder timestamps `00:00:00,000 --> 00:00:00,000` for all blocks
    - One block per spoken sentence/phrase from script (exclude stage directions, ElevenLabs notes, CapCut specs)
    - Max 42 characters per line, max 2 lines per block
    - Maintain same scene order as script
    - Blank line separator between blocks
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5, 5.6_

- [ ] 2. Checkpoint — Verify Episode 1 assets
  - Ensure all 4 episode files exist at correct paths
  - Verify script word count is 1600–2400
  - Verify captions have no lines exceeding 42 characters
  - Verify all Brand_Colors references use approved palette only
  - Verify @mysterycartel handle used (not @mysterymyself)
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 3. Create short-form clip scripts
  - [ ] 3.1 Create `/content/rumble-launch/shorts/short-01-ai-drift.md`
    - Create directory structure `/content/rumble-launch/shorts/`
    - Write 110–225 words of spoken dialogue (targeting 45–90 sec)
    - Start with hook line as first sentence of script body
    - Include Metadata (Series: The Claude Chronicles — Shorts, Short: 01, Duration: 45–90s, Aspect Ratio: 9:16, Handle: @mysterycartel)
    - Include ElevenLabs Direction (voice name, pacing, tone)
    - Include CapCut Specs (9:16 aspect ratio, target duration, at least 3 timestamped edit cues)
    - Include Visual Direction section
    - Self-contained — all info needed to produce the short is in the file
    - Reference @mysterycartel at least once
    - _Requirements: 6.1, 6.6, 6.7, 6.8, 6.9, 6.10, 6.11, 10.1, 10.3_

  - [ ] 3.2 Create `/content/rumble-launch/shorts/short-02-the-fix.md`
    - Same structure and constraints as short-01
    - 110–225 words spoken dialogue, hook line first, self-contained
    - ElevenLabs Direction, CapCut Specs (≥3 edit cues), Visual Direction
    - Reference @mysterycartel at least once
    - _Requirements: 6.2, 6.6, 6.7, 6.8, 6.9, 6.10, 6.11, 10.1, 10.3_

  - [ ] 3.3 Create `/content/rumble-launch/shorts/short-03-five-businesses.md`
    - Same structure and constraints as short-01
    - 110–225 words spoken dialogue, hook line first, self-contained
    - ElevenLabs Direction, CapCut Specs (≥3 edit cues), Visual Direction
    - Reference @mysterycartel at least once
    - _Requirements: 6.3, 6.6, 6.7, 6.8, 6.9, 6.10, 6.11, 10.1, 10.3_

  - [ ] 3.4 Create `/content/rumble-launch/shorts/short-04-switching-to-claude.md`
    - Same structure and constraints as short-01
    - 110–225 words spoken dialogue, hook line first, self-contained
    - ElevenLabs Direction, CapCut Specs (≥3 edit cues), Visual Direction
    - Reference @mysterycartel at least once
    - _Requirements: 6.4, 6.6, 6.7, 6.8, 6.9, 6.10, 6.11, 10.1, 10.3_

  - [ ] 3.5 Create `/content/rumble-launch/shorts/short-05-relay-system.md`
    - Same structure and constraints as short-01
    - 110–225 words spoken dialogue, hook line first, self-contained
    - ElevenLabs Direction, CapCut Specs (≥3 edit cues), Visual Direction
    - Reference @mysterycartel at least once
    - _Requirements: 6.5, 6.6, 6.7, 6.8, 6.9, 6.10, 6.11, 10.1, 10.3_

- [ ] 4. Checkpoint — Verify short-form scripts
  - Ensure all 5 short script files exist at correct paths
  - Verify each script is 110–225 words of spoken dialogue
  - Verify hook line is first sentence of script body in each file
  - Verify each has ElevenLabs Direction, CapCut Specs (≥3 edit cues), Visual Direction
  - Verify @mysterycartel referenced in each; @mysterymyself absent
  - Verify each is self-contained (no cross-references to other script files)
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 5. Create shorts shared production assets
  - [ ] 5.1 Create `/content/rumble-launch/shorts/thumbnail-brief.md`
    - Define shared layout template (Bebas Neue font, avatar size, background treatment)
    - Specify dimensions (1280×720 px)
    - Include a section for each of the 5 shorts with: hook text (max 6 words), text position, avatar position, avatar size
    - Reference only Brand_Colors (Black, Gold, Red, Green, Fire Orange)
    - Flag any hook text exceeding 6 words for revision
    - Describe Trading Chef avatar with: chef hat, apron, gold chain, urban cartoon style
    - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5, 7.6, 7.7, 10.4, 10.5_

  - [ ] 5.2 Create `/content/rumble-launch/shorts/veo3-prompts.md`
    - Include labeled section for each short matching script filenames (short-01-ai-drift through short-05-relay-system)
    - 2–5 scene prompts per short
    - Describe Trading Chef avatar attire (chef hat, apron, gold chain), style (confident Black male, urban cartoon), environment
    - Reference Brand_Colors by name AND hex value (Black #060608, Gold #C9A84C, Red, Green, Fire Orange)
    - Specify camera movement, lighting mood, animation style per prompt
    - For non-avatar scenes: describe primary visual subject and environment
    - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5, 8.6, 8.7, 10.4, 10.5_

- [ ] 6. Final checkpoint — Verify complete file tree and brand compliance
  - Verify all 11 files exist at their designated paths
  - Verify no files created outside `/content/rumble-launch/`
  - Verify @mysterycartel used everywhere; @mysterymyself absent from all files
  - Verify Brand_Colors only in all visual spec files
  - Verify Trading Chef described with chef hat, apron, gold chain, urban cartoon style in all avatar references
  - Verify "MysterMyself" or "Trading Chef" used in brand references (no abbreviations)
  - Confirm all work is on branch `ops/rumble-launch-v1`
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- No property-based tests apply — this feature produces static content files with no runtime behavior
- All files are markdown (.md) except captions (.srt)
- Maurice (CEO) does not code or run terminal commands — all implementation is handled by the coding agent
- All commits target branch `ops/rumble-launch-v1` only; no merge to main without CEO approval
- No application code, UI components, configuration files, or dependencies are modified
- Checkpoints ensure incremental validation of content structure and brand compliance
- Each task references specific requirements for traceability

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1.1"] },
    { "id": 1, "tasks": ["1.2", "1.3", "1.4"] },
    { "id": 2, "tasks": ["3.1"] },
    { "id": 3, "tasks": ["3.2", "3.3", "3.4", "3.5"] },
    { "id": 4, "tasks": ["5.1", "5.2"] }
  ]
}
```
