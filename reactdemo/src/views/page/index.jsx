// paper

import React,{useState,useEffect} from 'react';

export default () => {
    const [title ,_]= useState('试卷');
    return (
        <div>
            <div>
                <h1>{title}</h1>
            </div>
        </div>
    )
}