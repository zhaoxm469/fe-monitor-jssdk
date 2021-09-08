export default function (api: string, params: string) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', api);
    xhr.setRequestHeader('Content-Type', 'text/plain;charset=UTF-8');
    xhr.setRequestHeader('ztype', 'report');
    xhr.send(params);
}
