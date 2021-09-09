interface Window {
    attachEvent: any;
    detachEvent: any;
    CustomEvent: any;
}

interface HTMLStyleElement {
    styleSheet: {
        cssText: string;
    };
}

declare const uni: any;
declare const APP_VERSION: any;
