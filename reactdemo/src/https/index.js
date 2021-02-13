import axios from 'axios';

let api_map = {
    getStudentsList:'http://localhost:3001/getList',
    addStudentsList:'http://localhost:3001/addStudentsUpload',
    deleteStudent:'http://localhost:3001/deleteStudent',
    uploadExercise:'http://localhost:3001/uploadExercise',
    getExerciseList:'http://localhost:3001/getExerciseList',
    deleteExercise:'http://localhost:3001/deleteExercise',
    deleteAllExercise:'http://localhost:3001/deleteAllExercise',
}

let ApiGetFun = (api,params = {}) => {
    return axios.get(api,{
        params: params
    })
}
let ApiPostFun = (api,formData) => {
    let config = {
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    }
    return axios.post(api,formData,config)
}

export {api_map,ApiGetFun,ApiPostFun};
