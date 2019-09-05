<template>
<q-item
      @click="updateTask({ id: id, updates: { completed: !task.completed} })"
      :class="!task.completed ? 'bg-orange-1' : 'bg-green-1'"
      clickable
      v-touch-hold:1000.mouse="showEditTaskModal"
      v-ripple>
        <q-item-section side top>
          <q-checkbox :value="task.completed" class="no-pointer-events" />
        </q-item-section>

        <q-item-section>
          <q-item-label
          :class="{ 'text-strikethrough' : task.completed }"
          v-html="$options.filters.searchHighlight(task.name, search)"></q-item-label>
        </q-item-section>

        <q-item-section 
        side
        v-if="task.dueDate">
          <div class="row">
            <div class="column justify-center">
              <q-icon name="event" size="18px" class="q-mr-md"/>
            </div>
            <div class="column">
              <q-item-label class="row justify-end" caption>{{ task.dueDate | niceDate }}</q-item-label>
              <q-item-label class="row justify-end" caption><small>{{ task.dueTime }}</small></q-item-label>
            </div>
          </div>
        </q-item-section>
        <q-item-section side>
          <div class="row">
            <q-btn
              @click.stop="showEditTaskModal"
              flat
              round 
              dense 
              color="primary" 
              icon="edit" />
            <q-btn
              @click.stop="showDeletePopup = true"
              flat
              round 
              dense 
              color="red" 
              icon="delete" />
          </div>
        </q-item-section>

        <q-dialog v-model="showEditTask">
            <edit-task
              @close="showEditTask = false"
              :task="task"
              :id="id"/>
        </q-dialog>

        <q-dialog persistent v-model="showDeletePopup">
            <q-card style="width: 300px">
              <q-card-section class="row">
                 <div class="text-h4">Confirm</div>
              </q-card-section>

              <q-card-section class="row">
                 <div class="text-body1">Do you really want to delete this task?</div>
              </q-card-section>

              <q-card-actions align="right">
                <q-btn label="Cancel" color="red" v-close-popup />
                <q-btn label="OK" @click="deleteThisTask(id)" color="primary" v-close-popup />
              </q-card-actions>
            </q-card>
        </q-dialog>

      </q-item>
    
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { date } from 'quasar'
// destructuring to keep only what is needed
const { addToDate } = date

export default {
    props: ['task', 'id'],
    data() {
      return{
        showEditTask: false,
        showDeletePopup: false
      }
    },
    computed: {
      ...mapState('tasks', ['search'])
    },
    filters: {
      niceDate(value) {
        return date.formatDate(value, 'MMM D')
      },
      searchHighlight(value, search) {
        if (search) {
          let searchRegExp = new RegExp(search, 'ig')
          return value.replace(searchRegExp, (match) => {
            return '<span class="bg-yellow-6">' + match + '</span>'
          })
        }
       return value
      }
    },
    methods: {
        ...mapActions('tasks', ['updateTask', 'deleteTask']),
        deleteThisTask(id){
          this.deleteTask(id);
        },
        showEditTaskModal() {
          this.showEditTask = true
        }
    },
    components: {
      'edit-task': require('components/Tasks/Modals/EditTask.vue').default
    }
}

</script>

<style scoped>

</style>