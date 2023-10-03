const generateScrapUrl = (url) => {
    return `https://api.scrape.do?token=09e9e47b98cb42899fa5937019c34282c89bb85fb77&url=${url}`;
}

const cleanTextContent = (text = "") => {
    return text?.replaceAll('\n', '');
}
module.exports = {
    generateScrapUrl,
    cleanTextContent
}