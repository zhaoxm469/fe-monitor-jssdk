export default function (api: string, params: string) {
    var xhr = new XMLHttpRequest();
    xhr.open('post', api);
    xhr.setRequestHeader('Content-Type', 'text/plain;charset=UTF-8');
    xhr.send(params);
}
