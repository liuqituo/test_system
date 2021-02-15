// students_manage
import './index.css';
import React,{useState,useEffect} from 'react';
import {api_map,ApiGetFun} from '../../https';
import { Table, Input, Button, Space,Tag,Image,Popover  } from 'antd';
import AddForm from './components/add_exercises_form';
import {
  RestOutlined,
  FileSearchOutlined
} from '@ant-design/icons';
const { Column, ColumnGroup } = Table;
const { Search } = Input;


export default () => {
    const [exercise_list,setExerciseList] = useState([]);
    const [search_state,setSearchSeate] = useState('');
      useEffect(() => {
        ApiGetFun(api_map.getExerciseList).then((data) => {
            let reset_exercise_list = data.data.filter((item) => {
                return item.qid.includes(search_state);
            })
            setExerciseList(reset_exercise_list);
          })
    },[search_state])
    const onSearch =  (value) => {
        setSearchSeate(value);
    }
    const deleteInfo = (name) => {
      console.log(name)
      ApiGetFun(api_map.deleteExercise,name).then((data) => {
        setTimeout(() => {
            window.location.reload();
          },1000)
      })
    }
    const deleteAllInfo = (name) => {
        console.log(name)
        ApiGetFun(api_map.deleteAllExercise,name).then((data) => {
            setTimeout(() => {
                window.location.reload();
              },1000)
        })
      }
    return (
        <div>
            <Space align={'center'}>
                <Button htmlType="submit" onClick={(_) => deleteAllInfo()}>
                    全部删除
                </Button>
                <AddForm/>
                <Search placeholder="input search text" onSearch={onSearch} style={{ width: 200 }} />
            </Space>
           <Table dataSource={exercise_list}>
            <Column title="题号" dataIndex="qid" key="qid" />
            {/* <Column title="题目类型" dataIndex="type" key="type" /> 
            <Column title="题目难度" dataIndex="rate" key="rate" />  */}
            {/* <Column
            title="题目描述"
            dataIndex="descript"
            key="descript"
            render={descript => (
                <>
                <Tag color="blue" key={descript}>
                    {descript}
                </Tag>
                </>
            )}
            /> */}
            <Column title="题目图片" dataIndex="img" key="img" render=
            {
                (text, record) => (
                    <Image.PreviewGroup>
                    <Image
                      width={500}
                      src={record.img}
                    />
                  </Image.PreviewGroup>
                )
            }/> 
            <Column
            title="操作"
            key="action"
            render={(text, record) => (
                <Space align={'start'}>
                  <Popover content={'删除'}>
                    <a onClick={(_) => deleteInfo(record)}><RestOutlined /></a>
                  </Popover>,
                
                {/* <a>错题库</a> */}
                {/* <a onClick={(_) => getPaper(record)}>生成试卷</a> */}
                </Space>
            )}
            />
           </Table>
        </div>
    )
}