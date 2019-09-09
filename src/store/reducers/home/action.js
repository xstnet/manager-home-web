/**
 * Created by PhpStorm.
 * Author: Xu shantong <shantongxu@qq.com>
 * Date: 2019/9/8
 * Time: 下午11:19
 */

import * as Actions from '../Actions'

export const addTodo = (id, name) => ({
    type: Actions.addTodo,
    id,
    name
});

export const toggleTodo = id => ({
    type: Actions.toggleTodo,
    id
});

export const setTodos = todolist => ({
    type: Actions.setTodos,
    todolist
});

export const deleteTodo = id => ({
    type: Actions.deleteTodo,
    id
});