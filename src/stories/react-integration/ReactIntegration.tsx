import './react-integration.css';

import React from 'react';

import { discordLoginPopup } from '../../index';
import { DiscordIcon } from './DiscordIcon';

type ReactIntegrationProps = {
  discordAppClientId: string;
  redirectUrl: string;
  scopes: string;
};

export const ReactIntegration = ({
  discordAppClientId,
  redirectUrl,
  scopes = 'identify',
}: ReactIntegrationProps) => {
  const [token, setToken] = React.useState<string>('');
  const [error, setError] = React.useState<string>('');
  const [loading, setLoading] = React.useState<boolean>(false);

  if (!discordAppClientId) {
    throw new Error('For this story to work, discordAppClientId is required');
  }
  if (!redirectUrl) {
    throw new Error('For this story to work, redirectUrl is required');
  }

  const loginWithDiscord = () => {
    discordLoginPopup({
      discordAppClientId,
      onClose: () => {},
      onError: data => {
        setToken('');
        setError(data.error);
        setLoading(false);
      },
      onStart: () => {
        setLoading(true);
      },
      onSuccess: data => {
        setToken(data.token);
        setError('');
        setLoading(false);
      },
      redirectUrl,
      scopes,
    });
  };
  return (
    <div className="storybook-button-container">
      <button className="storybook-button" onClick={loginWithDiscord}>
        {loading ? 'Loading...' : ''}
        {!loading && (
          <React.Fragment>
            <DiscordIcon />
            Login with Discord
          </React.Fragment>
        )}
      </button>
      {error && <div className="storybook-error">{error}</div>}
      {token && <div className="storybook-token">{token}</div>}
    </div>
  );
};
