import { useForm } from "react-hook-form";
// import dayjs from 'dayjs';
// import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';
import { useContext, useState } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import Swal from "sweetalert2";


const EmployeeTime = () => {
    const { user } = useContext(AuthContext)
    const { register, reset, handleSubmit, watch, formState: { errors } } = useForm()

    // const [timeValue, setTimeValue] = useState('')
    // console.log('toLocaleString', (timeValue.$d));
    // const starty = (timeValue.$d);
    const starty = new Date()

    // const [storeStarty, setStoreStarty] = useState('')


    const onSubmitStart = (data) => {
        // console.log(data)
        // // setStoreStarty(data.)
        // console.log(data.restaurantcode)
        const employeetimesrecrodstart = {
            restaurantcode: data.restaurantcode,
            starty,
            // accept: false,
            // deny: false,
            name: user.displayName,
            email: user.email,
        }

        fetch(`${import.meta.env.VITE_mainapi}/employeetimerecord`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(employeetimesrecrodstart)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                localStorage.clear();
                localStorage.setItem(`${user?.displayName}Id`, `${data.insertedId}`)
                localStorage.setItem('starty', `${starty}`)

                Swal.fire("Start time added succcessfully!");
            })
    }

    return (
        <div>
            <form className="mt-10 mx-5 lg:mx-10 " onSubmit={handleSubmit(onSubmitStart)}>


                <div className="form-control md:w-1/5">
                    {/* w-1/5 */}
                    <label className="label">
                        <span className="label-text">Restaurant Name or Code</span>
                    </label>
                    <input type="text"  {...register("restaurantcode", { required: true })} name="restaurantcode" placeholder="name" className="input input-bordered " required />
                    {errors.restaurantcode && <span className="text-red-600">This field is required</span>}
                </div>

                {/* start time picker */}
                {/* <div className="mt-5 ">
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer
                            components={[
                                'MobileTimePicker',
                            ]}
                        >

                            <DemoItem label="Start Time">
                                <MobileTimePicker
                                    label='select time'
                                    value={timeValue}
                                    onChange={(newValue) => setTimeValue(newValue)}
                                    defaultValue={dayjs('2022-04-17T15:30')} />
                            </DemoItem>
                        </DemoContainer>

                    </LocalizationProvider>
                </div> */}

                <input className="mt-8 mb-20 btn btn-primary hover:bg-[#a9c2de] bg-[#009EFF] border-none text-white" type="submit" value="save start time" />
            </form>
        </div>
    );
};

export default EmployeeTime;