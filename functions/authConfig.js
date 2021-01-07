// Config object to be passed to Msal on creation.
// For a full list of msal.js configuration parameters, 
// visit https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/configuration.md
const msalConfig = {
    auth: {
        clientId: "47ef0009-29ef-4f2e-82c4-4ab3b4167b53",
        authority: "https://login.microsoftonline.com/850aa78d-94e1-4bc6-9cf3-8c11b530701c",
        redirectUri: "http://localhost:3000/",
    },
    cache: {
        cacheLocation: "sessionStorage", // This configures where your cache will be stored
        storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
    },
    system: {
        loggerOptions: {
            loggerCallback: (level, message, containsPii) => {
                if (containsPii) {	
                    return;	
                }	
                switch (level) {	
                    case msal.LogLevel.Error:	
                        console.error(message);	
                        return;	
                    case msal.LogLevel.Info:	
                        console.info(message);	
                        return;	
                    case msal.LogLevel.Verbose:	
                        console.debug(message);	
                        return;	
                    case msal.LogLevel.Warning:	
                        console.warn(message);	
                        return;	
                }
            }
        }
    }
};

// Add here the scopes that you would like the user to consent during sign-in
const loginRequest = {
    scopes: ["User.Read"]
};

// Add here the scopes to request when obtaining an access token for MS Graph API
const tokenRequest = {
    scopes: ["User.Read", "Mail.Read"],
    forceRefresh: false // Set this to "true" to skip a cached token and go to the server to get a new token
};

module.exports ={ msalConfig, loginRequest, tokenRequest};