import { defineStore } from 'pinia'
import { firebaseAuth } from 'boot/firebase'
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from 'firebase/auth'
import { LocalStorage, Loading } from 'quasar'
import { showErrorMessage } from 'src/functions/function-show-error-message'
import { useTasksStore } from './tasks-store'

export const useAuthStore = defineStore('auth', {
    state: () => ({
        loggedIn: false
    }),

    actions: {
        registerUser(payload) {
            Loading.show()
            createUserWithEmailAndPassword(firebaseAuth, payload.email, payload.password)
            .then(response => {
                console.log('Response: ', response)
            })
            .catch(error => {
                showErrorMessage(error.message)
            })
        },
        loginUser(payload) {
            Loading.show()
            signInWithEmailAndPassword(firebaseAuth, payload.email, payload.password)
            .then(response => {
                console.log('Response: ', response)
            })
            .catch(error => {
                showErrorMessage(error.message)
            })
        },
        logoutUser() {
            signOut(firebaseAuth)
        },
        handleAuthStateChange() {
            onAuthStateChanged(firebaseAuth, (user) => {
                Loading.hide()
                const tasksStore = useTasksStore()

                if (user) {
                    this.loggedIn = true
                    LocalStorage.set('loggedIn', true)
                    this.router.push('/')
                    tasksStore.fbReadData()

                } else {
                    tasksStore.clearTasks()
                    tasksStore.setTasksDownloaded(false)
                    this.loggedIn = false
                    LocalStorage.set('loggedIn', false)
                    this.router.replace('/auth')
                }
            })
        }
    }
})
