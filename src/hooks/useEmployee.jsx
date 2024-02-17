import { useEffect, useState } from 'react';

const useEmployee = email => {
    const [isEmployee, setIsEmployee] = useState(false);
    const [isEmployeeLoading, setIsEmployeeLoading] = useState(true);

    useEffect(() => {
        if (email) {
            fetch(`${import.meta.env.VITE_mainapi}/users/employee/${email}`)
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    setIsEmployee(data.isEmployee);
                    setIsEmployeeLoading(false);
                })
        }
    }, [email])
    return [isEmployee, isEmployeeLoading]
};

export default useEmployee;