import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { nguoidungService } from '../../service/nguoidung.service';
import { getLocalStorage, setLocalStorage } from '../../utils/localStorage';
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import InputCustom from '../Input/InputCustom';
import { Select } from 'antd';
import { openEditForm } from '../../redux/authSlice';
import { getAllSkillApi } from '../../redux/skillSlice';

const FormEditUser = () => {
    // const [openEdit, setOpenEdit] = useState("false");
    const { listSkill } = useSelector(state => state.skillSlice);
    const { isEditFormOpen } = useSelector((state) => state.authSlice); console.log(isEditFormOpen);

    // let [step, setStep] = useState(0);
    const dispatch = useDispatch();
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
        nguoidungService.createUser(valueUser).then((res) => {
            // console.log(res);
            setStep(step + 1);
            let tmpData = {
                email: res.data.content.email,
                password: res.data.content.password
            };
            authService.signIn(tmpData).then((ress) => {
                console.log(ress.data.content);
                setLocalStorage("tmpUserData", ress.data.content);
            }).catch((errr) => {
                console.log(errr);
            })
        }).catch((err) => {
            console.log(err);
        })

    }

    const handleChangeInput = (event) => {
        const { name, value } = event.target;
        setValueUser({ ...valueUser, [name]: value })
    }
    const handleRenderStep = () => {
        return (
            <form className='space-y-3' onSubmit={handleSubmit}>
                <InputCustom labelContent="Name" onChange={handleChangeInput} name={"name"} />
                <InputCustom labelContent="Email" onChange={handleChangeInput} name={"email"} />
                <InputCustom labelContent="Phone" onChange={handleChangeInput} name={"phone"} />
                <InputCustom labelContent="Password" typeInput='password' onChange={handleChangeInput} name={"password"} />
                <div>
                    <div className="max-w-sm mx-auto">
                        <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900">Giới Tính</label>
                        <select name="gender" onChange={handleChangeInput} id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                            <option value={true}>Nam</option>
                            <option value={false}>Nữ</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900">Ngày sinh</label>
                        <input name="birthday" type="date" forrmat={""} onChange={(event) => {
                            const [year, month, day] = event.target.value.split('-');

                            const valueDate = `${day}-${month}-${year}`;
                            // console.log(valueDate);
                            setValueUser({ ...valueUser, birthday: valueDate });
                        }} />
                    </div>
                    <div>
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
                    <div>
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
                    <button type='submit' className='py-2 px-5 rounded-2xl bg-red-500 hover:bg-red-400 my-5 hover:text-white'>Cập Nhật</button>
                </div>
            </form>)
    }

    return (
        <Dialog open={isEditFormOpen} onClose={openEditForm} className="relative z-10 w-screen">
            <DialogBackdrop
                transition
                className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
            />

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <DialogPanel transition className="container relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all w-7/12 flex">
                        <button className='fa-solid fa-xmark absolute right-5 top-5 z-20' onClick={() => {
                            dispatch(openEditForm(false))
                        }}></button>

                        <div className='w-full p-12'>
                            <div className='text-center'><h1 className='text-3xl font-bold'>Edit Info User</h1></div>
                            {handleRenderStep()}
                        </div>

                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    )
}

export default FormEditUser