import React from 'react';
import { useLoaderData } from 'react-router-dom';

const EmployeeSingleProfile = () => {
    const allworksOfAnEmployee = useLoaderData();
    console.log('allworksOfAnEmployee is here this is the profile page', allworksOfAnEmployee)

    const plainTime = function (x) {
        const timestamp = x;
        const date = new Date(timestamp);

        const hours = date.getUTCHours();
        const minutes = date.getUTCMinutes();

        return (`Hours: ${hours}, Minutes: ${minutes}`);
    }
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
                            <th>Hours</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            allworksOfAnEmployee.map((emp, i) =>
                                <tr key={emp._id}>
                                    <th>{i + 1}</th>
                                    <td>{emp.name}</td>
                                    <td>{emp.email}</td>
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

export default EmployeeSingleProfile;