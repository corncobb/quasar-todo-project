<template>
    <transition
        appear
        enter-active-class="animated zoomIn"
        leave-active-class="animated zoomOut"
    >
        <div 
            :class="{ 'q-mt-lg' : !settings.showTasksInOneList }">
            <list-header
                v-if="!settings.showTasksInOneList"
                bgColor="bg-green-4">Completed</list-header>
            
            <q-list 
            v-if="Object.keys(tasksCompleted).length"
            separator 
            bordered>
            <task 
            v-for="(task, key) in tasksCompleted"
            :key="key"
            :task="task"
            :id="key"></task>
            </q-list>
        </div>
    </transition>
</template>

<script>
import { mapState } from 'pinia'
import Task from 'components/Tasks/Task.vue'
import ListHeader from 'components/Shared/ListHeader.vue'
import { useSettingsStore } from 'stores/settings-store'

export default {
    props: ['tasksCompleted'],
    computed: {
        ...mapState(useSettingsStore, ['settings'])
    },
    components: {
        'task': Task,
        'list-header': ListHeader,
    }
}
</script>