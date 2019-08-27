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

}

const actions = {

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