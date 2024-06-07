import React, { useMemo } from "react";
import "./chart.css";
import ReactApexChart from "react-apexcharts";
import { candleStickOptions } from "../../constant/constant";
import { formatData } from "../../utils/formatData";
const Chart = ({ data, startDate, endDate }) => {
    const seriesData = useMemo(
        () => formatData(data, startDate, endDate),
        [data, startDate, endDate]
    );
    return (
        <div className="chart">
            <ReactApexChart
                series={[
                    {
                        data: seriesData,
                    },
                ]}
                height={350}
                width={700}
                options={candleStickOptions(seriesData, startDate, endDate)}
                type="candlestick"
            />
        </div>
    );
};

export default Chart;
