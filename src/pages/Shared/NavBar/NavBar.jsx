import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../providers/AuthProvider";
import useEmployee from "../../../hooks/useEmployee";
import useManager from "../../../hooks/useManager";
import useAdmin from "../../../hooks/useAdmin";

const NavBar = () => {
    // const [isEmployee] = useEmployee(user?.email);

    const { user, logOut } = useContext(AuthContext);

    const [isEmployee, isEmployeeLoading] = useEmployee(user?.email);

    const [isManager, isManagerLoading] = useManager(user?.email);

    const [isAdmin, isAdminLoading] = useAdmin(user?.email);


    const handleLogOut = () => {
        logOut()
            .then(() => {
                location.reload()
            })
            .catch(error => {
                console.log(error)
            })
    }

    const navOptions = <>

        <>
            {/* <li><Link>Parent</Link></li> */}
            {/* <li><Link to='/secret'>Secret</Link></li> */}
            <li><Link to='/home'>Home</Link></li>

            {
                isEmployee && <>
                    <li><Link to='/worktab'>Time In</Link></li>
                    <li><Link to='/worktabend'>Time Out</Link></li>
                    <li><Link to='/totaltime'>Total Time</Link></li>
                </>
            }

            {
                isManager && <>
                    {/* <li><Link to='/manageracceptance'>Accept/Deny</Link></li> */}
                    <li><Link to='/employeeworktimelist'>Employee Time List</Link></li>
                </>
            }

            {
                isAdmin && <>
                    <li><Link to='/adminway'>Admin World</Link></li>
                </>
            }
        </>



    </>
    return (
        <>
            <div className="navbar bg-base-100">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            {navOptions}
                        </ul>
                    </div>
                    <a className="btn btn-ghost text-xl text-[#009EFF]">Qamla</a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {navOptions}
                    </ul>
                </div>
                <div className="navbar-end">
                    {
                        user ? <>
                            <span className="text-[#009EFF]">{user?.displayName}</span>
                            <button onClick={handleLogOut} className="btn btn-ghost">Logout</button>
                        </> : <>
                            <Link to='login'>Login</Link>
                        </>
                    }
                </div>

            </div>
        </>
    );
};

export default NavBar;