export default function (api: string, params: string) {
    (navigator as any).sendBeacon(api, params);
}
