
import LiveClock from './LiveClock';
import clock from './clockbgr.png'
const Home = () => {


    return (
        <>
            {/* <div className='flex flex-col justify-center items-center lg:flex-row'> */}
            {/*  */}
            {/* <img className='rounded-lg mb-4' style={{ width: '400px' }} src={clock} alt="clock" /> */}
            {/* <h2 className='text-5xl mb-5 text-black text-center'>Value your time, work hard</h2> */}

            {/* </div> */}
            <h2 className=' mt-10 text-2xl md:text-3xl lg:text-5xl text-[#009eff] text-center '>Welcome to Qamla Hours Calculator!</h2>
            <LiveClock></LiveClock>

        </>
    );
};

export default Home;