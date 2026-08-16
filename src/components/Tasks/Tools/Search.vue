<template>
    <q-input 
        outlined
        v-model="searchField" 
        label="Search"
        v-select-all
        @keyup.esc="searchField = ''"
        class="col" >

    <template v-slot:append>
        <q-icon 
            v-if="searchField !== ''" 
            name="close"
            @click="searchField = ''"
            class="cursor-pointer" />
        <q-icon name="search" />
    </template>

    </q-input>
</template>

<script>
import { mapState, mapActions } from 'pinia'
import { selectAll } from 'src/directives/directive-select-all'
import { useTasksStore } from 'stores/tasks-store'

export default {
    computed: {
        ...mapState(useTasksStore, ['search']),
        searchField: {
            get() {
                return this.search
            },
            set(value) {
                this.setSearch(value)
            }
        }
    },
    methods: {
        ...mapActions(useTasksStore, ['setSearch'])
    },
    directives: {
        selectAll
    }
}
</script>