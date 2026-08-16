<template>
  <q-page>

  	<div class="q-pa-md absolute full-width full-height column">

  		<template v-if="tasksDownloaded">
  			<div class="row q-mb-lg">
  				<search />
  				<sort />
  			</div>

  			<p v-if="search && !Object.keys(tasksTodo).length && !Object.keys(tasksCompleted).length">No search results.</p>

  			<q-scroll-area class="q-scroll-area-tasks">
  				<no-tasks
  					v-if="!Object.keys(tasksTodo).length && !search && !settings.showTasksInOneList"
  					@add-task="showAddTask = true"></no-tasks>

  				<tasks-todo
  					v-if="Object.keys(tasksTodo).length"
  					:tasksTodo="tasksTodo" />

  				<tasks-completed 
  					v-if="Object.keys(tasksCompleted).length"
  					:tasksCompleted="tasksCompleted"
  					class="q-mb-xl" />
  			</q-scroll-area>

  			<div class="absolute-bottom text-center q-mb-lg no-pointer-events">
  				<q-btn
  					@click="showAddTask = true"
  				  round
  				  class="all-pointer-events"
  				  color="primary"
  				  size="24px"
  				  icon="add"
  				/>
  			</div>	
  		</template>

  		<template v-else>
  			<span class="absolute-center">
	  			<q-spinner
		        color="primary"
		        size="3em"
		      />
  			</span>
  		</template>

  	</div>
		
		<q-dialog v-model="showAddTask">
		  <add-task @close="showAddTask = false" />
		</q-dialog>
  </q-page>
</template>

<script>
	import { mapState } from 'pinia'
	import AddTask from 'components/Tasks/Modals/AddTask.vue'
	import TasksTodo from 'components/Tasks/TasksTodo.vue'
	import TasksCompleted from 'components/Tasks/TasksCompleted.vue'
	import NoTasks from 'components/Tasks/NoTasks.vue'
	import Search from 'components/Tasks/Tools/Search.vue'
	import Sort from 'components/Tasks/Tools/Sort.vue'
	import { useTasksStore } from 'stores/tasks-store'
	import { useSettingsStore } from 'stores/settings-store'

	export default {
		data() {
			return {
				showAddTask: false
			}
		},
		computed: {
			...mapState(useTasksStore, ['tasksTodo', 'tasksCompleted', 'search', 'tasksDownloaded']),
			...mapState(useSettingsStore, ['settings'])
		},
		components: {
			'add-task' : AddTask,
			'tasks-todo' : TasksTodo,
			'tasks-completed' : TasksCompleted,
			'no-tasks' : NoTasks,
			'search' : Search,
			'sort' : Sort
		}
	}
</script>

<style lang="scss">
	.q-scroll-area-tasks {
		display: flex;
		flex-grow: 1;
		.mobile & {
			flex-basis: 100px;
		}
	}
	.electron {
		.q-scroll-area-tasks {
			.scroll {
				height: auto !important;
			}
		}
	}
</style>
