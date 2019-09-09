/**
 * Created by PhpStorm.
 * Author: Xu shantong <shantongxu@qq.com>
 * Date: 2019/9/8
 * Time: 下午11:19
 */
// import { addTodo } from '@/api/Api.js'
import * as Actions from '../Actions'

const Home = (state = {todoList:[]}, action) => {
    switch (action.type) {
        case Actions.addTodo:
            return {
                ...state,
                todoList: [
                    {
                        id: action.id,
                        name: action.name,
                        status: false
                    },
                    ...state.todoList
                ]
            }
        case Actions.toggleTodo:
            return {
                ...state,
                todoList: state.todoList.map(
                    todo => (todo.id === action.id) ? {...todo, status: todo.status == false ? true : false} : todo
                )
            }
        case Actions.deleteTodo:
            return state;
        case Actions.setTodos:
            return {
                ...state,
                todoList: action.todolist
            };
        default:
            return state;
    }
}

export default Home;