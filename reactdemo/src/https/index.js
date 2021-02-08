import axios from 'axios';

let api_map = {
    getStudentsList:'http://localhost:3001/getList',
    addStudentsList:'http://localhost:3001/addStudentsUpload'
}

let ApiGetFun = (api) => {
    return axios.get(api)
}

export {api_map,ApiGetFun};
