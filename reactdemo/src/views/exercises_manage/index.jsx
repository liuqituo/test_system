// students_manage
import './index.css';
import React,{useState,useEffect} from 'react';
// import {api_map,ApiFun} from '../../https';
import { Table, Input, Button, Space,Tag,Image  } from 'antd';
import AddForm from './components/add_exercises_form';
const { Column, ColumnGroup } = Table;
const { Search } = Input;


export default () => {
    const [student_list,setStudentList] = useState([]);
    const [search_state,setSearchSeate] = useState('');
    const init_students_list = [
        {
          key: '1',
          Name: 'John',
          age: 1,
          address: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
          tags: ['相似三角形'],
        },
        {
          key: '2',
          Name: 'John',
          age: 1,
          address: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
          tags: ['相似三角形'],
        },
        {
          key: '3',
          Name: 'Tom',
          age: 2,
          address: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
          tags: ['代数'],
        },
        {
            key: '4',
            Name: 'John',
            age: 1,
            address: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
            tags: ['相似三角形'],
          },
          {
            key: '5',
            Name: 'John',
            age: 1,
            address: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
            tags: ['相似三角形'],
          },
          {
            key: '6',
            Name: 'Tom',
            age: 2,
            address: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
            tags: ['代数'],
          },
          {
            key: '7',
            Name: 'John',
            age: 1,
            address: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
            tags: ['相似三角形'],
          },
          {
            key: '8',
            Name: 'John',
            age: 1,
            address: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
            tags: ['相似三角形'],
          },
          {
            key: '9',
            Name: 'Tom',
            age: 2,
            address: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
            tags: ['代数'],
          },
          {
            key: '10',
            Name: 'John',
            age: 1,
            address: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
            tags: ['相似三角形'],
          },
          {
            key: '11',
            Name: 'John',
            age: 1,
            address: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
            tags: ['相似三角形'],
          },
          {
            key: '12',
            Name: 'Tom',
            age: 2,
            address: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
            tags: ['代数'],
          },
          {
            key: '13',
            Name: 'John',
            age: 1,
            address: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
            tags: ['相似三角形'],
          },
          {
            key: '14',
            Name: 'John',
            age: 1,
            address: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
            tags: ['相似三角形'],
          },
          {
            key: '15',
            Name: 'Tom',
            age: 2,
            address: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
            tags: ['代数'],
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
    const getPaper = (name) => {
        console.log(name)
    }
    const changeInfo = (name) => {
        console.log(name)
    }

    const uploadExercises = () => {

    }
    // useEffect(() => {
    //   ApiFun(api_map.getStudentsList).then((data) => {
    //     setStudentList(data.data);
    //     console.log(data.data)
    //   })
    // },[])
    return (
        <div>
            <Space align={'center'}>
                <AddForm/>
                <Search placeholder="input search text" onSearch={onSearch} style={{ width: 200 }} />
            </Space>
           <Table dataSource={student_list}>
            <Column title="学生名称" dataIndex="Name" key="name" />
            <Column title="题目类型" dataIndex="age" key="age" /> 
            {/* <Column title="Address" dataIndex="address" key="address" /> */}
            <Column
            title="知识点"
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
            <Column title="题目图片" dataIndex="age" key="age" render=
            {
                (text, record) => (
                    <Image.PreviewGroup>
                    <Image
                      width={30}
                      src={record.address}
                    />
                  </Image.PreviewGroup>
                )
            }/> 
            <Column
            title="操作"
            key="action"
            render={(text, record) => (
                <Space align={'start'}>
                <a onClick={(_) => changeInfo(record)}>删除</a>
                {/* <a>错题库</a> */}
                {/* <a onClick={(_) => getPaper(record)}>生成试卷</a> */}
                </Space>
            )}
            />
           </Table>
        </div>
    )
}