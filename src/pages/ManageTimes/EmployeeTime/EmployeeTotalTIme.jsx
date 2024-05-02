import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import { twelveHourFormat } from "../../../utils/EmpTimeFunc";
import { totalWorkHourFunc } from "../../../utils/TotalWorkHourFunc";
import { plainTime } from "../../../utils/PlainTime";

const EmployeeTotalTIme = () => {
    const { user } = useContext(AuthContext)
    const [allTime, setAllTime] = useState([])

    useEffect(() => {
        fetch(`${import.meta.env.VITE_mainapi}/emptotaltime?email=${user?.email}`)
            .then(res => res.json())
            .then(data => {
                console.log('this is from all time', data)
                setAllTime(data)
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
                            <th>Restaurant Name</th>
                            <th>Start</th>
                            <th>End</th>
                            <th>Breaktime</th>
                            <th>Total Hours</th>
                            <th>Date</th>
                        </tr>
                    </thead>


                    <tbody>
                        {
                            allTime.map((emp, i) =>
                                <tr key={emp._id}>
                                    <th>{i + 1}</th>
                                    <td>{emp.restaurantcode}</td>
                                    <td>{twelveHourFormat(emp.starty)}</td>
                                    <td>{twelveHourFormat(emp.endy)}</td>
                                    <td>{emp.breakhour} hr {emp.breakminute} min</td>
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

export default EmployeeTotalTIme;