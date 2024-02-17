import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../../providers/AuthProvider";


const ManagerAcceptance = () => {

    const { user } = useContext(AuthContext)

    const [employeeRequ, setEmployeeRequ] = useState([])

    useEffect(() => {
        fetch(`${import.meta.env.VITE_mainapi}/emptimeacceptordeny?email=${user?.email}`)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setEmployeeRequ(data)
            })
    }, [])
    // console.log('this is employee request', employeeRequ)

    const handleAccept = (id) => {
        fetch(`${import.meta.env.VITE_mainapi}/empaccept/${id}`, {
            method: 'PATCH'
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                Swal.fire("Employee time accepted successfully!");
                location.reload()
            })
    }

    const startFrom = function (x) {
        const inputTime = new Date(x);
        const options = { hour: 'numeric', minute: 'numeric', hour12: true };
        const formattedTime = new Intl.DateTimeFormat('en-US', options).format(inputTime);

        // console.log(formattedTime);
        return formattedTime;
    }

    return (
        <>
            <h2 className="mt-16 mb-10 text-2xl text-center">Manager can accept or deny any card</h2>
            <div className=" flex flex-col justify-center items-center">
                {
                    employeeRequ.map((emp) => <>
                        <div className="card w-1/2 bg-[#009EFF] text-neutral-content mb-5">
                            <div className="card-body items-center text-center">
                                <img width='100px' height="100px" src={user?.photoURL} className='rounded-3xl' alt="" />
                                <h2 className="card-title text-white">{emp.name}</h2>
                                <p className="text-white">Start from: {startFrom(emp.starty)} End at: {startFrom(emp.endy)} and Break time: {emp.totalbreaktime}</p>
                                <div className="card-actions justify-end">
                                    <button className="btn bg-[#009EFF] text-white border-none" onClick={() => handleAccept(emp._id)}>Accept</button>
                                    <button className="btn btn-ghost">Deny</button>
                                </div>
                            </div>
                        </div>
                    </>)
                }
            </div>
        </>
    );
};

export default ManagerAcceptance;