export const imgSend = (api: string, params: string) => {
    const oImg = new Image();
    oImg.src = api + '?' + params;
};
