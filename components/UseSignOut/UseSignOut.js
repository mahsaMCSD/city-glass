import { useRouter } from 'next/router';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { signout } from '../../redux/user/user.actions';


const UseSignOut = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    useEffect(() => {
        const logout = () => {
            dispatch(signout())
            router.push('/auth')
        }
        logout()
    })

    return logout
}
export default UseSignOut;