<template>
  <div class="p-5">
    <b-table striped hover :items="items" :fields="fields">
      <template v-slot:cell(show_details)="row">
        <b-button
          v-if="row.item._id !== row.item.name"
          size="sm"
          class="mr-2"
          @click="go(row.item)"
        >
          View
        </b-button>
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
    // {
    //   key: 'found_count',
    //   label: 'จำนวนที่ไปสัมผัสผู้คน',
    //   sortable: true,
    // },
    {
      key: 'found_count_people',
      label: 'จำนวนที่ไปสัมผัสผู้คน',
      sortable: true,
    },
    {
      key: 'found_count_places',
      label: 'จำนวนที่ไปสัมผัสสิ่งก่อสร้าง',
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
    if (item._id === item.name) {
      console.log('User not found')
      return
    }
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
