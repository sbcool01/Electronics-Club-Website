import firebase from "firebase/app";
import "firebase/auth";

function microsoftAuth() {
    var provider = new firebase.auth.OAuthProvider('microsoft.com');
    provider.setCustomParameters({
        tenant: '850aa78d-94e1-4bc6-9cf3-8c11b530701c'
      });
    return firebase.auth().signInWithPopup(provider)
    .then((result) => {
        // var credential = result.credential;
        // var accessToken = credential.accessToken;
        // var idToken = credential.idToken;
        return {"isLoginSuccessful": true, "result": result};
    })
    .catch((error) => {
        console.log(error);
        return {"isLoginSuccessful": false};
    });
}

function microsoftLogOut() {
    return firebase.auth().signOut().then(() => {
        return {isLogOut: true};    
    }).catch((error) => {
        return {isLogOut: false};
    });
}

export {microsoftAuth, microsoftLogOut};