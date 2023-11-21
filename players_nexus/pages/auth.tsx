import React, { useEffect } from "react";
import  StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { GithubAuthProvider } from "firebase/auth";
import auth from "../firebase/clientApp";

const uiConfig = {

    signInSuccessUrl: "/",

    signInOptions: [GithubAuthProvider.PROVIDER_ID],

};

function SignInScreen() {       
    return ( 
        <div
        style={{
            maxWidth: "320px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
        }}
        >
            <h1>Player's Nexus Login</h1>
            <p>Please sign-in:</p>
            <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />

        </div>
    );
}

export default SignInScreen;