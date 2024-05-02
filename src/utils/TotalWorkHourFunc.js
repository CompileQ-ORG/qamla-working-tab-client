export const totalWorkHourFunc = function (x, y) {
    const timestamp1 = x;
    const timestamp2 = y;

    const date1 = new Date(timestamp1);
    const date2 = new Date(timestamp2);

    const timeDifference = Math.abs(date1 - date2);
    const formattedDifference = new Date(timeDifference).toISOString()

    return formattedDifference;
}

// const newly = totalWorkHourFunc()


// const newly = function (a, b) {
//     const timestamp1 = x;
//     const timestamp2 = y;

//     const date1 = new Date(timestamp1);
//     const date2 = new Date(timestamp2);

//     const timeDifference = Math.abs(date1 - date2);
//     const formattedDifference = new Date(timeDifference).toISOString()

//     return formattedDifference;
// }
