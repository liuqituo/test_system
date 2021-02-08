import {
    Form,
    Select,
    Button,
    Rate,
    Input,
  } from 'antd';
  import { UploadOutlined, InboxOutlined } from '@ant-design/icons';
  import Upload from './upload';
  
  const { Option } = Select;
  
  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
  };
  
  const normFile = (e) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };
  
  const Demo = () => {
    const onFinish = (values) => {
      console.log('Received values of form: ', values);
    };
  
    return (
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
        label="Title"
        name="title"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input />
      </Form.Item>
        <Form.Item
          name="select"
          label="Select"
          hasFeedback
          rules={[{ required: true, message: 'Please select your country!' }]}
        >
          <Select placeholder="Please select a country">
            <Option value="china">China</Option>
            <Option value="usa">U.S.A</Option>
          </Select>
        </Form.Item>
  
        <Form.Item name="rate" label="Rate">
          <Rate />
        </Form.Item>
        <Form.Item
        label="Descript"
        name="descript"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input />
      </Form.Item>
        <Form.Item
          name="upload"
          label="Upload"
          valuePropName="fileList"
          getValueFromEvent={normFile}
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
    );
  };


  export default Demo;