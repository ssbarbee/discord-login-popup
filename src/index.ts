export type OnErrorParams = { error: string };
export type OnSuccessParams = { token: string };
export type DiscordLoginPopupParams = {
  discordAppClientId: string;
  onClose?: () => void;
  onError?: (data: OnErrorParams) => void;
  onStart?: () => void;
  onSuccess?: (data: OnSuccessParams) => void;
  popupHeight?: number;
  popupWidth?: number;
  redirectUrl: string;
  scopes?: string;
};

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
}: DiscordLoginPopupParams) => {
  const params = `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,width=${popupWidth},height=${popupHeight},left=${
    window.innerWidth / 2 - popupWidth / 2
  },top=${window.innerHeight / 2 - popupHeight / 2}`;

  const url = `https://discord.com/api/oauth2/authorize?client_id=${discordAppClientId}&response_type=token&redirect_uri=${redirectUrl}&scope=${scopes}`;

  const popup = window.open(url, 'Discord Auth', params);

  typeof onStart === 'function' && onStart();

  const discordLoginMessageInterval = window.setInterval(() => {
    popup!.postMessage('', window?.location?.origin || '*');
  }, 500);

  const closeTimer = window.setInterval(function () {
    if (popup?.closed) {
      window.clearInterval(closeTimer);
      typeof onClose === 'function' && onClose();
    }
  }, 500);

  window.addEventListener(
    'message',
    (event: { data: { error: string; token: string } }) => {
      const dataToken = event.data.token;
      const dataError = event.data.error;
      let closePopup = false;
      if (dataToken) {
        typeof onSuccess === 'function' &&
          onSuccess({
            token: dataToken,
          });
        closePopup = true;
      } else if (dataError) {
        typeof onError === 'function' &&
          onError({
            error: dataError,
          });
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
