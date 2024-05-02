import React, { useContext, useState } from 'react';
import { AuthContext } from '../../providers/AuthProvider';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import img1 from './loginin.png';

const Login = () => {

    const [uloading, setULoading] = useState(false);
    const { signIn } = useContext(AuthContext)
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/";

    const handleLogin = event => {
        setULoading(true)
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);
        signIn(email, password)
            .then(result => {
                const user = result.user;
                setULoading(false)
                console.log(user)
                Swal.fire("Login Succcessfully!");

                navigate(from, { replace: true });
            })
    }

    return (
        <>

            {
                uloading ?

                    <span className="loading loading-spinner loading-lg"></span> :

                    <div className=" hero bg-[#93c6fd]">
                        <div className="hero-content flex sm:flex flex-col lg:flex-row-reverse ">
                            <div className="text-center md:w-1/2 lg:text-left">
                                <img src={img1} alt="" />
                            </div>

                            <div className="card md:w-1/2 max-w-sm shadow-2xl bg-[#93c6fd]">
                                <form onSubmit={handleLogin} className="card-body">
                                    <h2 className='text-3xl'>Login Now!!!</h2>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Email</span>
                                        </label>
                                        <input type="email" name='email' placeholder="email" className="input input-bordered" required />
                                    </div>

                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Password</span>
                                        </label>
                                        <input type="password"
                                            name='password' placeholder="password" className="input input-bordered" required />
                                    </div>

                                    <div className="form-control mt-6">
                                        <input
                                            className="btn btn-primary"
                                            type="submit" value="Login" />
                                    </div>
                                </form>
                                <p className='text-center mb-6'><small>New Here? <Link to="/signup"><u>Create an account</u></Link></small></p>
                            </div>
                        </div>
                    </div>
            }


        </>
    );
};

export default Login;