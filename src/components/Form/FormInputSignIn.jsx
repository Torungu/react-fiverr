import React, { useContext } from 'react'
import InputCustom from '../Input/InputCustom'
import { useFormik } from 'formik'
import { authService } from '../../service/auth.service'
import { Link, useNavigate } from 'react-router-dom'
import { getInfoUser } from '../../redux/authSlice'
import { setLocalStorage } from '../../utils/localStorage'
import { useDispatch } from 'react-redux'
import { NotificationContext } from '../../App'
import animationSignIn from "../../assets/animation/signinAnimation.json"
import { useLottie } from 'lottie-react'

const FormInputSignIn = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { showNotification } = useContext(NotificationContext)
    const options = {
        animationData: animationSignIn,
        loop: true
    };
    const { View } = useLottie(options);
    const { handleSubmit, handleChange, values, errors, touched, handleBlur } = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        onSubmit: (values) => {
            //Thực hiện lưu trữ localstorage sau khi đăng nhập thành công
            authService.signIn(values).then((res) => {
                console.log(res);
                setLocalStorage('user', res.data.content)
                dispatch(getInfoUser(res.data.content))
                showNotification("SignIn Successful, please wait a moment", "success", 2000)
                setTimeout(() => {
                    navigate("/")
                }, 2000)
            }).catch((err) => {
                console.log(err)
                showNotification(err.response.data.message, "error")

            });
        },
    })

    return (
        <div>
            <div className="container">
                <div className='flex h-screen items-center'>
                    <div className="w-1/2">
                        {View}
                    </div>
                    <div className="w-1/2">
                        <form onSubmit={handleSubmit} className='space-y-5'>
                            <h1 className='text-3xl font-bold'>Continue with your email</h1>
                            <InputCustom labelContent={"Email"} placeholder={"Email or username"} name={"email"} onChange={handleChange} value={values.email} error={errors.email} touched={touched.email} onBlur={handleBlur} />
                            <InputCustom placeholder={"Your password"} labelContent={"Password"} name={"password"} typeInput='password' onChange={handleChange} value={values.password} error={errors.password} touched={touched.password} onBlur={handleBlur} />
                            <div>
                                <button type='submit' className='inline-block w-full bg-black text-white py-2 px-5 rounded-md'>Đăng nhập</button>
                                <Link to={"/sign-up"} className='mt-3 inline-block underline duration-300 text-black'>Don't have an account? Join here</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FormInputSignIn