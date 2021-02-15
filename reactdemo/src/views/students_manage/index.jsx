// students_manage
import './index.css';
import React,{useState,useEffect} from 'react';
import {api_map,ApiGetFun} from '../../https';
import { Table, Input, Button, Space,Tag,Popover  } from 'antd';
import Upload from './components/upload';
import {
    RestOutlined,
    FileSearchOutlined
  } from '@ant-design/icons';
const { Column, ColumnGroup } = Table;
const { Search } = Input;


export default () => {
    const [student_list,setStudentList] = useState([]);
    const [search_state,setSearchSeate] = useState('');
    const onSearch =  (value) => {
        setSearchSeate(value);
    }
    const getPaper = (obj) => {
        console.log(obj)
        window.open ('http://localhost:3000/paper?_id='+obj._id)
    }
    const changeInfo = (name) => {
        ApiGetFun(api_map.deleteStudent,name).then(() => {
            setTimeout(() => {
                window.location.reload();
              },1000)
        });
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
            {/* <Column title="年龄" dataIndex="age" key="age" />  */}
            {/* <Column title="Address" dataIndex="address" key="address" /> */}
            <Column
            title="错题题号"
            dataIndex="wrongQs"
            key="wrongQs"
            render={wrongQs => (
                <>
                  {wrongQs.map(wrongQ => (
                    <Tag color="blue" key={wrongQ}>
                      {wrongQ}
                    </Tag>
                  ))}
                </>
              )}
            />
            <Column
            title="Action"
            key="action"
            width={'200px'}
            render={(text, record) => (
                <Space align={'start'}>
                    <Popover content={'删除'}>
                        <a onClick={(_) => changeInfo(record)}><RestOutlined /></a>
                    </Popover>
                    {/* <a>错题库</a> */}
                    <Popover content={'生成试卷'}>
                        <a onClick={(_) => getPaper(record)}><FileSearchOutlined /></a>
                    </Popover>
                </Space>
            )}
            />
           </Table>
        </div>
    )
}