import { useForm } from "react-hook-form";
// import dayjs from 'dayjs';
// import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';
import { useContext, useState } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import Swal from "sweetalert2";

const EmployeeEndTime = () => {
    const { user } = useContext(AuthContext)
    const { register, reset, handleSubmit, formState: { errors } } = useForm()
    // const [timeValueEnd, setTimeValueEnd] = useState('')

    const onSubmitEnd = (data) => {
        // const startytime = localStorage.getItem('starty')
        // const endytime = (timeValueEnd.$d);
        const endytime = new Date();

        // console.log('the total break hours and the total break minutes are here bolow', data.hrs, data.minute)

        // const totalTime = function (x, y) {
        //     const timestamp1 = x;
        //     const timestamp2 = y;

        //     const date1 = new Date(timestamp1);
        //     const date2 = new Date(timestamp2);

        //     const timeDifference = Math.abs(date1 - date2);
        //     const formattedDifference = new Date(timeDifference).toISOString()

        //     return formattedDifference;
        // }

        // const breakConvertIntoISO = function (hr, min) {
        //     const initialDate = new Date(0);

        //     // Add 6 hours and 4 minutes
        //     initialDate.setUTCHours(hr);
        //     initialDate.setUTCMinutes(min);

        //     // Convert to ISO 8601 format
        //     const brandnewtime = initialDate.toISOString();

        //     console.log(brandnewtime);
        //     return brandnewtime;
        // }

        // const whour = totalTime(startytime, endytime);
        // const bhour = breakConvertIntoISO(data.hrs, data.minute);


        const employeetimesrecrodend = {
            breaktime: data.breaktime,
            // endy: timeValueEnd,
            endtime: endytime,
            // totalWorkTime: whour,
            // newbreakformat: bhour,
            // neattime: totalTime(whour, bhour),
            totalbreaktime: `${data.hrs} hour, ${data.minute} minutes`
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

                {/* end time picker */}
                {/* <div>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer
                            components={[
                                'MobileTimePicker',
                            ]}
                        >
                            <DemoItem label="End Time">
                                <MobileTimePicker
                                    label='select time'
                                    value={timeValueEnd}
                                    onChange={(newValue) => setTimeValueEnd(newValue)}
                                    defaultValue={dayjs('2022-04-17T15:30')} />
                            </DemoItem>
                        </DemoContainer>
                    </LocalizationProvider>
                </div> */}


                {/* <div className="form-control">
                    <label className="label">
                        <span className="label-text">Break Time</span>
                    </label>
                    <input type="text"  {...register("breaktime", { required: true })} name="breaktime" placeholder="breaktime" className="input input-bordered" required />
                    {errors.breaktime && <span className="text-red-600">This field is required</span>}
                </div> */}


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