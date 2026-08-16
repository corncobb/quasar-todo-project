<template>
      <q-card>
        <modal-header>Edit Task</modal-header>

        <q-form @submit="submitForm">

        <q-card-section>

            <modal-task-name
                v-model:name="taskToSubmit.name"/>

            <modal-due-date
                v-model:dueDate="taskToSubmit.dueDate"
                @clear="clearDueDate"/>

            <modal-due-time
                v-if="taskToSubmit.dueDate"
                v-model:dueTime="taskToSubmit.dueTime"/>

        </q-card-section>
        
        <modal-buttons/>

        </q-form>

      </q-card>
</template>

<script>
    import { mapActions } from 'pinia'
    import mixinAddEditTask from 'src/mixins/mixin-add-edit-task'
    import { useTasksStore } from 'stores/tasks-store'

export default {
    props: ['task', 'id'],
    mixins: [mixinAddEditTask],
    data() {
        return {
            taskToSubmit: {}
        }
    },
    methods: {
        ...mapActions(useTasksStore, ['updateTask']),
       
        submitTask() {
            this.updateTask({
                id: this.id,
                updates: this.taskToSubmit
            })
            this.$emit('close')
        },
      
    },
    mounted() {
        this.taskToSubmit = Object.assign({},  this.task)
    }
}
</script>