# Music-Visualizer [BETA]

---

#### Now Open Source!

#### Created by Demonitized

---

## Changes in Version 1.20.0:

- Moved the visualizer to the center, which sort of fixed the issue of the minimum height being shown
- Changed the render to show the full range of Frequencies on Right and Left channels
- Ok the last one was a lie, I just duplicated the top to the bottom. It does look cooler though
- Realize I was editing the Production build and not the Beta build, making me revert the changes, and rewrite them on the Beta

## Changes in Version 1.19.1:

- Made the loop button change depending on whether it's enabled or not.
- Changed the File Display System to reset to default when the audio finishes (unless it is looping, then it just is ignored)
- Found a bug where the brower won't even recognize when the audio is finished, making the above change useless (thanks JavaScript)
- Added some CSS for a future Button Style update, coming Soon™

## Changes in Version 1.19.0:

- Added some UI controls for the audio. (Play, Pause, Toggle Looping, Restart Playback)
- Fixed some weird glitch with rendering the UI

## Changes in Version 1.18.1:

- Reverted colors back to the blue and pink theme.
- Changed font to Beon Medium.
- Started adding the code for a progress bar and control scheme.

## Changes in Version 1.18.0:

- Added a system to show the current time played of the audio track currently loaded.
- Increased FFT size to `2048`. No reason, I just want to test something.
- Added audio controls because for some reason, the default ones do not show up even if I tell them to load.
- Removed default audio controls even though they don't work. See above.
