<template>
    <q-select
        filled 
        v-model="sortBy" 
        :options="options" 
        label="Sort by" 
        emit-value
        map-options
        stack-label 
        class="col q-ml-sm"
        />
</template>

<script>

import { mapState, mapActions } from 'pinia'
import { useTasksStore } from 'stores/tasks-store'

export default {
    data () {
        return {
        options: [
            {
            label: 'Name',
            value: 'name'
            },
            {
            label: 'Date',
            value: 'dueDate'
            }
            ],
        }
    },
  computed: {
      ...mapState(useTasksStore, ['sort']),
      sortBy: {
          get() {
              return this.sort
          },
          set(value) {
            this.setSort(value)
          }
      }
  },
  methods: {
      ...mapActions(useTasksStore, ['setSort'])
  }
}

</script>

<style scoped>
    .q-select {
        flex: 0 0 112px;
    }
</style>