// Import dependency
const CLI_COLORS = require("./cliColors.js");

// Filter out BLACK and WHITE from all colors.
const ALL_COLORS = CLI_COLORS.ALL_COLOR_NAMES;
const ALL_COLORS_NO_BW = ALL_COLORS.filter((color) => { 
    return (color !== 'BLACK' && color !== 'WHITE');
});

// Parameters.
const TEXT = "BEEP BOOP YOUR TERMINAL IS GAY NOW";  // String to make gay.
const INITIAL_OFFSET = 0;                           // How many colors to skip initially (default rainbow starts with RED).
const COLOR_WIDTH = 4;                              // How many characters should one color take up.
const DELAY_MS = 100;                               // Millisecond delay between frame refresh.

// Global variable to keep track of current color offset.
let colorOffset = INITIAL_OFFSET;

// Continuously increment offset value within bounds of colors. 
function cycleOffset(offset=0) {
    const newOffset = (offset + 1) % ALL_COLORS_NO_BW.length;
    return newOffset;
}

// Constructs gay text with color markers.
function makeGayText(text='', colorOffset=0, colorWidth=1) {
    // Coerce values into valid range.
    if (colorOffset < 0) colorOffset = 0;
    if (colorWidth < 1) colorWidth = 1;
    let gayText = [];
    let currentOffset = colorOffset % ALL_COLORS_NO_BW.length;
    // Individually sandwich in color markers after every character.
    for (let i = 0; i < text.length; i++) {
        if (i % colorWidth === 0) {
            // Insert new color marker after colorWidth characters.
            gayText.push(CLI_COLORS.FG[ALL_COLORS_NO_BW[currentOffset]]);
            currentOffset = cycleOffset(currentOffset);
        }
        gayText.push(text[i]);
    }
    // Terminate string with reset marker.
    gayText.push(CLI_COLORS.STYLE.RESET);
    // Return character array joined as string.
    return gayText.join('');
}

// Render returned gay text.
function renderGayText(text='') {
    // Clear frame.
    console.clear();
    // Build frame.
    gayText = makeGayText(text, colorOffset, COLOR_WIDTH);
    colorOffset = cycleOffset(colorOffset);
    // Draw frame.
    console.log(gayText);
}

// Exit handler.
function straightenBeforeExit() {
    // Reset styling, clear frame, and exit.
    console.log(CLI_COLORS.STYLE.RESET);
    console.clear();
    process.exit(0);
}

// Main entry point function.
function startGay() {
    // Set up main loop.
    setInterval(() => {
        // Execute loop.
        renderGayText(TEXT);
    }, DELAY_MS);
    // Stop handler for when the process exits normally.
    process.on("exit", straightenBeforeExit.bind());
    // For when you press Ctrl+C
    process.on("SIGINT", straightenBeforeExit.bind());
}

// COMMENCE THE GAY.
startGay();