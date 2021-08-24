export function xmlSend(api: string, params: string) {
    var userAgent = navigator.userAgent;
    if (XMLHttpRequest) {
        var xhr = new XMLHttpRequest();
        xhr.open('post', api);
        xhr.setRequestHeader(
            'Content-Type',
            'application/x-www-form-urlencoded'
        );
        xhr.send(
            'message=' + params + '&userAgent=' + encodeURIComponent(userAgent)
        );
    }
}
