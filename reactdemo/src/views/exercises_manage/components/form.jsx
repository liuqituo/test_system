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
  
  const Demo = () => {
    const [files,setFiles] = useState([]);
    const updateFiles = (files) => {
      setFiles(files);
    }
    const onFinish = (values) => {
      console.log(values)
      let upload_list = {...values,...{img:files}};
      console.log('Received values of form: ', {...values,...{upload:files}});
      let UploadPromise = upload_list.img.map((item) => {
        const formData = new FormData();
        formData.append(item.name, item);
        let params = {
          'descript': values.descript,
          'rate': values.rate,
          'student': values.student,
          'type': values.type,
        }
        for(let key in params) {
          formData.append(key, params[key]);
        }
        return ApiPostFun(api_map.uploadExercise,formData);
      })
      Promise.all(UploadPromise).then((result) => {
        console.log(result);
      })
          // console.log(fileList);

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
        initialValues={{
          ['input-number']: 3,
          ['checkbox-group']: ['A', 'B'],
          rate: 3.5,
        }}
      >
        <Form.Item label="题库配置">
          <span className="ant-form-text">请选择以下配置</span>
        </Form.Item>
        <Form.Item
        label="学生姓名"
        name="student"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input />
      </Form.Item>
        <Form.Item
          name="type"
          label="题目类型"
          hasFeedback
          rules={[{ required: true, message: 'Please select your country!' }]}
        >
          <Select placeholder="Please select a country">
            <Option value="1">选择题</Option>
            <Option value="2">填空题</Option>
            <Option value="3">大题</Option>
          </Select>
        </Form.Item>

        <Form.Item name="rate" label="题目难度">
          <Rate />
        </Form.Item>
        <Form.Item
        name="descript"
        label="题目描述"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input />
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

        {/* <Form.Item label="Dragger">
          <Form.Item name="dragger" valuePropName="fileList" getValueFromEvent={normFile} noStyle>
            <Upload.Dragger name="files" action="/upload.do">
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">Click or drag file to this area to upload</p>
              <p className="ant-upload-hint">Support for a single or bulk upload.</p>
            </Upload.Dragger>
          </Form.Item>
        </Form.Item> */}

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

