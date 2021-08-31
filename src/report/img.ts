export default function (api: string, params: string) {
    const oImg = new Image();
    oImg.src = api + '?c=' + params;
}
