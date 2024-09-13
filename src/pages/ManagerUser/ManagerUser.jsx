import React, { useContext, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Space, Table, Tag } from 'antd';
import { nguoidungService } from '../../service/nguoidung.service';
import { Logger } from 'sass';
import { NotificationContext } from '../../App';
import { getValueUserApi } from '../../redux/nguoiDungSlice';


const ManagerUser = () => {
    const dispatch = useDispatch();
    const { showNotification } = useContext(NotificationContext);
    const { listNguoiDung } = useSelector(state => state.nguoiDungSlice);

    useEffect(() => {
        dispatch(getValueUserApi())
    }, [])

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Avatar',
            dataIndex: 'avatar',
            key: 'avatar',
            render: (text) => {
                return <img src={text} className='h-10' />
            }
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Role',
            dataIndex: 'role',
            key: 'role',
            // cach 1:
            // render:(text)=>text=="USER"?<Tag color='cyan-inverse'></Tag>:<Tag color='red-inverse'></Tag>

            //Cách 2: 
            render: (text) => <Tag color={text == "USER" ? "cyan-inverse" : "red-inverse"} className='animate-pulse'>{text}</Tag>
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle" className="space-x-3">
                    <button className='bg-red-500/85 text-white py-2 px-5 hover:animate-pulse' onClick={() => {
                        nguoidungService.deleteUser(record.id).then((res) => {
                            console.log(res)
                            // thực hiện xử lí lấy lại danh sách ng dùng
                            dispatch(getValueUserApi());
                            showNotification("Xóa thành công", "success")
                            nguoidungService.getListUser()
                        }).catch((err) => {
                            console.log(err)
                            // nguoidungService(err.response.data.message);
                            showNotification(err.response.data.message || err.response.data.content, 'error')
                        })
                    }}>Xóa</button>
                    <button className='bg-yellow-500/85 text-white py-2 px-5 hover:animate-pulse'>Sửa</button>
                </Space>
            ),
        },
    ];

    return (
        <div>
            <Table columns={columns} dataSource={listNguoiDung} />
        </div>
    )
}

export default ManagerUser