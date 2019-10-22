import * as stylefire from '@haxzie/stylefire';

const light = {
    color: {
        primary: "#4287f5",
        secondary: "#3e4754",
        background: {
            light: "#fcfcfc",
            dark: "#e6e6e6"
        }
    }
}

const dark = {
    color: {
        primary: "#4287f5",
        secondary: "#3e4754",
        background: {
            light: "#353842",
            dark: "#292a33"
        }
    }
}

stylefire.create('light', light);
stylefire.create('dark', dark).apply();

export default stylefire;