// students_manage
import React,{useState,useEffect} from 'react';

export default () => {
    const [title ,_]= useState('学生管理');
    return (
        <div>
            <div>
                <h1>{title}</h1>
            </div>
        </div>
    )
}