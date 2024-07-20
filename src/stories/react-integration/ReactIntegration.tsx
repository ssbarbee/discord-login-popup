import './react-integration.css';

import React from 'react';

import {
  discordLoginPopup,
  DiscordLoginPopupParams,
  OnSuccessCodeParams,
  OnSuccessTokenParams,
} from '../../index';
import { DiscordIcon } from './DiscordIcon';

type ReactIntegrationProps = {
  discordAppClientId: DiscordLoginPopupParams['discordAppClientId'];
  redirectUrl: DiscordLoginPopupParams['redirectUrl'];
  responseType: DiscordLoginPopupParams['responseType'];
  scopes: DiscordLoginPopupParams['scopes'];
};

export const ReactIntegration = ({
  discordAppClientId,
  redirectUrl,
  scopes = 'identify',
  responseType = 'token',
}: ReactIntegrationProps) => {
  const [token, setToken] = React.useState<string>('');
  const [code, setCode] = React.useState<string>('');
  const [expiresIn, setExpiresIn] = React.useState<number | null>(null);
  const [error, setError] = React.useState<string>('');
  const [loading, setLoading] = React.useState<boolean>(false);

  if (!discordAppClientId) {
    throw new Error('For this story to work, discordAppClientId is required');
  }
  if (!redirectUrl) {
    throw new Error('For this story to work, redirectUrl is required');
  }
  if (!responseType) {
    throw new Error('For this story to work, responseType is required');
  }

  const loginWithDiscord = () => {
    discordLoginPopup({
      discordAppClientId,
      onClose: () => {
        setToken('');
        setCode('');
        setExpiresIn(null);
        setLoading(false);
        setError('');
      },
      onError: data => {
        setToken('');
        setCode('');
        setExpiresIn(null);
        setError(data.error_description);
        setLoading(false);
      },
      onStart: () => {
        setLoading(true);
        setError('');
      },
      onSuccess: data => {
        setToken((data as OnSuccessTokenParams).access_token);
        setCode((data as OnSuccessCodeParams).code);
        setExpiresIn((data as OnSuccessTokenParams).expires_in);
        setError('');
        setLoading(false);
      },
      redirectUrl,
      responseType,
      scopes,
    });
  };

  return (
    <div className="main-container">
      <h1 className="heading">
        Discord Login: responseType is <i>{responseType}</i>
      </h1>
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
            <p>Token: {token}</p>
          </div>
        )}
        {code && (
          <div className="token">
            <p>Code: {code}</p>
          </div>
        )}
        {expiresIn && (
          <div className="token">
            <p>Expires In: {expiresIn} Seconds</p>
          </div>
        )}
      </div>
    </div>
  );
};
