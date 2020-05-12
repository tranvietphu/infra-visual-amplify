import React from "react";
import PropTypes from "prop-types";
import { Authenticator, SignUp, Greetings } from "aws-amplify-react";
import { Auth, I18n } from "aws-amplify";
import vocabularies from "./i18n/vocabularies";
import theme from "./theme";

window.sessionStorage.setItem("aws.amplify.test-ss", 1);
Auth.configure({
    storage: window.sessionStorage
});

I18n.putVocabularies(vocabularies);
I18n.setLanguage("ja");

function withAuth(Component) {
    function withAuth(props) {
        return (
            <Authenticator
                theme={{
                    ...theme,
                    button: {
                        backgroundColor: theme.palette.primary.main
                    }
                }}
                hide={[SignUp, Greetings]}
                signUpConfig={{ hiddenDefaults: ["phone_number"] }}
            >
                <Component {...props} />
            </Authenticator>
        );
    }

    withAuth.propTypes = {
        theme: PropTypes.object
    };

    return withAuth;
}

export default withAuth;
