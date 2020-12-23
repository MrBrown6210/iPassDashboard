<template>
  <div>
    <div class="pb-1">
      <span style="color: rgba(46, 49, 54, 255)"> Today </span>
      Last updated : September 05, 2020, 02:28 GMT
    </div>
    <b-row class="py-2">
      <b-col>
        <div class="p-4 bg-white rounded shadow-sm">
          <div>New Cases</div>
          <div>4</div>
          <div><span style="color: green">70%</span> up from yesterday</div>
        </div>
      </b-col>
      <b-col>
        <div class="p-4 bg-white rounded shadow-sm">
          <div>New Death</div>
          <div>0</div>
          <div><span style="color: red">100%</span> down from yesterday</div>
        </div>
      </b-col>
    </b-row>
    <b-row class="py-2">
      <b-col>
        <div class="p-4 bg-white rounded shadow-sm">
          <div>New Cases</div>
          <div>4</div>
          <div><span style="color: green">70%</span> up from yesterday</div>
        </div>
      </b-col>
      <b-col>
        <div class="p-4 bg-white rounded shadow-sm">
          <div>New Death</div>
          <div>0</div>
          <div><span style="color: red">100%</span> down from yesterday</div>
        </div>
      </b-col>
      <b-col>
        <div class="p-4 bg-white rounded shadow-sm">
          <div>New Death</div>
          <div>0</div>
          <div><span style="color: red">100%</span> down from yesterday</div>
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
@Component({
  // layout: 'map',
})
export default class Example extends Vue {
  created() {
    this.$router.push('/explore')
  }
}
</script>
