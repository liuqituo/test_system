import React,{ useState } from "react";
import {
    Form,
    Select,
    Button,
    Rate,
    Input,
  } from 'antd';
  import Upload from './upload';
  import {api_map,ApiPostFun} from '../../../https';
  const FormContext = React.createContext({});

  const { Option } = Select;
  
  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
  };
  
  let initialValues = {
    paper_count:localStorage.getItem('paper_count') || 'A'
  }
  const Demo = () => {
    const [files,setFiles] = useState([]);
    const updateFiles = (files) => {
      setFiles(files);
    }
    const onFinish = (values) => {
      let {paper_count} = values;
      localStorage.setItem('paper_count',paper_count);
      let upload_list = {...values,...{img:files}};
      console.log('Received values of form: ', {...values,...{upload:files}});
      let UploadPromise = upload_list.img.map((item) => {
        const formData = new FormData();
        formData.append(item.name, item);
        return ApiPostFun(api_map.uploadExercise,formData);
      })
      Promise.all(UploadPromise).then((result) => {
        console.log(result);
        setTimeout(() => {
          window.location.reload();
        },1000)
      })

    };
  
    return (
      <FormContext.Provider 
      value={{
        updateFiles: updateFiles,
      }}>
        <Form
        name="validate_other"
        {...formItemLayout}
        onFinish={onFinish}
        initialValues={initialValues}
      >
        <Form.Item label="题库配置">
          <span className="ant-form-text">请选择题目图片</span>
        </Form.Item>
        <Form.Item
          name="paper_count"
          label="试卷套数"
          hasFeedback
        >
          <Select placeholder="请选择试卷套数">
            <Option value={'A'}>一套</Option>
            <Option value={'A,B'}>两套</Option>
            <Option value={'A,B,C'}>三套</Option>
            <Option value={'A,B,C,D'}>四套</Option>
            <Option value={'A,B,C,D,E'}>五套</Option>
            <Option value={'A,B,C,D,E,F'}>六套</Option>
          </Select>
        </Form.Item>
      <Form.Item
        name="img"
        label="题目上传"
        valuePropName="fileList"
        // getValueFromEvent={normFile}
        extra="支持多文件上传,请按题目类型上传"
      >
      <Upload/>
      </Form.Item>
        <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
	  </FormContext.Provider>

    );
  };

  export {FormContext};
  export default Demo;

