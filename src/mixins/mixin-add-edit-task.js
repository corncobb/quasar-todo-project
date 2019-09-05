export default {
    methods: {
        submitForm() {
            console.log('submitForm');
            this.$refs.modalTaskName.$refs.name.validate()
            if (!this.$refs.modalTaskName.$refs.name.hasError) {
                this.submitTask()
            }
        },
        clearDueDate() {
            this.taskToSubmit.dueDate = ''
            this.taskToSubmit.dueTime = ''
        }
    },
    components: {
        'modal-header': require('components/Shared/ModalHeader.vue').default,
        'modal-task-name': require('components/Shared/ModalTaskName.vue').default,
        'modal-due-date': require('components/Shared/ModalDueDate.vue').default,
        'modal-due-time': require('components/Shared/ModalDueTime.vue').default,
        'modal-buttons': require('components/Shared/ModalButtons.vue').default
    }
}