<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
import { mapActions } from 'pinia'
import { useSettingsStore } from 'stores/settings-store'
import { useAuthStore } from 'stores/auth-store'

export default {
  methods: {
    ...mapActions(useSettingsStore, ['getSettings']),
    ...mapActions(useAuthStore, ['handleAuthStateChange'])
  },
  mounted() {
    this.getSettings()
    this.handleAuthStateChange()
  }
}
</script>

<style>
  .text-strikethrough {
    text-decoration: line-through;
  }
</style>
