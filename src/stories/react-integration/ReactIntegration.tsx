import React from 'react';
import './react-integration.css';
import { discordLoginPopup } from '../../index';
import { DiscordIcon } from './DiscordIcon';

type ReactIntegrationProps = {
    discordAppClientId: string;
    redirectUrl: string;
    scopes: string;
};

export const ReactIntegration = ({
    discordAppClientId, redirectUrl, scopes = 'identify'
}: ReactIntegrationProps) => {
    if(!discordAppClientId) {
        throw new Error('For this story to work, discordAppClientId is required');
    }
    if(!redirectUrl) {
        throw new Error('For this story to work, redirectUrl is required');
    }

    const loginWithDiscord = () => {
        discordLoginPopup({
            discordAppClientId,
            redirectUrl, scopes,
            onSuccess: (data) => {
                console.log(data);
            },
            onError: (data) => {
                console.log(data);
            },
            onClose: () => {
                console.log('closed');
            },
            onStart: () => {
                console.log('started');
            }
        })
    };
  return (
    <button className='storybook-button' onClick={loginWithDiscord}>
      <DiscordIcon /> Login with Discord
    </button>
  );
};
