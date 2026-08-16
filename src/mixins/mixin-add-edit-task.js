import ModalHeader from 'components/Shared/ModalHeader.vue'
import ModalTaskName from 'components/Shared/ModalTaskName.vue'
import ModalDueDate from 'components/Shared/ModalDueDate.vue'
import ModalDueTime from 'components/Shared/ModalDueTime.vue'
import ModalButtons from 'components/Shared/ModalButtons.vue'

export default {
    methods: {
        submitForm() {
            if (!this.taskToSubmit.name) {
                return
            }
            this.submitTask()
        },
        clearDueDate() {
            this.taskToSubmit.dueDate = ''
            this.taskToSubmit.dueTime = ''
        }
    },
    components: {
        'modal-header': ModalHeader,
        'modal-task-name': ModalTaskName,
        'modal-due-date': ModalDueDate,
        'modal-due-time': ModalDueTime,
        'modal-buttons': ModalButtons
    }
}
