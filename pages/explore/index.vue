<template>
  <div class="p-5">
    <b-table striped hover :items="items" :fields="fields">
      <template v-slot:cell(show_details)="row">
        <b-button size="sm" class="mr-2" @click="go(row.item)"> View </b-button>
      </template>
    </b-table>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
@Component
export default class Explore extends Vue {
  fields = [
    {
      key: 'name',
      label: 'ชื่อ',
      sortable: false,
    },
    {
      key: '_id',
      label: 'ID',
      sortable: true,
    },
    {
      key: 'found_count',
      label: 'จำนวนที่ไปสัมผัสผู้คน',
      sortable: true,
    },
    {
      key: 'alert',
      label: 'ความเสี่ยง',
      sortable: true,
    },
    {
      key: 'show_details',
      label: 'Actions',
    },
  ]

  items = []

  go(item: any) {
    this.$router.push(`/explore/${item._id}`)
    console.log(item)
  }

  async mounted() {
    const x = await this.$axios.$get('/tracks/explore')
    this.items = x
    console.log(x)
  }
}
</script>
