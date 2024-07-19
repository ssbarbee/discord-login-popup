export type OnErrorParams = {
    error: string;
};
export type OnSuccessParams = {
    token: string;
};
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
export declare const discordLoginPopup: ({ popupWidth, popupHeight, redirectUrl, scopes, onStart, onError, onSuccess, discordAppClientId, onClose, }: DiscordLoginPopupParams) => void;
