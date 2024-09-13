import React, { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import InputCustom from '../Input/InputCustom';
import { Select } from 'antd';
import { getAllSkillApi } from '../../redux/skillSlice';
import signUpAnimation from "./../../assets/animation/SignUpAnimation.json";
import { useLottie } from 'lottie-react';
import { nguoidungService } from '../../service/nguoidung.service';
import { useNavigate } from 'react-router-dom';
import { NotificationContext } from '../../App';

const FormInputSignUp = () => {
    const { listSkill } = useSelector(state => state.skillSlice);
    const { infoUser } = useSelector(state => state.authSlice);
    const { showNotification } = useContext(NotificationContext);
    let [step, setStep] = useState(0);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const options = {
        animationData: signUpAnimation,
        loop: true
    };
    const { View } = useLottie(options);
    const [valueUser, setValueUser] = useState({
        "name": "",
        "email": "",
        "password": "",
        "phone": "",
        "birthday": "",
        "gender": true,
        "role": "USER",
        "skill": [
        ],
        "certification": [
        ]
    });
    const [avatar, setAvatar] = useState(null);

    useEffect(() => {
        dispatch(getAllSkillApi())
    }, [])
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(valueUser)
        nguoidungService.createUser(valueUser).then((res) => {
            console.log(res);
            // setStep(step + 1);
            showNotification("Sign Up Successful", "success", 2000)
            setTimeout(() => {
                navigate("/sign-in")
            }, 3000)
        }).catch((err) => {
            console.log(err);
        })

    }

    const handleUploadAvatar = (event) => {
        event.preventDefault()
        //Chuyển đổi dữ liệu vào formData (Liên quan đến hình và file dính đến thằng này)
        let formData = new FormData();
        formData.append("formFile", avatar.file);
        let { token } = infoUser
        console.log(token);

        nguoidungService.uploadAvatar(token, formData).then((res) => {
            console.log(res)

        }).catch((err) => {
            console.log(err);
        })


    }


    const handleChangeInput = (event) => {
        const { name, value } = event.target;
        setValueUser({ ...valueUser, [name]: value })
    }


    const handleRenderStep = () => {
        switch (step) {
            case 0:
                return (

                    <div className='form_content flex justify-center items-center py-5'>
                        <div className='w-1/2'>
                            {View}
                        </div>
                        <div className='w-1/2'>
                            <h2 className='font-semibold text-3xl mb-5'>Continue with your Info</h2>
                            <form className='space-y-3' onSubmit={handleSubmit}>
                                <InputCustom labelContent="Name" onChange={handleChangeInput} name={"name"} />
                                <InputCustom labelContent="Email" onChange={handleChangeInput} name={"email"} />
                                <InputCustom labelContent="Phone" onChange={handleChangeInput} name={"phone"} />
                                <InputCustom labelContent="Password" typeInput='password' onChange={handleChangeInput} name={"password"} />
                                <div>
                                    <div className="mx-auto w-full mb-3">
                                        <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900">Giới Tính</label>
                                        <select name="gender" onChange={handleChangeInput} id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                                            <option value={true}>Nam</option>
                                            <option value={false}>Nữ</option>
                                        </select>
                                    </div>
                                    <div className='mb-3'>
                                        <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900">Ngày sinh</label>
                                        <input name="birthday" type="date" forrmat={""} onChange={(event) => {
                                            const [year, month, day] = event.target.value.split('-');

                                            const valueDate = `${day}-${month}-${year}`;
                                            console.log(valueDate);
                                            setValueUser({ ...valueUser, birthday: valueDate });
                                        }} />
                                    </div>
                                    <div className='mb-3'>
                                        {/* Thực hiện xây dựng service dành cho việc xử lí các API của các skill và sử dụng redux thunk để lưu trữ dữ liệu lên redux */}
                                        <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900">Chọn Skill</label>
                                        <Select
                                            mode="multiple"
                                            allowClear
                                            style={{
                                                width: '100%',
                                            }}
                                            placeholder="Vui lòng chọn skill"
                                            // onChange={handleChange}
                                            options={
                                                listSkill.map((item, index) => {
                                                    return {
                                                        title: item.tenSkill,
                                                        value: item.tenSkill
                                                    }
                                                })
                                            }
                                            onChange={(value) => {
                                                console.log(value)
                                                setValueUser({ ...valueUser, skill: value })
                                            }}
                                        />
                                    </div>
                                    <div className='mb-3'>
                                        <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900">Chọn chứng chỉ</label>
                                        <Select
                                            mode="tags"
                                            allowClear
                                            style={{
                                                width: '100%',
                                            }}
                                            placeholder="Vui lòng chọn chứng chỉ"
                                            tokenSeparators={[',']}
                                            onChange={(value) => {
                                                setValueUser({ ...valueUser, certification: value })
                                            }}
                                        // onChange={handleChange}
                                        // options={options}
                                        />
                                    </div>
                                    <button type='submit' className='py-2 px-5 rounded-md bg-black hover:bg-[#404145] my-5 hover:text-white text-white w-full'>Continue</button>
                                </div>
                            </form>
                        </div>

                    </div>
                )
            case 1:
                return <div>
                    <form onSubmit={handleUploadAvatar}>
                        <div>
                            <label>Vui long upload hinhanh</label>
                            <input type="file" onChange={(event) => {
                                console.log(event.target.files[0]);
                                if (event.target.files[0]) {
                                    const urlAvatar = URL.createObjectURL(event.target.files[0]);
                                    console.log(urlAvatar);
                                    setAvatar({
                                        file: event.target.files[0],
                                        url: urlAvatar
                                    });
                                }
                            }}
                                accept='image/png, image/jpeg'
                            />
                        </div>
                        {/* thuoc tinh size thường là do backed truyền lên và quy định chỉ cần get bên backend */}
                        <img src={avatar?.url} width={200} alt="err" />
                        <button type='submit' className='py-5 px-2 bg-black text-white'>upload hinh</button>
                    </form>
                </div>
        }
    }
    return (
        <div className='container mx-auto h-screen'>
            {/* Nên tách forrm thành component riêng để dễ quản lý và sử dụng */}
            {handleRenderStep()}
            {/* <button className='bg-blue-500 py-2 px-5 text-white rounded' onClick={() => {
                setStep(step + 1)
            }}>Bước tiếp theo</button> */}
        </div>
    )
}

export default FormInputSignUp