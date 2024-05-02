export const breakConvertIntoISO = function (hr, min) {
    const initialDate = new Date(0);

    // Add 6 hours and 4 minutes
    initialDate.setUTCHours(hr);
    initialDate.setUTCMinutes(min);

    // Convert to ISO 8601 format
    const brandnewtime = initialDate.toISOString();

    console.log(brandnewtime);
    return brandnewtime;
}