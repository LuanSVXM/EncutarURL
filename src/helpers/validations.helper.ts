export const validationUrl = (url: string) => {
    if(url.length > 6 || !url) return false;
    return true;
}