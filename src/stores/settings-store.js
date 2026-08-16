import { defineStore } from 'pinia'
import { LocalStorage } from 'quasar'

export const useSettingsStore = defineStore('settings', {
    state: () => ({
        settings: {
            show12HourTimeFormat: true,
            showTasksInOneList: true
        }
    }),
    actions: {
        setShow12HourTimeFormat(value) {
            this.settings.show12HourTimeFormat = value
            this.saveSettings()
        },
        setShowTasksInOneList(value) {
            this.settings.showTasksInOneList = value
            this.saveSettings()
        },
        saveSettings() {
            LocalStorage.set('settings', this.settings)
        },
        getSettings() {
            let settings = LocalStorage.getItem('settings')
            if (settings) {
                Object.assign(this.settings, settings)
            }
        }
    }
})
