import Vue from 'vue'

const state = {
    tasks: {
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
        }
    }
}

const mutations = {
    updateTask(state, payload){
        console.log('payload (from mutation): ', payload);
        Object.assign(state.tasks[payload.id], payload.updates)
    },
    deleteTask(state, id){
        console.log('delete id: ', id);
        Vue.delete(state.tasks, id)
    }

}

const actions = {
    updateTask({ commit }, payload) {
        commit('updateTask', payload)
    },
    deleteTask({ commit }, id) {
        commit('deleteTask', id)
    }

}

const getters = {
    tasks: (state) => {
        return state.tasks
    }

}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}