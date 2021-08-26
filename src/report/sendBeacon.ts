export function navSendBeacon(api: string, params: string) {
    (navigator as any).sendBeacon(api, params);
}

// navigator.sendBeacon ||
//     new Function(
//         'var xhr=new XMLHttpRequest();xhr.open("POST",arguments[0],true);r.send(arguments[1]);'
//     );
