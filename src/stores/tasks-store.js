import { defineStore } from 'pinia'
import { uid, Notify } from 'quasar'
import { firebaseDb, firebaseAuth } from 'boot/firebase'
import { ref, get, onChildAdded, onChildChanged, onChildRemoved, set, update, remove } from 'firebase/database'
import { showErrorMessage } from 'src/functions/function-show-error-message'

export const useTasksStore = defineStore('tasks', {
    state: () => ({
        tasks: {},
        search: '',
        sort: 'name',
        tasksDownloaded: false
    }),

    getters: {
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
        tasksFiltered() {
            let tasksSorted = this.tasksSorted,
                    tasksFiltered = {}
            if (this.search) {
                Object.keys(tasksSorted).forEach((key) => {
                    let task = tasksSorted[key],
                            taskNameLowerCase = task.name.toLowerCase(),
                            searchLowerCase = this.search.toLowerCase()
                    if (taskNameLowerCase.includes(searchLowerCase)) {
                        tasksFiltered[key] = task
                    }
                })
                return tasksFiltered
            }
            return tasksSorted
        },
        tasksTodo() {
            let tasksFiltered = this.tasksFiltered
            let tasks = {}
            Object.keys(tasksFiltered).forEach((key) => {
                let task = tasksFiltered[key]
                if (!task.completed) {
                    tasks[key] = task
                }
            })
            return tasks
        },
        tasksCompleted() {
            let tasksFiltered = this.tasksFiltered
            let tasks = {}
            Object.keys(tasksFiltered).forEach((key) => {
                let task = tasksFiltered[key]
                if (task.completed) {
                    tasks[key] = task
                }
            })
            return tasks
        }
    },

    actions: {
        updateTask(payload) {
            this.fbUpdateTask(payload)
        },
        deleteTask(id) {
            this.fbDeleteTask(id)
        },
        addTask(task) {
            let taskId = uid()
            let payload = {
                id: taskId,
                task: task
            }
            this.fbAddTask(payload)
        },
        setSearch(value) {
            this.search = value
        },
        setSort(value) {
            this.sort = value
        },
        clearTasks() {
            this.tasks = {}
        },
        setTasksDownloaded(value) {
            this.tasksDownloaded = value
        },

        // Applies a change reported by the Firebase Realtime Database listeners
        // in fbReadData() to local state. Kept separate from updateTask/addTask/
        // deleteTask above, which are the UI-facing actions that write *to* Firebase.
        applyTaskAdded(payload) {
            this.tasks[payload.id] = payload.task
        },
        applyTaskUpdated(payload) {
            Object.assign(this.tasks[payload.id], payload.updates)
        },
        applyTaskRemoved(id) {
            delete this.tasks[id]
        },

        fbReadData() {
            let userId = firebaseAuth.currentUser.uid
            let userTasksRef = ref(firebaseDb, 'tasks/' + userId)

            // initial check for data
            get(userTasksRef).then(() => {
                this.setTasksDownloaded(true)
            }).catch(error => {
                showErrorMessage(error.message)
                this.router.replace('/auth')
            })

            // child added
            onChildAdded(userTasksRef, snapshot => {
                this.applyTaskAdded({
                    id: snapshot.key,
                    task: snapshot.val()
                })
            })

            // child changed
            onChildChanged(userTasksRef, snapshot => {
                this.applyTaskUpdated({
                    id: snapshot.key,
                    updates: snapshot.val()
                })
            })

            // child removed
            onChildRemoved(userTasksRef, snapshot => {
                this.applyTaskRemoved(snapshot.key)
            })
        },
        fbAddTask(payload) {
            let userId = firebaseAuth.currentUser.uid
            let taskRef = ref(firebaseDb, 'tasks/' + userId + '/' + payload.id)
            set(taskRef, payload.task).then(() => {
                Notify.create('Task added!')
            }).catch(error => {
                showErrorMessage(error.message)
            })
        },
        fbUpdateTask(payload) {
            let userId = firebaseAuth.currentUser.uid
            let taskRef = ref(firebaseDb, 'tasks/' + userId + '/' + payload.id)
            update(taskRef, payload.updates).then(() => {
                let keys = Object.keys(payload.updates)
                if (!(keys.includes('completed') && keys.length == 1)) {
                    Notify.create('Task updated!')
                }
            }).catch(error => {
                showErrorMessage(error.message)
            })
        },
        fbDeleteTask(taskId) {
            let userId = firebaseAuth.currentUser.uid
            let taskRef = ref(firebaseDb, 'tasks/' + userId + '/' + taskId)
            remove(taskRef).then(() => {
                Notify.create('Task deleted!')
            }).catch(error => {
                showErrorMessage(error.message)
            })
        }
    }
})
