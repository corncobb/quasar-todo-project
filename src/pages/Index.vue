<template>
  <q-page class="q-pa-lg">
    <ul>
      <task 
      v-for="(task, index) in tasks"
      :key="task.id"
      :task="task"
      :index="index"> {{task.name}} </task>
    </ul>
  </q-page>
</template>


<script>

export default {
  data() {
    return {
      tasks: [
        {
          id: 0,
          name: "Go to bed",
          dueDate: "2019/05/12",
          dueTime: "18:30"
        },
        {
          id: 1,
          name: "Go to bed",
          dueDate: "2019/05/12",
          dueTime: "18:30"
        },
        {
          id: 2,
          name: "Go to bed",
          dueDate: "2019/05/12",
          dueTime: "18:30"
        },
        {
          id: 3,
          name: "Go to bed",
          dueDate: "2019/05/12",
          dueTime: "18:30"
        }
      ]
    }
  },
  methods: {
    deleteTask(index) {
      this.tasks.splice(index, 1)
    }
  },
  components: {
    'task' : require('components/Task.vue').default
  }
}

</script>

<style>
.border-black{
  border: 1px solid black;
}
</style>