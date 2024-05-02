import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const AdminEye = () => {
    const [allUsers, setAllUsers] = useState([])
    const [adr, setAdr] = useState([])

    //import all users
    useEffect(() => {
        fetch(`${import.meta.env.VITE_mainapi}/users`)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setAllUsers(data)
            })
    }, [])

    const handleDelete = (id) => {
        fetch(`${import.meta.env.VITE_mainapi}/users/${id}`, {
            method: 'DELETE',
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                location.reload()
            })
    }

    const handleViewProfile = (id) => {
        fetch(`${import.meta.env.VITE_mainapi}/employeeprofile/${id}`)
            .then(res => res.json())
            .then(data => {
                console.log(data)
            })
    }

    return (
        <div >
            <h2 className='text-center text-3xl mt-12'>All Managers, Employees and Admins</h2>

            <p className=''>Search </p>

            <div className="overflow-x-auto mt-10 mb-20">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>UserType</th>
                            <th>RemoveAC</th>
                            <th>view Profile</th>
                        </tr>
                    </thead>

                    <tbody>
                        {/* row 1 */}
                        {
                            allUsers.map((person, i) =>
                                <tr key={person._id}>
                                    <th>{i + 1}</th>
                                    <td>{person.name}</td>
                                    <td>{person.email}</td>
                                    <td>{person.userType}</td>
                                    <td><button onClick={() => handleDelete(person._id)} className='btn btn-neutral btn-sm'>delete</button></td>
                                    <td><button className='btn btn-neutral btn-sm'><Link to={`/profile/${person._id}`}>view profile</Link></button></td>
                                </tr>
                            )
                        }

                    </tbody>
                </table>
            </div>
        </div>


    );
};

export default AdminEye;