// exercise_manage


import React,{useState,useEffect} from 'react';

export default () => {
    const [title ,_]= useState('习题库');
    return (
        <div>
            <div>
                <h1>{title}</h1>
            </div>
        </div>
    )
}