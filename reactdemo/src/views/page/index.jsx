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
    //初始化学生信息
    useEffect(() => {
        if(window.location.search) {
            let params = {_id:window.location.search.split('=')[1]};
            ApiGetFun(api_map.getPaperList,params).then((data) => {
                let student = data.data;
                setPaperTitle(student[0].name + '错题集合')
                setPaperId(student[0]._id)
                setPaperList(student[0].wrongQs)
                setTimeout(() => {

                    // let paper = document.querySelector(`#paper_${student[0]._id}`);
                    // html2canvas(paper, {
                    //     background: "#FFFFFF",//如果指定的div没有设置背景色会默认成黑色,这里是个坑
                    //     useCORS: true,
                    //     allowTaint: false
                    // }).then((canvas) => {
 
                    //     //未生成pdf的html页面高度
                    //     var leftHeight = canvas.height;

                    //     var a4Width = 595.28
                    //     var a4Height = 841.89
                    //     //一页pdf显示html页面生成的canvas高度;
                    //     var a4HeightRef = Math.floor(canvas.width / a4Width * a4Height);

                    //     //pdf页面偏移
                    //     var position = 0;

                    //     var pageData = canvas.toDataURL('image/jpeg', 3.0);

                    //     var pdf = new jsPDF('x', 'pt', 'a4');
                    //     var index = 1,
                    //         canvas1 = document.createElement('canvas'),
                    //         height;
                    //     pdf.setDisplayMode('fullwidth', 'continuous', 'FullScreen');

                    //     var pdfName='后勤月报';

                    //     function createImpl(canvas) {
                    //         if (leftHeight > 0) {
                    //             index++;

                    //             var checkCount = 0;
                    //             if (leftHeight > a4HeightRef) {
                    //                 var i = position + a4HeightRef;
                    //                 for (i = position + a4HeightRef; i >= position; i--) {
                    //                     var isWrite = true
                    //                     for (var j = 0; j < canvas.width; j++) {
                    //                         var c = canvas.getContext('2d').getImageData(j, i, 1, 1).data

                    //                         if (c[0] != 0xff || c[1] != 0xff || c[2] != 0xff) {
                    //                             isWrite = false
                    //                             break
                    //                         }
                    //                     }
                    //                     if (isWrite) {
                    //                         checkCount++
                    //                         if (checkCount >= 10) {
                    //                             break
                    //                         }
                    //                     } else {
                    //                         checkCount = 0
                    //                     }
                    //                 }
                    //                 height = Math.round(i - position) || Math.min(leftHeight, a4HeightRef);
                    //                 if(height<=0){
                    //                     height = a4HeightRef;
                    //                 }
                    //             } else {
                    //                 height = leftHeight;
                    //             }

                    //             canvas1.width = canvas.width;
                    //             canvas1.height = height;

                    //             // console.log(index, 'height:', height, 'pos', position);

                    //             var ctx = canvas1.getContext('2d');
                    //             ctx.drawImage(canvas, 0, position, canvas.width, height, 0, 0, canvas.width, height);

                    //             var pageHeight = Math.round(a4Width / canvas.width * height);
                    //            // pdf.setPageSize(null, pageHeight)
                    //             if(position != 0){
                    //                 pdf.addPage();
                    //             }
                    //             pdf.addImage(canvas1.toDataURL('image/jpeg', 1.0), 'JPEG', 0, 0, a4Width, a4Width / canvas1.width * height);
                    //             leftHeight -= height;
                    //             position += height;
                    //             // $('.pdfProgress').text(index + 1);
                    //             // $('.pdfTotal').text(index + Math.ceil(leftHeight / a4HeightRef));
                    //             if (leftHeight > 0) {
                    //                 setTimeout(createImpl, 500, canvas);
                    //             } else {
                    //                 pdf.save(pdfName + '.pdf');
                    //                 // $('.pdfTip').remove();
                    //             }
                    //         }
                    //     }

                    //     //当内容未超过pdf一页显示的范围，无需分页
                    //     if (leftHeight < a4HeightRef) {
                    //         pdf.addImage(pageData, 'JPEG', 0, 0, a4Width, a4Width / canvas.width * leftHeight);
                    //         pdf.save(pdfName + '.pdf')
                    //     } else {
                    //         try {
                    //             pdf.deletePage(0);
                    //             // $('.pdfTip').show();
                    //             // $('.pdfTotal').text(index + Math.ceil(leftHeight / a4HeightRef));
                    //             setTimeout(createImpl, 500, canvas);
                    //         } catch (err) {
                    //             console.log(err);
                    //         }
                    //     }
                    // })






                    // let paper = document.querySelector(`#paper_${student[0]._id}`);
                    // console.log(paper)
                    // html2canvas(paper, {
                    //     useCORS: true,
                    //     allowTaint: false
                    // }).then((canvas) => {
                    //           var contentWidth = canvas.width;
                    //           var contentHeight = canvas.height;
                        
                    //           //一页pdf显示html页面生成的canvas高度;
                    //           var pageHeight = contentWidth / 592.28 * 841.89;
                    //           //未生成pdf的html页面高度
                    //           var leftHeight = contentHeight;
                    //           //页面偏移
                    //           var position = 0;
                    //           //a4纸的尺寸[595.28,841.89]，html页面生成的canvas在pdf中图片的宽高
                    //           var imgWidth = 595.28 * 0.9;
                    //           var imgHeight = imgWidth/contentWidth * contentHeight;
                        
                    //           var pageData = canvas.toDataURL('image/jpeg', 3.0);
                        
                    //           var pdf = new JsPDF('', 'pt', 'a4');
                        
                    //           //有两个高度需要区分，一个是html页面的实际高度，和生成pdf的页面高度(841.89)
                    //           //当内容未超过pdf一页显示的范围，无需分页
                    //           if (leftHeight < pageHeight) {
                    //           pdf.addImage(pageData, 'JPEG', 20, 0, imgWidth, imgHeight );
                    //           } else {
                    //               while(leftHeight > 0) {
                    //                   pdf.addImage(pageData, 'JPEG', 20, position, imgWidth, imgHeight)
                    //                   leftHeight -= pageHeight;
                    //                   position -= 841.89;
                    //                   //避免添加空白页
                    //                   if(leftHeight > 0) {
                    //                     pdf.addPage();
                    //                   }
                    //               }
                    //           }
                        
                    //           pdf.save('content.pdf');
                    //       })
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