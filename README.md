# Busker Colours - MuseScore Studio plugin/extension

Based on the [color notes extension](https://github.com/musescore/MuseScore/blob/main/share/extensions/colornotes/main.js) This plugin colors notes in the selection depending on their pitch as per legal notes on a busker 20 note organ

## Usage (MuseScore Studio plugin/extension)

1. Select notes to colour
2. Find and click `plugins -> colour-notes -> Busker Colours` to run the macro
3. (After making changes you need to re-run the macro to update colours)

### Colour key:
- Green notes are melody notes
- blue notes are accompaniment notes
- purple notes are the bass notes
- red notes are not valid for the busker organ

See `main.js` to configure colours and notes available. Potentially easy to adapt to other street organ scales such as a 31 note organ scale

| TODO: 
| - Make it automatic
| - Make it a proper plugin instead of extension?
| - Make it configurable without looking at the script
| - Do a custom midi export for Melvyns editor, to replace the python script

## Usage (midi transpose script)

1. export midi file from Musescore Studio (or get it from elsewhere)
2. run `python3 transpose.py path/to/musescore_file.mid path/to/transposed_file.mid` 

| TODO implement the above CLI for now see the `__main__`function


## Notes

I set my score up as an organ and changed the sound to a recorder with no reverb.
- useful resource: http://www.melright.com/busker/tuning.htm

### MIDI
- MuseScore Studio 
   - exports a type 1 midi file. (multi track)
   - exports MIDI notes 41-74 with gaps (e.g. bass notes are C:48, bB:46, F:41)
- import function on [Melvyn's MUSIC ROLL EDITOR](http://www.melright.com/busker/editor.htm)
   - expects type 0 midi file (Single track)
   - For the busker scale expects MIDI notes 0-19 with no gaps (e.g. bass notes are C:2, bB:1, F:0)

In theory the mylvyn's editor will transpose, but I didn't have much luck (I assume it doesn't deal with the gaps?), so I wrote a simple script with the [mido](https://mido.readthedocs.io/en/stable/) python library that collapses everything into a single channel and transposes it. This makes midi exported from MuseScore compatible with the MIDI import utility on Melvyn's MUSIC ROLL EDITOR

I was able to use PortProton to run the Melvyn's MUSIC ROLL EDITOR exe under linux and import the midi files, but it does get stuck thinking for a while when loading a new midi file and I couldn't get it to playback the music.


## Installation (Linux flatpak)

1. Clone the repo
2. run `apply.sh` to put it into the  `~/.var/app/org.musescore.MuseScore/data/MuseScore/MuseScore4/extensions` directory.
3. `plugins -> manage plugins -> Reload plugins`
4. locate the plugin and enable

(To update the plugin, just re-run apply.sh)

## Installation (Windows/Linux Appimage)

I have no idea... but I assume just throw it in the plugin directory as documented here: https://handbook.musescore.org/en_gb/customization/plugins