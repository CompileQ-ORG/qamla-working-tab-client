import { useForm } from "react-hook-form";
import { useContext, useState } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import Swal from "sweetalert2";
import { breakConvertIntoISO } from "../../../utils/BreakTimeFunc";
import { totalWorkHourFunc } from "../../../utils/TotalWorkHourFunc";

import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup";

const schema = yup
    .object({
        hrs: yup.number().min(0, { message: 'required' }).required(),
        minute: yup.number().positive().integer().required(),
    })
    .required()



const EmployeeEndTime = () => {
    const { user } = useContext(AuthContext)
    const { register, reset, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    })


    const [axis, setAxis] = useState(true);

    const onSubmitEnd = (data) => {


        const startytime = localStorage.getItem('starty')

        //total break time
        const totalBreakTime = breakConvertIntoISO(data.hrs, data.minute);
        console.log('its total break time', totalBreakTime);

        const endy = new Date();
        const convertEndyIntoIso = endy.toISOString();

        //total work time
        const totalworkhourx = totalWorkHourFunc(convertEndyIntoIso, startytime);
        console.log('its total work hour', totalworkhourx);

        const neattimex = totalWorkHourFunc(totalworkhourx, totalBreakTime);

        if (totalworkhourx < totalBreakTime) {
            setAxis(false);
        } else {
            setAxis(true);
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
                        {/* {errors.hrs && <span className="text-red-600">Please, provide positive number only(required)</span>} */}
                    </div>

                    <div className="form-control w-1/3 md:w-1/6">
                        <label className="label">
                            <span className="label-text"></span>
                        </label>
                        <input type="text"  {...register("minute", { required: true })} name="minute" placeholder="minute" className="input input-bordered" required />
                    </div>

                </div>



                {(errors.minute || errors.hrs) && <span className="text-red-600">Please, provide positive number only(required)</span>}
                {!axis && <span className="text-red-600">Break time cannot be greater than the total time</span>}

                <br />


                <input className="mt-8 mb-20 btn btn-primary hover:bg-[#0075FF] bg-[#009EFF] border-none text-white" type="submit" value="save end time" />
            </form>
        </div>
    );
};

export default EmployeeEndTime;