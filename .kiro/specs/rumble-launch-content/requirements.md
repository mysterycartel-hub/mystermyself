# Requirements Document

## Introduction

This specification defines the content production asset structure for "The Claude Chronicles" Rumble launch. The deliverable is a folder-and-file structure inside the mystermyself repo under `/content/rumble-launch/` containing all scripts, production briefs, visual generation prompts, and caption scaffolds needed to produce Episode 1 (long-form, 8–12 minutes) and 5 short-form clips (45–90 seconds each). No UI or application code is affected. All work commits to branch `ops/rumble-launch-v1` and is not merged to main without CEO approval.

## Glossary

- **Content_System**: The folder and file structure under `/content/rumble-launch/` in the mystermyself repository
- **Episode_Folder**: A directory at `/content/rumble-launch/episode-01/` containing all production assets for the long-form episode
- **Shorts_Folder**: A directory at `/content/rumble-launch/shorts/` containing all production assets for the 5 short-form clips
- **Script_File**: A markdown file containing the full spoken-word script with scene breakdowns, timing cues, and voiceover direction
- **Thumbnail_Brief**: A markdown file specifying the visual composition, text overlay, colors, and avatar placement for a video thumbnail
- **VEO3_Prompts_File**: A markdown file containing scene-by-scene AI video generation prompts for Google VEO 3
- **Captions_File**: An `.srt`-structured file providing the caption scaffold (timecoded placeholder segments) for a video
- **Trading_Chef**: The animated caricature avatar representing the MysterMyself brand on video content — Black male, chef hat, apron, gold chain, glasses, confident, urban cartoon style
- **Brand_Colors**: The approved color palette — Black (#060608), Gold (#C9A84C), Red, Green, Fire Orange
- **Handle**: The Rumble channel identity `@mysterycartel`
- **ElevenLabs_Direction**: Voice synthesis guidance specifying tone, pacing, and delivery style for AI voiceover
- **CapCut_Specs**: Edit specifications including transition types, text animation styles, and timing references for CapCut video editing

## Requirements

### Requirement 1: Folder Structure Creation

**User Story:** As the CEO, I want a standardized content folder structure in the repo, so that all Rumble launch production assets are organized and discoverable.

#### Acceptance Criteria

1. THE Content_System SHALL contain a root directory at `/content/rumble-launch/`
2. THE Content_System SHALL contain an Episode_Folder at `/content/rumble-launch/episode-01/`
3. THE Content_System SHALL contain a Shorts_Folder at `/content/rumble-launch/shorts/`
4. THE Content_System SHALL place all Episode 1 production assets inside the Episode_Folder, where production assets are defined as script files, thumbnail briefs, VEO3 prompt files, and caption scaffolds associated with the episode
5. THE Content_System SHALL place all short-form clip production assets inside the Shorts_Folder, where short-form clip production assets are defined as script files, thumbnail briefs, and VEO3 prompt files associated with individual short clips
6. IF a production asset cannot be classified as belonging to either the Episode_Folder or the Shorts_Folder, THEN THE Content_System SHALL place the asset in the `/content/rumble-launch/` root directory
7. THE Content_System SHALL NOT permit production asset files to exist at any location outside of `/content/rumble-launch/` or its subdirectories

### Requirement 2: Episode 1 Script File

**User Story:** As the CEO, I want a complete script for Episode 1 "I Lost Weeks Of Work Because AI Forgot Everything — So I Built My Own System", so that voiceover and video production can begin.

#### Acceptance Criteria

1. THE Episode_Folder SHALL contain a file named `script.md`
2. THE Script_File SHALL include the episode title "I Lost Weeks Of Work Because AI Forgot Everything — So I Built My Own System"
3. THE Script_File SHALL contain between 1600 and 2400 words of spoken dialogue to target a runtime of 8 to 12 minutes
4. THE Script_File SHALL contain a minimum of 5 numbered scene sections with timestamps indicating approximate start times
5. THE Script_File SHALL cover the following topics in separate sections: AI memory loss problem, canon anchors, session state management, and relay agent architecture
6. THE Script_File SHALL include an ElevenLabs_Direction section containing at minimum a voice name, pacing descriptor (e.g., conversational, slow on key points), tone descriptor (e.g., calm, direct, confident), and accent reference (West Palm Beach, Caribbean-American)
7. THE Script_File SHALL include a CapCut_Specs section containing at minimum: target duration range, transition style between scenes, lower-third text format, and end card specifications
8. THE Script_File SHALL reference the Handle `@mysterycartel` at least once in the intro section and at least once in the outro section
9. THE Script_File SHALL reference the Trading_Chef avatar as the on-screen persona in the scene direction notes

### Requirement 3: Episode 1 Thumbnail Brief

**User Story:** As the CEO, I want a thumbnail design brief for Episode 1, so that the thumbnail can be produced to brand standards.

#### Acceptance Criteria

1. THE Episode_Folder SHALL contain a file named `thumbnail-brief.md`
2. THE Thumbnail_Brief SHALL specify the Trading_Chef caricature avatar placement by identifying the canvas quadrant (left, right, or center) and the approximate percentage of canvas height the avatar occupies (between 50% and 80%)
3. THE Thumbnail_Brief SHALL specify text overlay content including the exact hook text to display, the font family (Bebas Neue for headline, Space Mono for secondary text), font weight, and minimum font size readable at 1280×720 rendered at 200×112 pixels
4. THE Thumbnail_Brief SHALL reference only Brand_Colors (Black, Gold, Red, Green, Fire Orange) and SHALL assign a specific Brand_Color to each visual element (background, text, accent)
5. THE Thumbnail_Brief SHALL specify the recommended image dimensions (1280×720 pixels) and a safe zone of 90% of canvas width and height within which all text and key visual elements must remain
6. THE Thumbnail_Brief SHALL describe the emotional tone by naming 1 to 3 target emotions and SHALL describe the visual hook by specifying the primary contrast element (color contrast, scale contrast, or expression) intended to drive click-through
7. THE Thumbnail_Brief SHALL specify the background composition treatment describing whether the background uses a solid color, gradient, or scene imagery behind the avatar and text layers

### Requirement 4: Episode 1 VEO 3 Prompts

**User Story:** As the CEO, I want scene-by-scene VEO 3 video generation prompts for Episode 1, so that AI-generated visuals can be produced for each script section.

#### Acceptance Criteria

1. THE Episode_Folder SHALL contain a file named `veo3-prompts.md`
2. THE VEO3_Prompts_File SHALL contain one prompt per scene matching the scene numbers in the Script_File, with each prompt containing between 50 and 200 words
3. WHEN a scene involves the Trading_Chef avatar, THE VEO3_Prompts_File SHALL describe the avatar as an animated caricature and specify the avatar's pose, facial expression, and surrounding environment
4. THE VEO3_Prompts_File SHALL reference Brand_Colors for all visual environments
5. THE VEO3_Prompts_File SHALL specify per prompt: a named camera movement (e.g., slow zoom, pan, static, orbit), a lighting descriptor (e.g., cinematic low-key, neon glow, soft ambient, dramatic rim light), and an animation style descriptor (e.g., motion graphics, 3D render, stylized 2D, cinematic realism)
6. THE VEO3_Prompts_File SHALL specify a 16:9 aspect ratio and a target clip duration in seconds for each prompt
7. IF a scene does not involve the Trading_Chef avatar, THEN THE VEO3_Prompts_File SHALL describe the primary visual subject, environment, and on-screen text or graphic elements for that scene

### Requirement 5: Episode 1 Captions Scaffold

**User Story:** As the CEO, I want a captions file scaffold for Episode 1, so that subtitle timing can be finalized after voiceover recording.

#### Acceptance Criteria

1. THE Episode_Folder SHALL contain a file named `captions.srt`
2. THE Captions_File SHALL follow the SubRip (.srt) format where each caption block consists of a sequential integer ID starting at 1, a timestamp line, one or two lines of caption text, and a blank line separator
3. THE Captions_File SHALL contain placeholder timestamps using `00:00:00,000 --> 00:00:00,000` for every caption block, indicating that real timing will be inserted after voiceover recording
4. THE Captions_File SHALL include one caption block per spoken sentence or phrase from the Script_File dialogue, excluding stage directions, ElevenLabs_Direction notes, and CapCut_Specs annotations
5. THE Captions_File SHALL limit each caption text line to a maximum of 42 characters and a maximum of 2 lines per caption block
6. THE Captions_File SHALL contain caption blocks covering all spoken dialogue sections from the Script_File, maintaining the same scene order as the Script_File numbering

### Requirement 6: Short-Form Clip Scripts

**User Story:** As the CEO, I want individual script files for each of the 5 short-form clips, so that each short can be produced independently.

#### Acceptance Criteria

1. THE Shorts_Folder SHALL contain a file named `short-01-ai-drift.md`
2. THE Shorts_Folder SHALL contain a file named `short-02-the-fix.md`
3. THE Shorts_Folder SHALL contain a file named `short-03-five-businesses.md`
4. THE Shorts_Folder SHALL contain a file named `short-04-switching-to-claude.md`
5. THE Shorts_Folder SHALL contain a file named `short-05-relay-system.md`
6. WHEN a short-form Script_File is created, THE Script_File SHALL contain between 110 and 225 words of spoken dialogue to target a runtime of 45 to 90 seconds
7. WHEN a short-form Script_File is created, THE Script_File SHALL begin with a hook line as the first sentence of the script body, positioned before any other dialogue or narration
8. WHEN a short-form Script_File is created, THE Script_File SHALL include an ElevenLabs_Direction section containing at minimum a voice name, pacing descriptor, and tone descriptor for voiceover generation
9. WHEN a short-form Script_File is created, THE Script_File SHALL include a CapCut_Specs section containing at minimum an aspect ratio (9:16), target duration in seconds, and at least 3 timestamped edit cues for cut or transition timing
10. WHEN a short-form Script_File is created, THE Script_File SHALL reference the Handle `@mysterycartel` at least once within the script body or metadata
11. WHEN a short-form Script_File is created, THE Script_File SHALL be self-contained by including all spoken lines, visual direction notes, and production metadata required to produce the short without referencing other script files

### Requirement 7: Shorts Thumbnail Brief

**User Story:** As the CEO, I want a thumbnail brief covering all 5 shorts, so that a consistent thumbnail style is applied across the short-form series.

#### Acceptance Criteria

1. THE Shorts_Folder SHALL contain a file named `thumbnail-brief.md`
2. THE Thumbnail_Brief SHALL include a section for each of the 5 shorts, where each section specifies the hook text overlay (maximum 6 words) and its position on the thumbnail (top, center, or bottom)
3. THE Thumbnail_Brief SHALL specify the Trading_Chef caricature avatar placement for each thumbnail using a defined screen position (left, right, or center) and relative size (small, medium, or large)
4. THE Thumbnail_Brief SHALL reference only Brand_Colors (Black, Gold, Red, Green, Fire Orange)
5. THE Thumbnail_Brief SHALL specify recommended dimensions (1280×720 pixels)
6. THE Thumbnail_Brief SHALL define a shared layout template (specifying consistent font style, avatar size, and background treatment) used across all 5 thumbnails, with only the hook text and background image varying per short
7. IF any short's hook text exceeds 6 words, THEN THE Thumbnail_Brief SHALL flag that entry for revision

### Requirement 8: Shorts VEO 3 Prompts

**User Story:** As the CEO, I want VEO 3 prompts for all 5 short-form clips, so that AI-generated visuals can be produced for each short.

#### Acceptance Criteria

1. THE Shorts_Folder SHALL contain a file named `veo3-prompts.md`
2. THE VEO3_Prompts_File SHALL contain a labeled section for each of the 5 shorts, with section headings that include the short number and topic matching the short-form Script_File names (short-01-ai-drift, short-02-the-fix, short-03-five-businesses, short-04-switching-to-claude, short-05-relay-system)
3. WHEN a short involves the Trading_Chef avatar, THE VEO3_Prompts_File SHALL describe the avatar's attire (chef hat, apron, gold chain), physical style (confident Black male, urban cartoon), and the surrounding environment
4. THE VEO3_Prompts_File SHALL reference Brand_Colors by name and hex value (Black #060608, Gold #C9A84C, Red, Green, Fire Orange) for all visual environments
5. THE VEO3_Prompts_File SHALL specify camera movement, lighting mood, and animation style for each prompt
6. THE VEO3_Prompts_File SHALL contain at least 2 and no more than 5 scene prompts per short, where each prompt targets a segment of the 45 to 90 second total runtime
7. IF a short does not involve the Trading_Chef avatar, THEN THE VEO3_Prompts_File SHALL describe the primary visual subject and environment for that short's prompts

### Requirement 9: Branch and Commit Standards

**User Story:** As the CEO, I want all content committed to a dedicated branch without merging, so that I retain full approval control.

#### Acceptance Criteria

1. THE Content_System SHALL commit all files to the branch named `ops/rumble-launch-v1`
2. THE Content_System SHALL use commit messages that begin with a category prefix (e.g., "content:", "asset:") followed by a description of the files added or changed
3. THE Content_System SHALL NOT merge the branch to main
4. THE Content_System SHALL NOT modify any existing application code, UI components, or configuration files outside of `/content/rumble-launch/`

### Requirement 10: Brand Compliance

**User Story:** As the CEO, I want all content assets to follow MysterMyself brand standards, so that the Rumble channel launch is on-brand from day one.

#### Acceptance Criteria

1. THE Content_System SHALL reference the Handle as `@mysterycartel` in all audience-facing text including video titles, video descriptions, on-screen text overlays, and channel metadata
2. THE Content_System SHALL NOT reference `@mysterymyself` in any generated file
3. THE Content_System SHALL use the brand name "MysterMyself" or "Trading Chef" in all brand references, and SHALL NOT use abbreviations, alternate spellings, or unnamed brand references
4. THE Content_System SHALL reference only Brand_Colors (Black #060608, Gold #C9A84C, Red, Green, Fire Orange) in all visual specification files including thumbnail briefs, VEO3 prompts, and overlay descriptions
5. WHEN a thumbnail or visual prompt references the avatar, THE Content_System SHALL describe the Trading_Chef caricature including all of the following attributes: chef hat, apron, gold chain, and urban cartoon style
