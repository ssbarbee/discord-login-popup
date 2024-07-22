/**
 * Parameters passed to the onError callback function.
 */
export type OnErrorParams = {
    /** Error Message */
    error: string;
    /** Error Description */
    error_description: string;
};
/**
 * Parameters passed to the onSuccess callback function when responseType is 'token'.
 */
export type OnSuccessTokenParams = {
    /** Access Token */
    access_token: string;
    /** Access Token Expires In, value is in seconds */
    expires_in: number;
    /** Access Token Scope */
    scope: string;
    /** Access Token Type */
    token_type: string;
};
/**
 * Parameters passed to the onSuccess callback function when responseType is 'code'.
 */
export type OnSuccessCodeParams = {
    /** Authorization Code */
    code: string;
};
/**
 * Union type for the onSuccess callback parameters.
 */
export type OnSuccessParams = OnSuccessTokenParams | OnSuccessCodeParams;
/**
 * Parameters for the Discord login popup.
 */
export type DiscordLoginPopupParams = {
    /** Discord App Client ID */
    discordAppClientId: string;
    /**
     * Callback function that will be called when the popup is closed via the close button.
     * Optional.
     */
    onClose?: () => void;
    /**
     * Callback function that will be called when the Discord login flow fails.
     * Optional.
     */
    onError?: (data: OnErrorParams) => void;
    /**
     * Callback function that will be called when the Discord login flow starts.
     * Optional.
     */
    onStart?: () => void;
    /**
     * Callback function that will be called when the Discord login flow is successful.
     * Depending on the responseType, either OnSuccessTokenParams or OnSuccessCodeParams will be passed as data.
     * Optional.
     */
    onSuccess?: (data: OnSuccessParams) => void;
    /**
     * Popup height in pixels.
     * Default is 800.
     * Optional.
     */
    popupHeight?: number;
    /**
     * Popup width in pixels.
     * Default is 700.
     * Optional.
     */
    popupWidth?: number;
    /** Redirect URL, must be the same as the one set in the Discord Developer Portal */
    redirectUrl: string;
    /**
     * Response Type, can be either 'token' or 'code'.
     * Optional.
     */
    responseType?: 'token' | 'code';
    /**
     * Scopes for the OAuth2 flow.
     * Default is 'identify'.
     * Optional.
     */
    scopes?: string;
};
