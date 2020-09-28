<template>
  <div class="p-2">
    <b-badge @click="go">test</b-badge>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
@Component
export default class Explore extends Vue {
  go() {
    console.log('go')
  }
}
</script>
