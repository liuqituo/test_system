import { Upload, message, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import {api_map} from '../../../https';
export default () => {
    const props = {
        name: 'file',
        action: api_map.addStudentsList,
        onChange(info) {
            console.log(info)
            if(info.file&& info.file.status === 'done'){
              window.location.reload();
            }
        //   if (info.file.status !== 'uploading') {
        //     console.log(info.file, info.fileList);
        //   }
        //   if (info.file.status === 'done') {
        //     message.success(`${info.file.name} file uploaded successfully`);
        //   } else if (info.file.status === 'error') {
        //     message.error(`${info.file.name} file upload failed.`);
        //   }
        },
      };
      return (
          <>
            <Upload {...props}>
              <Button icon={<UploadOutlined />}>批量上传</Button>
            </Upload>
          </>
      )
}
