export const plainTime = function (x) {
    const timestamp = x;
    const date = new Date(timestamp);

    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();

    return (`${hours}hrs, ${minutes} mins`);
}