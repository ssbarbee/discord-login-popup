# Discord Login Popup 🎯

The `discord-login-popup` package offers a streamlined solution for integrating Discord OAuth2 authentication into web applications. This library facilitates user login through a popup window, simplifying the process of obtaining user information and access tokens from Discord's API. The implementation is designed for ease of use, making it an ideal choice for developers who need to add Discord authentication with minimal setup.

## Features 🌟

- **Easy Integration**: Quickly add Discord OAuth2 login to your web application.
- **Customizable**: Configure client ID, redirect URI, and scope settings to tailor the authentication flow.
- **Token Management**: Simplifies the process of retrieving and managing Discord access tokens.
- **User Information**: Effortlessly obtain user information from Discord after authentication.

## Installation 📦

To install the `discord-login-popup` library, you can use npm or yarn:

```bash
# Using npm
npm install discord-login-popup

# Using yarn
yarn add discord-login-popup
```

# Demo 😈
To see a live demo of the `discord-login-popup` in action, check out the Demo Page.

Hosted [storybook](https://ssbarbee.github.io/discord-login-popup/)

# Usage 🎉 

## Requirements 🎓

Open a popup window with the discord login page. Upon login, the popup window will close and the token will be passed to the parent window.

## Steps 🛠️

1) As integrator, you need to provide the client id, redirect url, and scopes. Make sure to obtain a client id from the [Discord Developer Portal](https://discord.com/developers/applications).

2) You also need to provide a callback function that will be called when the discord login popup is closed and the token is passed to the parent window.

3) You must host a page that will open inside popup window after discord redirect. This page must inject the [discord-login-token-detector.js](https://github.com/ssbarbee/discord-login-popup/blob/main/static/discord-login-token-detector.js) script from this repository.
Feel free to download the script and host it yourself. Example: [discord-login.html](https://github.com/ssbarbee/discord-login-popup/blob/main/static/discord-login.html)

## Usage in Typescript 📦

Here’s a basic example of how to use the `discord-login-popup` package in a React application:

```typescript
import { discordLoginPopup, OnSuccessTokenParams } from 'discord-login-popup';

// Get your client ID from the Discord Developer Portal
// https://discord.com/developers/applications
const clientId = 'YOUR_DISCORD_CLIENT_ID';
// Redirect URL must be the same as the one you set in the Discord Developer Portal
// This is the URL for a page that will open in the popup. This page must inject the `static/discord-login-token-detector.js` script from this repository
// Checkout the static/discord-login.html file for an example of how to use this page
const redirectUri = 'YOUR_REDIRECT_URI';
const scopes = 'identify';
// The response type can be either 'token' or 'code'
// If you choose 'token', the popup will return the access token
// If you choose 'code', the popup will return the code
// Make sure you cast the data to the correct type OnSuccessTokenParams or OnSuccessCodeParams
const responseType = 'token';

const login = () => {
    discordLoginPopup({
        discordAppClientId: clientId,
        redirectUrl: redirectUri,
        scopes: scopes,
        responseType: responseType,
        onStart: () => console.log('Login started'),
        onError: (data) => console.error('Login failed. Reason:', data.error_description, data.error),
        onSuccess: (data) => console.log('Login successful. Data:', data as OnSuccessTokenParams),
        onClose: () => console.log('Popup closed'),
    });
};

// Call the login function on a button click or any other event
login();
```

## Usage in React 📦

Checkout the [React Integration Story](https://github.com/ssbarbee/discord-login-popup/blob/85a3559b2590cdf282b21b523b1199374f0b0d10/src/stories/react-integration/ReactIntegration.tsx) for a live example of how to use the `discord-login-popup` package in a React application.

## Usage in NextJS 📦

Checkout this [NextJS repo]([https://github.com/ssbarbee/next-discord-popup-login) for an example of how to use the `discord-login-popup` package inside a NextJS application.


# Contributing 🤝
Contributions are welcome! If you have any ideas, suggestions, or issues, please open an issue or submit a pull request.

# License 📋
This project is licensed under the MIT License. See the LICENSE file for more [details](https://github.com/ssbarbee/discord-login-popup/blob/main/LICENSE).
