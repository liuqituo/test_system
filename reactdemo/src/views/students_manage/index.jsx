// students_manage
import React,{useState,useEffect} from 'react';
// import {api_map,ApiFun} from '../../https';
import { Table, Input, Button, Space,Tag } from 'antd';
const { Column, ColumnGroup } = Table;
const { Search } = Input;


export default () => {
    const [student_list,setStudentList] = useState([]);
    const [search_state,setSearchSeate] = useState('');
    const init_students_list = [
        {
          key: '1',
          Name: 'John',
          age: 32,
          address: 'New York No. 1 Lake Park',
          tags: ['初一'],
        },
        {
          key: '2',
          Name: 'Jim',
          age: 42,
          address: 'London No. 1 Lake Park',
          tags: ['初三'],
        },
        {
          key: '3',
          Name: 'Joe',
          age: 32,
          address: 'Sidney No. 1 Lake Park',
          tags: ['初二'],
        },
      ];
    useEffect(() => {
        let reset_students_list = init_students_list.filter((item) => {
            return item.Name.includes(search_state);
        })
        setStudentList(reset_students_list);
    },[search_state])
    const onSearch =  (value) => {
        setSearchSeate(value);
    }
    const getPaper = () => {
        console.log()
    }
    // useEffect(() => {
    //   ApiFun(api_map.getStudentsList).then((data) => {
    //     setStudentList(data.data);
    //     console.log(data.data)
    //   })
    // },[])
    return (
        <div>
            <Space direction="vertical">
                <Search placeholder="input search text" onSearch={onSearch} style={{ width: 200 }} />
            </Space>
           <Table dataSource={student_list}>
            <Column title="Name" dataIndex="Name" key="name" />
            <Column title="Age" dataIndex="age" key="age" /> 
            {/* <Column title="Address" dataIndex="address" key="address" /> */}
            <Column
            title="Tags"
            dataIndex="tags"
            key="tags"
            render={tags => (
                <>
                {tags.map(tag => (
                    <Tag color="blue" key={tag}>
                    {tag}
                    </Tag>
                ))}
                </>
            )}
            />
            <Column
            title="Action"
            key="action"
            render={(text, record) => (
                <Space size="middle">
                <a>修改信息</a>
                {/* <a>错题库</a> */}
                <a>生成试卷</a>
                </Space>
            )}
            />
           </Table>
        </div>
    )
}