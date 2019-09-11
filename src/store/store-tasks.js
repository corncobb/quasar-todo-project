import Vue from 'vue'
import { uid } from 'quasar'
import { firebaseDb, firebaseAuth } from 'boot/firebase'

const state = {
    tasks: {
        /*
       'ID1': {
            name: "Go to shop",
            completed: false,
            dueDate: "2019/05/12",
            dueTime: "18:30"
        },
        'ID2': {
            name: "Go to starbuck",
            completed: false,
            dueDate: "2019/06/05",
            dueTime: "16:12"
        },
        'ID3': {
            name: "Text GF",
            completed: false,
            dueDate: "2019/05/14",
            dueTime: "1:30"
        }*/
    },
    search: '',
    sort: 'name',
    tasksDownloaded: false
}

const mutations = {
    updateTask(state, payload) {
        console.log('payload (from mutation): ', payload);
        Object.assign(state.tasks[payload.id], payload.updates)
    },
    deleteTask(state, id) {
        console.log('delete id: ', id);
        Vue.delete(state.tasks, id)
    },
    addTask(state, payload) {
        Vue.set(state.tasks, payload.id, payload.task)
    },
    setSearch(state, value) {
        state.search = value
    },
    setSort(state, value) {
        state.sort = value
    },
    setTasksDownloaded(state, value) {
        state.tasksDownloaded = value
    }
}

const actions = {
    updateTask({ dispatch }, payload) {
        dispatch('fbUpdateTask', payload)
    },
    deleteTask({ dispatch }, id) {
        dispatch('fbDeleteTask', id)
    },
    addTask({ dispatch }, task) {
        let taskId = uid()
        let payload = {
            id: taskId,
            task: task
        }
        dispatch('fbAddTask', payload)
    },
    setSearch({ commit }, value){
        commit('setSearch', value)
    },
    setSort({ commit }, value){
        commit('setSort', value)
    },
    fbReadData({ commit }) {
        let userId = firebaseAuth.currentUser.uid
        let userTasks = firebaseDb.ref('tasks/' + userId)
        //child added
        userTasks.on('child_added', snapshot => {
            let task = snapshot.val()
            let payload = {
                id: snapshot.key,
                task: task
            }
            commit('addTask', payload)
        })
        //child changed
        userTasks.on('child_changed', snapshot => {
            let task = snapshot.val()
            let payload = {
                id: snapshot.key,
                updated: task
            }
            commit('updateTask', payload)
        })
        //child removed
        userTasks.on('child_removed', snapshot => {
            let taskId = snapshot.key
            commit('deleteTask', taskId)
        })
    },
    fbAddTask({}, payload) {
        let userId = firebaseAuth.currentUser.uid
        let taskRef = firebaseDb.ref('tasks/' + userId + '/' + payload.id)
        taskRef.set(payload.task)
    },
    fbUpdateTask({}, payload) {
        let userId = firebaseAuth.currentUser.uid
        let taskRef = firebaseDb.ref('tasks/' + userId + '/' + payload.id)
        taskRef.update(payload.updates)
    },
    fbDeleteTask({}, taskId) {
        let userId = firebaseAuth.currentUser.uid
        let taskRef = firebaseDb.ref('tasks/' + userId + '/' + taskId)
        taskRef.remove()
    }

}

const getters = {
    tasksSorted: (state) => {
        let tasksSorted = {},
            keysOrdered = Object.keys(state.tasks)

        keysOrdered.sort((a,b) => {
            let taskAProp = state.tasks[a][state.sort].toLowerCase(),
                taskBProp = state.tasks[b][state.sort].toLowerCase()

            if (taskAProp > taskBProp) return 1
            else if (taskAProp < taskBProp) return -1
            else return 0
        })
        keysOrdered.forEach((key) => {
            tasksSorted[key] = state.tasks[key]
        })

        return tasksSorted
    },
    tasksFiltered: (state, getters) => {
        let tasksSorted = getters.tasksSorted,
            tasksFiltered = {}
     
        if (state.search) {
            Object.keys(tasksSorted).forEach(function(key) {
                let task = tasksSorted[key],
                    taskNameLowerCase = task.name.toLowerCase(),
                    searchLowerCase = state.search.toLowerCase()
                if (taskNameLowerCase.includes(searchLowerCase)){
                    tasksFiltered[key] = task
                }
            })
            // populate empty object
            return tasksFiltered
        }
        return tasksSorted
    },
    tasksTodo: (state, getters) => {
        let tasksFiltered = getters.tasksFiltered
        let tasks = {}
        Object.keys(tasksFiltered).forEach(function(key) {
           let task = tasksFiltered[key] 
           if (!task.completed) {
                tasks[key] = task
           }
        })
        return tasks
    },
    tasksCompleted: (state, getters) => {
        let tasksFiltered = getters.tasksFiltered
        let tasks = {}
        Object.keys(tasksFiltered).forEach(function(key) {
           let task = tasksFiltered[key] 
           if (task.completed) {
                tasks[key] = task
           }
        })
        return tasks
    },

}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}