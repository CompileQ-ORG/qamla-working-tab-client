import { useForm } from "react-hook-form";
import { useContext, useState } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import Swal from "sweetalert2";
import { breakConvertIntoISO } from "../../../utils/BreakTimeFunc";
import { totalWorkHourFunc } from "../../../utils/TotalWorkHourFunc";

const EmployeeEndTime = () => {
    const { user } = useContext(AuthContext)
    const { register, reset, handleSubmit, formState: { errors } } = useForm()



    const onSubmitEnd = (data) => {


        const startytime = localStorage.getItem('starty')
        const totalBreakTime = breakConvertIntoISO(data.hrs, data.minute);
        const endy = new Date();
        const convertEndyIntoIso = endy.toISOString();
        const totalworkhourx = totalWorkHourFunc(convertEndyIntoIso, startytime);
        const neattimex = totalWorkHourFunc(totalworkhourx, totalBreakTime)



        const employeetimesrecrodend = {
            breakhour: data.hrs,
            breakminute: data.minute,
            endy: endy,
            totalBreakTime: totalBreakTime,
            totalworkhour: totalworkhourx,
            neattime: neattimex

        }

        fetch(`${import.meta.env.VITE_mainapi}/endtime/${localStorage.getItem(`${user?.displayName}Id`)}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(employeetimesrecrodend)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                localStorage.removeItem(`${user?.displayName}Id`)
                localStorage.removeItem('starty')
                Swal.fire("End and Break time added succcessfully!");
            })
    }

    return (
        <div>
            <form className="mt-10 mx-5 lg:mx-10" onSubmit={handleSubmit(onSubmitEnd)}>

                <p className="mt-8">Break Time</p>
                <div className="flex">
                    <div className="form-control w-1/3 md:w-1/6">
                        <label className="label">
                            <span className="label-text"></span>
                        </label>
                        <input type="text"  {...register("hrs", { required: true })} name="hrs" placeholder="hour" className="input input-bordered" required />
                        {errors.hrs && <span className="text-red-600">This field is required</span>}
                    </div>

                    <div className="form-control w-1/3 md:w-1/6">
                        <label className="label">
                            <span className="label-text"></span>
                        </label>
                        <input type="text"  {...register("minute", { required: true })} name="minute" placeholder="minute" className="input input-bordered" required />
                        {errors.minute && <span className="text-red-600">This field is required</span>}
                    </div>

                </div>
                <input className="mt-8 mb-20 btn btn-primary hover:bg-[#0075FF] bg-[#009EFF] border-none text-white" type="submit" value="save end time" />
            </form>
        </div>
    );
};

export default EmployeeEndTime;