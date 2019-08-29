<template>
    <div 

        class="row q-mb-sm">
        <q-input 
            outlined
            label="Due time"
            :value="dueTime"
            @input="$emit('update:dueTime', $event)"
            class="col">
            <template v-slot:append>
                <q-icon
                clickable
                v-if="dueTime"
                @click="$emit('update:dueTime', '')"
                name="cancel"
                class='curson-pointer'/>
                <q-icon name="access_time" class="cursor-pointer">
                    <q-popup-proxy transition-show="scale" transition-hide="scale">
                        <q-time :value="dueTime"
                        @input="$emit('update:dueTime', $event)" />
                    </q-popup-proxy>
                </q-icon>
            </template>
        </q-input>
    </div>
</template>

<script>
export default {
    props: ['dueTime']
}
</script>