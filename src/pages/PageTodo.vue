<template>
  <q-page class="q-pa-lg">
    <q-list 
    v-if="Object.keys(tasks).length"
    separator 
    bordered>
      <task 
      v-for="(task, key) in tasks"
      :key="key"
      :task="task"
      :id="key"></task>
    </q-list>
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

import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      showAddTask: false
    }
  },
  computed: {
    ...mapGetters('tasks', ['tasks'])
  },
  components: {
    'task': require('components/Tasks/Task.vue').default,
    'add-task': require('components/Tasks/Modals/AddTask.vue').default
  }
}

</script>

<style>

</style>