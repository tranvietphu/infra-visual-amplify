import React from "react";
import PropTypes from "prop-types";
import { ThemeProvider } from "@material-ui/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

import theme from "./theme";

function withRoot(Component) {
    function withRoot(props) {
        return (
            <ThemeProvider theme={theme}>
                {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                <CssBaseline />
                <Component {...props} />
            </ThemeProvider>
        );
    }

    withRoot.propTypes = {
        theme: PropTypes.object
    };

    return withRoot;
}

export default withRoot;
