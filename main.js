

// "#rrggbb" with rr, gg, and bb being the hex values for red, green, and blue, respectively
const black = "#000000"
const illegal =  "#e21c48"

const busker = new Map([
    ["melody", { 
        pitches = [
            74, // D5
            72, // C5 
            70, // Bb5
            69, // A5
            67, // G4
            65, // F4
            64, // E4
            63, // Eb4
            62, // D4
            60  // C4
        ], 
        colour = "#62bc47"
    }],
    ["accompaniment", { 
        pitches = [
            58, // Bb4
            57, // A4
            55, // G3
            53, // F3
            52, // E3
            51, // Eb3
            50  // D3
        ], 
        colour = "#0071bb"
    }],
    ["bass", { 
        pitches = [
            48,  // C3
            46, // bB3
            41 // F2
        ], 
        colour = "#5e50a1"
    }]
]);

function info_log(message) {
    api.log.info("busker-colours", message);
}

function main() {
    api.log.info("hello busker-colours");

    applyToNotesInSelection(colorNote)
}

// Apply the given function to all notes (elements with pitch) in selection
// or, if nothing is selected, in the entire score

function applyToNotesInSelection(func) {
    var fullScore = !curScore.selection.elements.length
    if (fullScore) {
        cmd("select-all")
    }
    curScore.startCmd()
    for (var i in curScore.selection.elements)
        if (curScore.selection.elements[i].pitch)
            func(curScore.selection.elements[i])
    curScore.endCmd()
    if (fullScore) {
        cmd("escape")
    }
}

function colorNote(note) {
    // Get the base color for the note based on its pitch (modulo 12 for octave wrapping)
    //  info_log(`pitch: ${note.pitch}`);

    let note_colour = illegal;
    let note_type = "illegal";
    for  (const [range_type, range_details] of busker){
        if (range_details.pitches.includes(note.pitch)) {
            note_type = range_type;
            note_colour = range_details.colour;
            break
        }
    }

    info_log(`note: ${nameNote(note)} pitch: ${note.pitch} type: ${note_type}`);


   

    // Check if the note has an accidental (e.g., sharp or flat)
    if (note.accidental) {
        // Set the accidental's color to the base color
        note.accidental.color = note_colour;
    }

    // Assign the final color to the note itself
    note.color = note_colour;

    // If the note has dots (augmentation dots), set each dot's color to match the note's color
    if (note.dots) {
        for (var i = 0; i < note.dots.length; i++) {
            if (note.dots[i]) {
                note.dots[i].color = note.color;
            }
        }
    }
}

function nameNote(note) {
        switch (note.tpc) {
        case -8: return "F♭♭♭"
        case -7: return "C♭♭♭"
        case -6: return "G♭♭♭"
        case -5: return "D♭♭♭"
        case -4: return "A♭♭♭"
        case -3: return "E♭♭♭"
        case -2: return "B♭♭♭"

        case -1: return "F♭♭"
        case  0: return "C♭♭"
        case  1: return "G♭♭"
        case  2: return "D♭♭"
        case  3: return "A♭♭"
        case  4: return "E♭♭"
        case  5: return "B♭♭"

        case  6: return "F♭"
        case  7: return "C♭"
        case  8: return "G♭"
        case  9: return "D♭"
        case 10: return "A♭"
        case 11: return "E♭"
        case 12: return "B♭"

        case 13: return "F"
        case 14: return "C"
        case 15: return "G"
        case 16: return "D"
        case 17: return "A"
        case 18: return "E"
        case 19: return "B"

        case 20: return "F♯"
        case 21: return "C♯"
        case 22: return "G♯"
        case 23: return "D♯"
        case 24: return "A♯"
        case 25: return "E♯"
        case 26: return "B♯"

        case 27: return "F♯♯"
        case 28: return "C♯♯"
        case 29: return "G♯♯"
        case 30: return "D♯♯"
        case 31: return "A♯♯"
        case 32: return "E♯♯"
        case 33: return "B♯♯"

        case 34: return "F♯♯"
        case 35: return "C♯♯♯"
        case 36: return "G♯♯♯"
        case 37: return "D♯♯♯"
        case 38: return "A♯♯♯"
        case 39: return "E♯♯♯"
        case 40: return "B♯♯♯"

        default: return qsTr("?")
        }
    }