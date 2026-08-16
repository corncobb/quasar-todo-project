<template>
	<transition
	  appear
	  enter-active-class="animated zoomIn"
	  leave-active-class="animated zoomOut absolute-top"
	>
		<div>
			<list-header
				v-if="!settings.showTasksInOneList"
				bgColor="bg-orange-4"
				>Todo</list-header>

			<q-list 
				separator
				bordered>

				<task
					v-for="(task, key) in tasksTodo"
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
		props: ['tasksTodo'],
		computed: {
			...mapState(useSettingsStore, ['settings'])
		},
		components: {
			'task' : Task,
			'list-header' : ListHeader,
		}
	}
</script>