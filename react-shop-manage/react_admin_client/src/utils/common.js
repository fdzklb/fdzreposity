export const egetCurrentDate = obj => {
    let currentTime = (('0' + obj.getHours()).slice(-2) + ':') + (('0' + obj.getMinutes()).slice(-2)+':') + ('0' + obj.getSeconds()).slice(-2) 
    return currentTime.split('');
}