// students_manage
import './index.css';
import React,{useState,useEffect} from 'react';
import {api_map,ApiGetFun} from '../../https';
import { Table, Input, Button, Space,Tag } from 'antd';
import Upload from './components/upload';
const { Column, ColumnGroup } = Table;
const { Search } = Input;


export default () => {
    const [student_list,setStudentList] = useState([]);
    const [search_state,setSearchSeate] = useState('');
    const onSearch =  (value) => {
        setSearchSeate(value);
    }
    const getPaper = (name) => {
        console.log(name)
    }
    const changeInfo = (name) => {
        ApiGetFun(api_map.deleteStudent,name);
    }

    // useEffect(() => {
    //   ApiFun(api_map.getStudentsList).then((data) => {
    //     setStudentList(data.data);
    //     console.log(data.data)
    //   })
    // },[])
    //初始化学生信息
    useEffect(() => {
        ApiGetFun(api_map.getStudentsList).then((data) => {
            let reset_students_list = data.data.filter((item) => {
                return item.name.includes(search_state);
            })
            setStudentList(reset_students_list);
          })
    },[search_state])
    return (
        <div>
            <Space align={'center'}>
                <Upload/>
                <Search placeholder="input search text" onSearch={onSearch} style={{ width: 200 }} />
            </Space>
           <Table dataSource={student_list}>
            <Column title="姓名" dataIndex="name" key="name" />
            <Column title="年龄" dataIndex="age" key="age" /> 
            {/* <Column title="Address" dataIndex="address" key="address" /> */}
            <Column
            title="标签"
            dataIndex="tag"
            key="tag"
            render={tag => (
                <>
                    <Tag color="blue" key={tag}>
                    {tag}
                    </Tag>
                </>
            )}
            />
            <Column
            title="Action"
            key="action"
            width={'200px'}
            render={(text, record) => (
                <Space align={'start'}>
                    <a onClick={(_) => changeInfo(record)}>修改信息</a>
                    {/* <a>错题库</a> */}
                    <a onClick={(_) => getPaper(record)}>生成试卷</a>
                </Space>
            )}
            />
           </Table>
        </div>
    )
}