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
      onClose: () => {
        setLoading(false);
        setToken('');
        setError('');
      },
      onError: data => {
        setToken('');
        setError(data.error);
        setLoading(false);
      },
      onStart: () => {
        setLoading(true);
        setError('');
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
    <div className="container">
      <button className="button" onClick={loginWithDiscord}>
        <DiscordIcon />
        {loading ? 'Loading...' : ''}
        {!loading ? 'Login Discord' : ''}
      </button>
      {error && (
        <div className="error">
          <p>{error}</p>
        </div>
      )}
      {token && (
        <div className="token">
          <p>{token}</p>
        </div>
      )}
    </div>
  );
};
