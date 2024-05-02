import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../providers/AuthProvider';
import { twelveHourFormat } from '../../../utils/EmpTimeFunc';

const EmployeesTimeList = () => {

    const { user } = useContext(AuthContext)
    const [empTotalTime, setEmpTotalTime] = useState([]);



    const plainTime = function (x) {
        const timestamp = x;
        const date = new Date(timestamp);

        const hours = date.getUTCHours();
        const minutes = date.getUTCMinutes();

        return (`Hours: ${hours}, Minutes: ${minutes}`);
    }

    function addTimes(timeArray) {
        let totalMilliseconds = 0;

        timeArray.forEach(timeString => {
            const time = new Date(timeString);
            totalMilliseconds += time.getTime();
        });

        const resultTime = new Date(totalMilliseconds);

        // Format the result in the same format as the input
        const resultTimeString = resultTime.toISOString();

        return resultTimeString;
    }

    // Example usage
    const timeArray = [
        '1970-01-01T03:55:00.000Z',
        '1970-01-01T01:25:00.000Z'
    ];

    const result = addTimes(timeArray);
    console.log(result);


    useEffect(() => {
        fetch(`${import.meta.env.VITE_mainapi}/emptotaltimebymanager?email=${user?.email}`)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setEmpTotalTime(data)
            })
    }, [])


    return (
        <>
            <div className="overflow-x-auto mt-10 mb-20">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Restaurant Name</th>
                            <th>Start Time</th>
                            <th>End Time</th>
                            <th>Break Time</th>
                            <th>Total Hours</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            empTotalTime.map((emp, i) =>
                                <tr key={emp._id}>
                                    <th>{i + 1}</th>
                                    <td>{emp.name}</td>
                                    <td>{emp.email}</td>
                                    <td>{emp.restaurantcode}</td>
                                    <td>{twelveHourFormat(emp.starty)}</td>
                                    <td>{twelveHourFormat(emp.endy)}</td>
                                    <td>{plainTime(emp.totalBreakTime)}</td>
                                    <td>{plainTime(emp.neattime)}</td>
                                    <td>{((emp.starty).split('T')[0])}</td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default EmployeesTimeList;