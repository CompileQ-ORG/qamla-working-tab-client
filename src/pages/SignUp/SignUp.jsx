import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../providers/AuthProvider";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import signupimg from './loginin.png';


const SignUp = () => {
    const [uloading, setULoading] = useState(false);
    const { register, reset, handleSubmit, watch, formState: { errors } } = useForm()
    const { createUser, updateUserProfile, logOut } = useContext(AuthContext)
    const [userType, setUserType] = useState("employee");
    const navigate = useNavigate();

    const handleLogOut = () => {
        logOut()
            .then(() => { })
            .catch(error => {
                console.log(error)
            })
    }

    const saveUser = (name, email, restaurantnamecode, position, img) => {
        const userSingUpAs = {
            name,
            email,
            userType,
            restaurantnamecode,
            position,
            img
        }

        fetch(`${import.meta.env.VITE_mainapi}/users`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(userSingUpAs)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
            })
    }


    const imgHostKey = 'bd1f74ef4256c79a347bb85c64516903';

    const onSubmit = (data) => {
        setULoading(true)


        // const image = data.image[0]
        // console.log(data.image)

        // const formData = new FormData()
        // formData.append('image', image)
        // const url = `https://api.imgbb.com/1/upload?key=${imgHostKey}`

        // fetch(url, {
        //     method: 'POST',
        //     body: formData
        // })
        //     .then(res => res.json())
        //     .then(imgData => {
        //         if (imgData.success) {
        //             console.log(imgData.data.url)

        //             //create user start

        //         }
        //     })


        createUser(data.email, data.password)
            .then(result => {
                const loggedUser = result.user
                console.log(loggedUser)

                updateUserProfile(data.name,)
                    // imgData.data.url
                    .then(() => {
                        saveUser(data.name, data.email, data.restaurantnamecode, data.position,)
                        // imgData.data.url
                        console.log('User profile info updated successfully')
                        setULoading(false)
                        // reset();
                        Swal.fire("Signup is Successfull! and you will be logged out now! Kindly log in again!!!");
                        handleLogOut()
                        navigate('/');
                    })
                    .catch(error => console.log(error))
            })

    }

    return (
        <>

            {
                uloading ? <span className="loading loading-spinner loading-lg"></span> :


                    <div className="hero bg-[#93c6fd]">
                        <div className="hero-content flex lg:flex-row-reverse sm:flex flex-col">
                            <div className="text-center md:w-1/2 lg:text-left">
                                <img src={signupimg} alt="" />
                            </div>

                            <div className="card md:w-1/2 max-w-sm shadow-2xl bg-[#93c6fd]">
                                <form onSubmit={handleSubmit(onSubmit)} className="card-body">

                                    {/* role */}
                                    <h2 className="text-3xl mb-5">Signup First!!!</h2>
                                    <div className='signup as'>
                                        <h2>Signup as</h2>
                                        <label>
                                            <input
                                                type="radio"
                                                value="employee"
                                                checked={userType === "employee"}
                                                onChange={() => setUserType("employee")}
                                            />
                                            Employee
                                        </label>
                                        <br />
                                        <label>
                                            <input
                                                type="radio"
                                                value="manager"
                                                checked={userType === "manager"}
                                                onChange={() => setUserType("manager")}
                                            />
                                            Manager
                                        </label>
                                        <br />
                                    </div>

                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Name</span>
                                        </label>
                                        <input type="text"  {...register("name", { required: true })} name="name" placeholder="name" className="input input-bordered" required />
                                        {/* {errors.email && <span className="text-red-600">This field is required</span>} */}
                                        {errors.name?.type === 'required' && <p className="text-red-500" role="alert">Name is required</p>}
                                    </div>

                                    {/* 

                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Upload Photo</span>
                                        </label>
                                        <input type="file" {...register("image", {
                                            required: "CV is Required"
                                        })} id="fileInput5" className="input input-bordered w-full max-w-xs reservationInput pt-2" />
                                        {errors.image && <p className='text-red-500'>{errors.name.image}</p>}
                                    </div>
                                 */}


                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Email</span>
                                        </label>
                                        <input type="email"  {...register("email", { required: true })} name="email" placeholder="email" className="input input-bordered" required />
                                        {/* {errors.email && <span className="text-red-600">This field is required</span>} */}
                                        {errors.email?.type === 'required' && <p className="text-red-500" role="alert">Email is required</p>}

                                    </div>

                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Password</span>
                                        </label>
                                        <input type="password" id="password"
                                            {...register("password",
                                                {
                                                    required: true,
                                                    minLength: 6
                                                })}
                                            name="password"
                                            placeholder="password"
                                            className="input input-bordered" required />
                                        {errors.password && <p className="text-red-500" role="alert"> Password required and at least 6 characters</p>}
                                    </div>

                                    {
                                        (userType === 'manager') && <>
                                            <div className="form-control">
                                                <label className="label">
                                                    <span className="label-text">Restaurant Name or Code</span>
                                                </label>
                                                <input type="text"  {...register("restaurantnamecode", { required: true })} name="restaurantnamecode" placeholder="restaurant name" className="input input-bordered" required />
                                                {errors.restaurantnamecode?.type === 'required' && <p className="text-red-500" role="alert">Position is required</p>}
                                            </div>
                                        </>
                                    }

                                    {
                                        (userType === 'employee') && <>
                                            <div className="form-control">
                                                <label className="label">
                                                    <span className="label-text">Employee Position</span>
                                                </label>
                                                <input type="text"  {...register("position", { required: true })} name="position" placeholder="position" className="input input-bordered" required />
                                                {/* {errors.restaurantnamecode && <span className="text-red-600">This field is required</span>} */}
                                                {errors.position?.type === 'required' && <p className="text-red-500" role="alert">Position is required</p>}
                                            </div>
                                        </>
                                    }

                                    <div className="form-control mt-6">
                                        <p className="ml-5">*After signing up, you will be automatically logged out. Please log in again to continue!</p>
                                        <input className="btn btn-primary" type="submit" value="Sign Up" />
                                    </div>
                                </form>
                                <p className='text-center mb-6'><small>Already have an account? <Link to="/login"><u>Login!</u></Link></small></p>
                            </div>
                        </div>
                    </div>
            }


        </>
    );
};

export default SignUp;