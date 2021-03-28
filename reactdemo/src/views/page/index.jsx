// paper

import React,{useState,useEffect} from 'react';
import {api_map,ApiGetFun} from '../../https';
import { Row, Col,Tag,Image } from 'antd';
import $ from '../../public/js/jQuery.print.js';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
export default () => {
    console.log(window.location.search)
    const [paper_title ,setPaperTitle]= useState('');
    const [paper_id,setPaperId]= useState('');
    const [paper_list ,setPaperList]= useState([]);
    //错题数量等级判断
    const wrongQLevelJudge = (wrongQs) => {
        //当前试题库试卷套数
        let paper_count = localStorage.getItem('paper_count').split(',');
        console.log(paper_count)
        let wrongQCount = wrongQs.length;
        if(wrongQCount >= 15){
            if(paper_count.length === 1 ) {
                return ['A'];
            }else if (paper_count.length === 2) {
                let index = Math.floor((Math.random()*paper_count.length));
                return paper_count[index];
            }else {
                let result = [];
                for(let i=0;i<2;i++) {
                    let index = Math.floor((Math.random()*paper_count.length));
                    result.push(paper_count[index]);
                }
                return [...new Set(result)];
            }
        }else if(wrongQCount >= 10 && wrongQCount <15){
            if(paper_count.length === 1 ) {
                return paper_count;
            }else if(paper_count.length === 3 || paper_count.length === 2) {
                let result = [];
                for(let i=0;i<2;i++) {
                    let index = Math.floor((Math.random()*paper_count.length));
                    result.push(paper_count[index]);
                }
                return [...new Set(result)];
            }else{
                let result = [];
                for(let i=0;i<3;i++) {
                    let index = Math.floor((Math.random()*paper_count.length));
                    result.push(paper_count[index]);
                }
                return [...new Set(result)];
            }
        }else if(wrongQCount >= 5 && wrongQCount <10){
            if(paper_count.length === 4) {
                let result = [];
                for(let i=0;i<3;i++) {
                    let index = Math.floor((Math.random()*paper_count.length));
                    result.push(paper_count[index]);
                }
                return [...new Set(result)];
            }else if(paper_count.length === 5 || paper_count.length === 6) {
                let result = [];
                for(let i=0;i<4;i++) {
                    let index = Math.floor((Math.random()*paper_count.length));
                    result.push(paper_count[index]);
                }
                return [...new Set(result)];
            }else {
                return paper_count;
            }
        }else if(wrongQCount <5){
            return paper_count;
        }
    }
    //更具错题等级生成错题集
    const paperListMaker = (paper_list,wrongQs) => {
        //错题集
        let wrongq_list = [];
        wrongQs.forEach(parItem => {
            paper_list.forEach(chiItem => {
                let wrongq_url = `${chiItem}-${parItem}`;
                wrongq_list.push(wrongq_url);
            })
        })
        setPaperList(wrongq_list);
        return wrongq_list;
    }
    //初始化学生信息
    useEffect(() => {
        if(window.location.search) {
            let params = {_id:window.location.search.split('=')[1]};
            ApiGetFun(api_map.getPaperList,params).then((data) => {
                let student = data.data;
                setPaperTitle(student[0].name + '错题集合')
                setPaperId(student[0]._id)
                let paper_list = wrongQLevelJudge(student[0].wrongQs);
                paperListMaker(paper_list,student[0].wrongQs);
                //打印试卷
                setTimeout(() => {
                    $(`#paper_${paper_id}`).print({
                    });
                },1000)
              })
        }
    },[])
    return (
        
        <Row>
            <Col span="2"></Col>
            <Col span="20">
                <div id={`paper_${paper_id}`}>
                    <h1 style={{textAlign: 'center'}}>{paper_title}</h1>
                        {               
                        <>
                        {paper_list.map(wrongQ => (
                            <img
                            width='100%'
                            src={`http://localhost:3001/picture/${wrongQ}.png`}
                            key={wrongQ}
                            crossOrigin='Anonymous'
                          />
        
                        ))}
                        </>}
                </div>
            </Col>
            <Col span="2"></Col>
        </Row>
    )
}