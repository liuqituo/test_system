// students_manage
import React,{useState,useEffect} from 'react';
import {api_map,ApiFun} from '../../https';
export default () => {
    const [title ,_]= useState('学生管理');
    const [student_list,setStudentList] = useState([]);
    useEffect(() => {
      ApiFun(api_map.getStudentsList).then((data) => {
        setStudentList(data.data);
        console.log(data.data)
      })
    },[])
    return (
        <div>
            <ul>
                {
                    student_list.map((item) => {
                        return <li key={item._id}>
                            {item.name}
                        </li>
                    })
                }
                <h1>{title}</h1>
            </ul>
        </div>
    )
}