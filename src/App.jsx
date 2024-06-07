import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import Papa from "papaparse";
import Chart from "./components/Chart/Chart";
import { Calendar } from "primereact/calendar";
import { Toast } from "primereact/toast";
import { FiCalendar } from "react-icons/fi";
function App() {
    const [file, setFile] = useState(null);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [data, setData] = useState([]);
    const calendarStartRef = useRef();
    const calendarEndRef = useRef();
    const toast = useRef(null);
    useEffect(() => {
        if (file === undefined) {
            setData([]);
            setStartDate(null);
            setEndDate(null);
        }
    }, [file]);
    useEffect(() => {
        if (startDate >= endDate || startDate === null) {
            setEndDate(null);
        }
    }, [startDate, endDate]);

    const handleSubmit = () => {
        if (file) {
            Papa.parse(file, {
                header: true,
                complete: function (results) {
                    setData(results.data);
                },
                error: function (error) {
                    toast.current.show({
                        severity: "error",
                        summary: "Error",
                        detail: "Something went wrong",
                        life: 3000,
                    });
                },
            });
        } else {
            toast.current.show({
                severity: "error",
                summary: "Error",
                detail: "Please select a file",
                life: 3000,
            });
        }
    };

    return (
        <div className="app">
            <Toast ref={toast} />
            <div className="input">
                <input
                    type="file"
                    name="file"
                    accept=".csv"
                    onChange={(e) => setFile(e.target.files[0])}
                />
                <button onClick={handleSubmit} className="btn-submit">
                    Submit
                </button>
            </div>

            <div className="chart-container">
                <div className="date-option">
                    <div className="date-input">
                        <Calendar
                            ref={calendarStartRef}
                            value={startDate}
                            onChange={(e) => {
                                setStartDate(e.value);
                            }}
                            placeholder="Select Start Date"
                            disabled={data.length === 0 ? true : false}
                            disabledDates={endDate ? [endDate] : null}
                            dateFormat="yy-mm-dd"
                        />

                        <FiCalendar
                            className="date-icon"
                            onClick={() => {
                                if (file && data.length > 0) {
                                    calendarStartRef.current.show();
                                }
                            }}
                        />
                    </div>
                    -
                    <div className="date-input">
                        <Calendar
                            ref={calendarEndRef}
                            onChange={(e) => setEndDate(e.value)}
                            value={endDate}
                            disabledDates={startDate ? [startDate] : null}
                            minDate={startDate}
                            disabled={startDate ? false : true}
                            placeholder="Select End Date"
                            dateFormat="yy-mm-dd"
                        />
                        <FiCalendar
                            className="date-icon"
                            onClick={() => {
                                if (file && data.length > 0 && startDate) {
                                    calendarEndRef.current.show();
                                }
                            }}
                        />
                    </div>
                </div>
                <Chart
                    symbol={"IBM"}
                    data={data}
                    startDate={startDate}
                    endDate={endDate}
                />
            </div>
        </div>
    );
}

export default App;
