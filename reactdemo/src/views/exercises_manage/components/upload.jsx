import { useContext,useState } from "react";
import { Upload, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
// import reqwest from 'reqwest';
import {FormContext} from './form';

const Demo = () => {
  const [fileList,setFileList] = useState([]);
  const [uploading,setLoading] = useState(false);
  //上下文中的方法
  const { updateFiles } = useContext(FormContext);
  const handleUpload = () => {

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    },1000)
    updateFiles(fileList);
  };
  const props = {
    onRemove: file => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: file => {
      setFileList(fileList => {
        return [...fileList,file];
      });
      return false;
    },
  };
  return (
    <>
      <Upload {...props} multiple={true}>
        <Button icon={<UploadOutlined />}>Select File</Button>
      </Upload>
      <Button
        type="primary"
        onClick={handleUpload}
        disabled={fileList.length === 0}
        loading={uploading}
        style={{ marginTop: 16 }}
      >
        {uploading ? 'Uploading' : 'Start Upload'}
      </Button>
    </>
  );
}

export default Demo;