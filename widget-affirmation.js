// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: pink; icon-glyph: magic;


//–––––––––––––––––––––––––//
//         library         //
//–––––––––––––––––––––––––//

// error-variables
const PASS = "✅";
const FAIL = "❌";
const WARN = "⚠️";

// hex-colors: here are the built in colors, feel free to duplicate and add a new color using hex codes, alpha is optional
const WHITE = new Color(hex = "#FFFFFF")
const PINK = new Color(hex = "#EBA2C5")
const DARK_PINK = new Color(hex = "#CE8EAC")
const RED = new Color(hex = "#F77463")
const LIGHT_BLUE = new Color(hex = "#B5D2DC")
const DARK_BLUE = new Color(hex = "#0E5A8C")
const PURPLE = new Color(hex = "#6F5ED9")
const GRAY = new Color(hex = "#7B7B81")
const DARK_GRAY = new Color(hex = "#151318")
const BLACK = new Color(hex = "#000000")
const BKG_GRAY = new Color(hex = "#050505")
const SHADOW_GRAY = new Color(hex = "#070707")
const BKG_BLACK = new Color(hex = "#000000")
const DARK_TEAL = new Color(hex = "#008384")
const YOGA_PINK = new Color(hex = "#B14B80")
const WHITE_20 = new Color("#FFFFFF20")
const WHITE_80 = new Color("#FFFFFF80")
const BLACK_50 = new Color("#00000050")
const BLACK_90 = new Color("#00000090")
const BLACK_10 = new Color("#00000010")
const BLACK_99 = new Color("#00000099")

//–––––––––––––––––––––––––//
//          setup          //
//–––––––––––––––––––––––––//

// set-tap-url: url that opens when you tap on the widget
const URL = "http://suddenlycats.com"
console.log(`icon="${PASS}" action="set-tap-url" value="${URL}"`)

// set-text-color: enter color name from Library
const AFF_COLOR = PURPLE

if (AFF_COLOR == undefined || AFF_COLOR == null) {
    let x = AFF_COLOR;
    console.error(`icon="${FAIL}" action="set-text-color" message="no text color set for the affirmation" value="${x}"`);
} else {
    let x = AFF_COLOR;
    console.log(`icon="${PASS}" action="set-text-color" message="text color successfully set" value="${x}"`);
}

// set-text-oppacity: 0 to 1
const AFF_OPPACITY = .8

if (AFF_OPPACITY > 1 || AFF_OPPACITY < 0) {
    let x = AFF_OPPACITY;
    console.error(`icon="${FAIL}" action="set-text-oppacity" message="value set is not within allowed range; set value from 0 and 1, notated as decimal" value="${x}"`);
} else {
    let x = AFF_OPPACITY;
    console.log(`icon="${PASS}" action="set-text-color" value="${x}"`)
}


// set-background-color: enter color name from Library
const BACKGROUND_COLOR = BLACK

if (BACKGROUND_COLOR == AFF_COLOR) {
    let x = BACKGROUND_COLOR;
    console.error(`icon="${FAIL}" action="set-background-color" message="background and text colors match, please change one before proceeding" value="${x}"`);
} else {
    let x = BACKGROUND_COLOR;
    console.log(`icon="${PASS}" action="set-background-color" value="${x}"`)
}

// set-text-styles
const AFF_SIZE = 18 // text size for affirmations: 12-18 seems to work well (don't set higher than 16 if you set AFF_MSF to 1)
const AFF_MSF = .5 // sets the minimum size the text can scale down to when it doesn't fit: values 0 to 1: 1 = do not scale down

if (AFF_MSF > 1 || AFF_MSF < 0) {
    let x = AFF_MSF;
    console.error(`icon="${FAIL}" action="set-text-styles" message="value set is not within allowed range; set value from 0 and 1, notated as decimal" value="${x}"`);
} else {
    let x = AFF_MSF;
    console.log(`icon="${PASS}" action="set-text-styles" value="${x}"`)
}


// set-widget-padding: padding for widget around text: small widget is 156x156
const PAD_TOP = 30
const PAD_BOTTOM = 30
const PAD_LEFT = 10
const PAD_RIGHT = 10

if (PAD_LEFT !== PAD_RIGHT) {
    let x = PAD_RIGHT;
    console.warn(`icon="${WARN}" action="set-widget-padding" message="left and right padding do not match" value="${x}"`);
} else if (PAD_TOP !== PAD_BOTTOM) {
    let x = PAD_BOTTOM;
    console.warn(`icon="${WARN}" action="set-widget-padding" message="top and bottom padding do not match" value="${x}"`);
} else {
    let array = ["(", PAD_TOP, ",", PAD_LEFT, ",", PAD_BOTTOM, ",", PAD_RIGHT, ")"]
    let x = array.join("");
    console.log(`icon="${PASS}" action="set-widget-padding" value="${x}"`)
}

// set-file-bookmark: file bookmark name in scriptable for affirmation data source
const BOOKMARK = "affirmations.txt" // To set file bookmark: Open Scriptable, tap 'Gear' icon, 'File Bookmarks', '+', 'Pick File', choose source file 'affirmations.txt'
console.log(`icon="${PASS}" action="set-file-bookmark" value="${BOOKMARK}"`)

//–––––––––––––––––––––––––//
//          script         //
//–––––––––––––––––––––––––//

// create-widget
var widget = new ListWidget()
console.log(`icon="${PASS}" action="create-widget" message="base widget created"`)

// style-widget
widget.setPadding(PAD_TOP, PAD_LEFT, PAD_BOTTOM, PAD_RIGHT)
widget.backgroundColor = BACKGROUND_COLOR
console.log(`icon="${PASS}" action="style-widget" message="widget padding and background color are set"`)

// add-top-spacer: add flexible top spacing between padding and text: comment out to top-align text
widget.addSpacer()
console.log(`icon="${PASS}" action="add-top-spacer" message="top spacer added"`)

// add-stack: stack for affirmation
var stack = widget.addStack()
console.log(`icon="${PASS}" action="add-stack" message="stack added"`)

// add-left-stack-margin: left margin for stack
stack.addSpacer(PAD_LEFT)
console.log(`icon="${PASS}" action="add-left-stack-margin" message="left stack margin spacer added"`)

// get-add-affirmation: get + add affirmation to widget
var aff = stack.addText(getAff(BOOKMARK))
if (aff == undefined || aff == null) {
    console.error(`icon="${FAIL}" action="get-add-affirmation" message="no affirmations found"`);
} else {
    let x = aff.toString();
    console.log(`icon="${PASS}" action="get-add-affirmation" message="affirmation found and defined" value="${x}"`);
};

// style-affirmation
aff.font = Font.regularRoundedSystemFont(AFF_SIZE)
aff.textColor = AFF_COLOR
aff.textOpacity = AFF_OPPACITY
aff.minimumScaleFactor = AFF_MSF
aff.leftAlignText() // options are '.leftAlignText()' or '.centerAlignText()' or '.rightAlignText'
//aff.rightAlignTexT() // comment when other alignment is set
console.log(`icon="${PASS}" action="style-affirmation" message="affirmation font, textColor, textOpacity, miniumumScaleFactor, and text alignment have been set"`)

// add-bottom-spacer: flexible spacer to allow for more natural line breaking
stack.addSpacer()
console.log(`icon="${PASS}" action="add-bottom-spacer" message="bottom spacer added"`)

// add-right-stack-margin: right margin for stack
stack.addSpacer(PAD_RIGHT)
console.log(`icon="${PASS}" action="add-right-stack-margin" message="right stack margin spacer added"`)

// add-bottom-spacer: flexible bottom padding - add a value to bottom-align text
widget.addSpacer()
console.log(`icon="${PASS}" action="add-bottom-spacer" message="bottom spacer added"`)


//–––––––––––––––––––––––––//
//         finalize        //
//–––––––––––––––––––––––––//

if (config.runsInApp) {

    // display-preview-widget: if script is being run in the Scriptable app, then show a preview of the widget
    var widgetSize = widget.presentSmall(); // other options are '.presentMedium()' or '.presentLarge()'
    console.log(`icon="${PASS}" action="display-preview-widget" message="widget preview displayed"`)

} else {

    // add-widget-url
    widget.url = URL
    if (widget.url == undefined || widget.url == null) {
        console.error(`icon="${FAIL}" action="add-widget-url" message="widget URL not added"`);
    } else {
        let x = widget.url
        console.log(`icon="${PASS}" action="add-widget-url" message="widget URL has been added" value="${x}"`);
    };

    // finalize-widget
    Script.setWidget(widget)
    console.log(`icon="${PASS}" action="finalize-widget" message="widget has been set"`)
}

//–––––––––––––––––––––––––//
//        functions        //
//–––––––––––––––––––––––––//

function getAff(FILE_BOOKMARK) {

    // set-file-manager
    const fm = FileManager.iCloud();
    if (fm == undefined || fm == null) {
        console.error(`icon="${FAIL}" action="set-file-manager" message="failed to set file manager"`)
    } else {
        console.log(`icon="${PASS}" action="set-file-manager" message="file manager successfully set"`);
    };

    // set-source-file
    let filePath = fm.bookmarkedPath(FILE_BOOKMARK);
    if (fm.fileExists(filePath) == false) {
        console.error(`icon="${FAIL}" action="set-source-file" message="could not find file" source="${filePath}"`)
    } else {
        console.log(`icon="${PASS}" action="set-source-file" message="file found" source="${filePath}"`);
    };


    // get-file-contents
    let data = fm.readString(filePath);
    if (data == undefined || data == null) {
        console.error(`icon="${FAIL}" action="get-file-contents" message="failed to get contents of file" source="${filePath}"`);
    } else {
        console.log(`icon="${PASS}" action="get-file-contents" message="successfully retrieved file contents"`);
    };

    // make-contents-list
    let items = data.split('|')
    if (items == undefined || items == null || items.length == 0) {
        console.error(`icon="${FAIL}" action="make-contents-list" message="failed to make file contents into list" source="${filePath}"`);
    } else {
        console.log(`icon="${PASS}" action="make-contents-list" message="made file contents into list successfully"`);
    };

    // get-random-affirmation
    let aff = items[Math.floor(Math.random() * items.length)];
    if (aff == undefined || aff == null) {
        console.error(`icon="${FAIL}" action="get-random-affirmation" message="no affirmations found"`);
    } else {
        let x = aff.toString();
        console.log(`icon="${PASS}" action="get-random-affirmation" message="affirmation found and defined" value="${x}"`);
    };

    return aff
}