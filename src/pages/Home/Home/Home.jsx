import React from 'react';
import clock from './clockbgr.png'

const Home = () => {
    return (
        <div className='flex flex-col justify-center items-center lg:flex-row'>
            {/*  */}
            <img className='rounded-lg mb-4' style={{ width: '400px' }} src={clock} alt="clock" />
            <h2 className='text-5xl mb-5 text-black text-center'>Value your time, work hard</h2>

        </div>

    );
};

export default Home;