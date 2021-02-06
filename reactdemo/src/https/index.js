import axios from 'axios';

let api_map = {
    getStudentsList:'http://localhost:3001/list',
}

let ApiFun = (api) => {
    return axios.get(api)
}

export {api_map,ApiFun};
