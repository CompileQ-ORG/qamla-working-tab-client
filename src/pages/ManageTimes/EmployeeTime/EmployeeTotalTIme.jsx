import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../providers/AuthProvider";

const EmployeeTotalTIme = () => {
    const { user } = useContext(AuthContext)
    const [allTime, setAllTime] = useState([])

    const plainTime = function (x) {
        const timestamp = x;
        const date = new Date(timestamp);

        const hours = date.getUTCHours();
        const minutes = date.getUTCMinutes();

        return (`Hours: ${hours}, Minutes: ${minutes}`);
    }

    const thatDay = function () {
        const [datePart, timePart] = dateTimeString.split('T');
        return datePart;
    }

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
                            <th>Hours</th>
                            <th>Date</th>
                        </tr>
                    </thead>


                    <tbody>
                        {/* row 1 */}
                        {
                            allTime.map((emp, i) =>
                                <tr key={emp._id}>
                                    <th>{i + 1}</th>
                                    <td>{emp.restaurantcode}</td>
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