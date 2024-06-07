export const formatData = (data, startDate, endDate) => {
    const formattedData = [];
    if (data && startDate && endDate) {
        data.filter(
            (item) =>
                new Date(item.Date) >= startDate &&
                new Date(item.Date) <= endDate
        ).map((item) => {
            formattedData.push({
                x: item.Date,
                y: [
                    parseFloat(item.Open),
                    parseFloat(item.High),
                    parseFloat(item.Low),
                    parseFloat(item.Close),
                ],
            });
        });
    } else if (data && startDate) {
        data.filter((item) => new Date(item.Date) >= startDate).map((item) => {
            formattedData.push({
                x: item.Date,
                y: [
                    parseFloat(item.Open),
                    parseFloat(item.High),
                    parseFloat(item.Low),
                    parseFloat(item.Close),
                ],
            });
        });
    } else {
        data.map((item) => {
            formattedData.push({
                x: item.Date,
                y: [
                    parseFloat(item.Open),
                    parseFloat(item.High),
                    parseFloat(item.Low),
                    parseFloat(item.Close),
                ],
            });
        });
    }
    return formattedData.reverse();
};
