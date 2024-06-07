export const candleStickOptions = (data, startDate, endDate) => {
    return {
        chart: {
            type: "candlestick",
            zoom: {
                enabled: false,
            },
            toolbar: {
                show: true,
                tools: {
                    download: false,
                },
            },
        },

        tooltip: {
            theme: "dark",
            style: {
                colors: ["#000"],
            },
        },

        xaxis: {
            type: "YYYY-MM-DD",
            tickAmount: 6,
            min: startDate,
            max: endDate,

            labels: {
                rotate: 0,
                style: {
                    colors: "#fff",
                },
            },

            axisTicks: {
                show: false,
            },
        },
        yaxis: {
            labels: {
                style: {
                    colors: "#fff",
                },
                formatter: function (value) {
                    return value.toFixed(1);
                },
            },
            opposite: true,
        },
    };
};
