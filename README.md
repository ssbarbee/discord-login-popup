# Discord Login Popup

The `discord-login-popup` repository offers a streamlined solution for integrating Discord OAuth2 authentication into web applications. This library facilitates user login through a popup window, simplifying the process of obtaining user information and access tokens from Discord's API. The implementation is designed for ease of use, making it an ideal choice for developers who need to add Discord authentication with minimal setup.

## Features

- **Easy Integration**: Quickly add Discord OAuth2 login to your web application.
- **Customizable**: Configure client ID, redirect URI, and scope settings to tailor the authentication flow.
- **Token Management**: Simplifies the process of retrieving and managing Discord access tokens.
- **User Information**: Effortlessly obtain user information from Discord after authentication.

## Installation

To install the `discord-login-popup` library, you can use npm or yarn:

```bash
# Using npm
npm install discord-login-popup

# Using yarn
yarn add discord-login-popup
```

# Usage
Here’s a basic example of how to use the discord-login-popup library:

```typescript
import { DiscordLogin } from 'discord-login-popup';

const clientId = 'YOUR_DISCORD_CLIENT_ID';
const redirectUri = 'YOUR_REDIRECT_URI';
const scopes = ['identify', 'email'];

const login = async () => {
  try {
    const result = await DiscordLogin(clientId, redirectUri, scopes);
    console.log('User Info:', result);
  } catch (error) {
    console.error('Login failed:', error);
  }
};

// Call the login function on a button click or any other event
login();
```

# Demo
To see a live demo of the discord-login-popup in action, check out the Demo Page.

The demo demonstrates how to set up and use the library in a real-world scenario, providing a clear example of how to implement Discord OAuth2 authentication in your own web applications.

For more details and advanced usage, refer to the official documentation.

# Contributing
Contributions are welcome! If you have any ideas, suggestions, or issues, please open an issue or submit a pull request.

# License
This project is licensed under the MIT License. See the LICENSE file for more details.
