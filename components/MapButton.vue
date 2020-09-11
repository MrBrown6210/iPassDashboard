<template>
  <div class="main">
    <b-button variant="light" class="gm-control-active">Thailand</b-button>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
@Component
export default class MapButton extends Vue {
  x() {}
}
</script>

<style lang="scss" scoped>
.main {
  margin: 10px;
}
</style>
