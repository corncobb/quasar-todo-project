<template>
  <q-page class="q-pa-lg">
    <input v-model="message"
    @keyup.esc="clearMessage"
    @keyup.enter="alertMessage"/>
    <button @click="clearMessage">clear</button>
    <h5 class="border-black" v-show="message.length">{{ message }} </h5>
  </q-page>
</template>


<script>
export default {
  data(){
    return{
      message: "I love vue.js"
    }
  },
  methods: {
    clearMessage() {
      this.message = ''
    },
    alertMessage(){
      alert(this.message)
    }
  }
}
</script>

<style>
.border-black{
  border: 1px solid black;
}
</style>