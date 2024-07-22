import {
  DiscordLoginPopupParams,
  OnErrorParams,
  OnSuccessCodeParams,
  OnSuccessParams,
  OnSuccessTokenParams,
} from './types';

const isAccessTokenResponse = (
  data: OnSuccessParams | OnErrorParams,
): data is OnSuccessTokenParams => Boolean((data as OnSuccessTokenParams).access_token);

const isCodeResponse = (data: OnSuccessParams | OnErrorParams): data is OnSuccessCodeParams =>
  Boolean((data as OnSuccessCodeParams).code);

const isErrorResponse = (data: OnSuccessParams | OnErrorParams): data is OnErrorParams =>
  Boolean((data as OnErrorParams).error) || Boolean((data as OnErrorParams).error_description);

export const discordLoginPopup = ({
  popupWidth = 700,
  popupHeight = 800,
  redirectUrl,
  scopes = 'identify',
  onStart,
  onError,
  onSuccess,
  discordAppClientId,
  onClose,
  responseType = 'token',
}: DiscordLoginPopupParams) => {
  const params = `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,width=${popupWidth},height=${popupHeight},left=${
    window.innerWidth / 2 - popupWidth / 2
  },top=${window.innerHeight / 2 - popupHeight / 2}`;

  const url = `https://discord.com/api/oauth2/authorize?client_id=${discordAppClientId}&response_type=${responseType}&redirect_uri=${redirectUrl}&scope=${scopes}`;

  const popup = window.open(url, 'Discord Auth', params);

  typeof onStart === 'function' && onStart();

  const discordLoginMessageInterval = window.setInterval(() => {
    popup!.postMessage(
      { params: { responseType }, source: 'discord-login-popup' },
      window?.location?.origin || '*',
    );
  }, 500);

  const closeTimer = window.setInterval(function () {
    if (popup?.closed) {
      window.clearInterval(closeTimer);
      typeof onClose === 'function' && onClose();
    }
  }, 500);

  window.addEventListener(
    'message',
    (event: { data: OnSuccessParams | OnErrorParams }) => {
      let closePopup = false;
      const eventData = event.data;
      if (isAccessTokenResponse(eventData) || isCodeResponse(eventData)) {
        typeof onSuccess === 'function' && onSuccess(eventData);
        closePopup = true;
      } else if (isErrorResponse(eventData)) {
        typeof onError === 'function' && onError(eventData);
        closePopup = true;
      }

      if (closePopup) {
        window.clearInterval(closeTimer);
        window.clearInterval(discordLoginMessageInterval);
        popup!.close();
      }
    },
    false,
  );
};
