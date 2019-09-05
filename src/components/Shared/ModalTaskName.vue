<template>
    <div class="row q-mb-sm">
        <q-input
            counter 
            maxlength="25"
            clearable 
            outlined
            v-select-all
            autofocus
            @input="$emit('update:name', $event)"
            :rules="[val => !!val || 'Field is required']"
            ref="name"
            :value="name"
            label="Task name" 
            class="col"/>
    </div>
</template>

<script>
import { selectAll } from 'src/directives/directive-select-all'

export default {
    props: ['name'],
    directives: {
        selectAll
    }
}
</script>