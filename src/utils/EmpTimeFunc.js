export const twelveHourFormat = (time) => {
    const utcTime = new Date(time);
    const hours = utcTime.getUTCHours();
    const minutes = utcTime.getUTCMinutes();
    const seconds = utcTime.getUTCSeconds();

    let meridiem = "AM";
    let formattedHours = hours;

    if (hours > 12) {
        formattedHours = hours - 12;
        meridiem = "PM";
    } else if (hours === 12) {
        formattedHours = 12;
        meridiem = "PM";
    } else if (hours === 0) {
        formattedHours = 12;
    }

    // return `${formattedHours}:${(minutes < 10 ? '0' : '') + minutes}:${(seconds < 10 ? '0' : '') + seconds} ${meridiem}`;
    return `${formattedHours}:${(minutes < 10 ? '0' : '') + minutes} ${meridiem}`;
}

