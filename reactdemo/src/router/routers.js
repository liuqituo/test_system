
import Exercise from '../views/exercises_manage/index';
import Page from '../views/page/index';
import Students from '../views/students_manage/index';
let router_map = {
    initUrl:'/my_students',
    routes:[
        {
            path:'/my_students',
            path_name:'我的学生',
            component:Students,
        },
        {
            path:'/paper',
            path_name:'试卷',
            component:Page,
        },
        {
            path:'/my_exercises',
            path_name:'试题库',
            component:Exercise,
        }
    ]
}

export default router_map;