import { createMuiTheme } from "@material-ui/core/styles";
import blueGrey from "@material-ui/core/colors/blueGrey";

// A theme with custom primary and secondary color.
// It's optional.
const theme = createMuiTheme({
    palette: {
        type: "light",
        primary: {
            light: "#005bac",
            main: "#005bac",
            dark: "#005bac"
        },
        secondary: blueGrey
    },
    typography: {
        useNextVariants: true,
        fontFamily: ["Amazon Ember"].join(",")
    },
    overrides: {
        ReactTableComp: {
            responsiveScroll: {
                maxHeight: "none"
            }
        }
    }
});

export default theme;
