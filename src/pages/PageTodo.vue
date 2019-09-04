<template>
  <q-page class="q-pa-lg">

    <div class="row q-mb-lg">
      <search></search>
      <sort />
    </div>

    <p v-if="search && !Object.keys(tasksTodo).length && !Object.keys(tasksCompleted).length">No search results.</p>

    <no-tasks
      v-if="!Object.keys(tasksTodo).length && !search">
    </no-tasks>

    <tasks-todo
      v-if="Object.keys(tasksTodo).length"
      :tasksTodo="tasksTodo" />

    <tasks-completed
      :tasksCompleted="tasksCompleted"
      v-if="Object.keys(tasksCompleted).length" />

    <div class="absolute-bottom text-center q-pb-lg">
     <q-btn
     @click="showAddTask = true"
      size="24px"
      round
      color="primary"
      icon="add"
    />
    </div>
         <q-dialog v-model="showAddTask">
            <add-task @close="showAddTask = false"/>
        </q-dialog>
  </q-page>
</template>


<script>

import { mapGetters, mapState} from 'vuex'

export default {
  data() {
    return {
      showAddTask: false
    }
  },
  computed: {
    ...mapGetters('tasks', ['tasksTodo', 'tasksCompleted']),
    ...mapState('tasks', ['search'])
  },
  mounted() {
    this.$root.$on('showAddTask', () => {
      this.showAddTask = true
    })
  },
  components: {
    
    'add-task': require('components/Tasks/Modals/AddTask.vue').default,
    'tasks-todo': require('components/Tasks/TasksTodo.vue').default,
    'tasks-completed': require('components/Tasks/TasksCompleted.vue').default,
    'no-tasks': require('components/Tasks/NoTasks.vue').default,
    'search': require('components/Tasks/Tools/Search.vue').default,
    'sort': require('components/Tasks/Tools/Sort.vue').default
  }
}

</script>

<style>

</style>