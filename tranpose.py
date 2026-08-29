import mido

busker_transpose = {
    74:19, # D5
    72:18, # C5
    70:17, # Bb5
    69:16, # A5
    67:15, # G4
    65:14, # F4
    64:13, # E4
    63:12, # Eb4
    62:11, # D4
    60:10, # C4
    58:9,  # Bb4
    57:8,  # A4
    55:7,  # G3
    53:6,  # F3
    52:5,  # E3
    51:4,  # Eb3
    50:3,  # D3
    48:2,  # C3
    46:1,  # Bb3
    41:0,  # F2
}


def melvyns_music_roll_editor_transpose(infile_path,outfile_path='output_transposed.mid',transpose_mapping = busker_transpose):

    infile = mido.MidiFile(infile_path)
    outfile = mido.MidiFile(type=0)


  

    transposed_tracks = []

    # 3. Transpose Channel 1 (index 0) across all existing tracks
    for track in infile.tracks:
        new_track = mido.MidiTrack()
        for msg in track:
            # Check if the message has a channel and if it is Channel 1 (index 0)
            if msg.type in ['note_on', 'note_off'] and getattr(msg, 'channel', -1) == 0:
                new_note = busker_transpose[msg.note]
                msg = msg.copy(note=new_note)
            new_track.append(msg)
        transposed_tracks.append(new_track)

    # 4. Merge all transposed tracks into one single track
    merged_track = mido.merge_tracks(transposed_tracks)

    # 5. Attach the single merged track and save
    outfile.tracks.append(merged_track)

    outfile.save(outfile_path)

def __main__():
    test = '~/Documents/MuseScore4/Scores/Welsh Medly-short.mid'
    melvyns_music_roll_editor_transpose(test)