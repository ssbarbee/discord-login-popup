export type OnErrorParams = {
    error: string;
    error_description: string;
};
export type OnSuccessTokenParams = {
    access_token: string;
    expires_in: number;
    scope: string;
    token_type: string;
};
export type OnSuccessCodeParams = {
    code: string;
};
export type OnSuccessParams = OnSuccessTokenParams | OnSuccessCodeParams;
export type DiscordLoginPopupParams = {
    discordAppClientId: string;
    onClose?: () => void;
    onError?: (data: OnErrorParams) => void;
    onStart?: () => void;
    onSuccess?: (data: OnSuccessParams) => void;
    popupHeight?: number;
    popupWidth?: number;
    redirectUrl: string;
    responseType?: 'token' | 'code';
    scopes?: string;
};
export declare const discordLoginPopup: ({ popupWidth, popupHeight, redirectUrl, scopes, onStart, onError, onSuccess, discordAppClientId, onClose, responseType, }: DiscordLoginPopupParams) => void;
