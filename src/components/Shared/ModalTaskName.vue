<template>
    <div class="row q-mb-sm">
                <q-input
                counter 
                maxlength="25"
                clearable 
                outlined
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
export default {
    props: ['name']
}
</script>