<template>
  <div class="p-2">
    <h1>
      <b-badge pill variant="danger">{{ $route.params.id }} ติดเชื้อ</b-badge>
    </h1>
    <div class="border border-info rounded p-2 m-2">
      <div>การเดินทาง</div>
      <ul v-for="(journal, date) in journals" :key="journal._id">
        วันที่
        {{
          date
        }}
        <ol v-for="log in journal" :key="log._id">
          <div>
            <span>
              <b>{{ log.name }}</b>
            </span>
            เวลา
            {{
              new Date(log.leave_at * 1000 - log.stay)
                .toTimeString()
                .split('GMT')[0]
            }}
            -
            {{ new Date(log.leave_at * 1000).toTimeString().split('GMT')[0] }}
          </div>
        </ol>
      </ul>
    </div>
    <div class="border border-info rounded p-2 m-2">
      <div>สถานที่อันตราย</div>
      <ul>
        <div v-for="track in placeTracks" :key="track._id">
          <span>
            <b>{{ track.place.name }}</b>
          </span>
          <b-badge :variant="alertPlaceColor[track.alert] || 'info'">
            {{ alertPlaceText[track.alert] }}
          </b-badge>
        </div>
      </ul>
    </div>
    <div class="border border-info rounded p-2 m-2">
      <div>คนที่เสี่ยงติดเชื้อ</div>
      <ul>
        <div v-for="track in personTracks" :key="track._id">
          <b>{{ track.id }}</b>
          <b-badge :variant="alertPlaceColor[track.alert] || 'info'">
            {{ alertPersonText[track.alert] }}
          </b-badge>
        </div>
      </ul>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'

@Component({})
export default class Test extends Vue {
  journals = []
  placeTracks = []
  personTracks = []
  async mounted() {
    const journals = await this.$axios.$get(
      `/tracks/explore/${this.$route.params.id}`
    )
    const places = await this.$axios.$get(
      `/tracks/explore/place/${this.$route.params.id}`
    )
    const persons = await this.$axios.$get(
      `/tracks/explore/person/${this.$route.params.id}`
    )
    this.journals = journals
    this.placeTracks = places
    this.personTracks = persons
  }

  alertPlaceText = {
    4: 'อันตรายมาก',
    3: 'อันตราย',
    2: 'อันตรายน้อย',
    1: 'อันตรายน้อยมาก',
    0: 'ไม่อันตราย',
  }

  alertPersonText = {
    4: 'เสี่ยงมาก',
    3: 'เสี่ยง',
    2: 'เสี่ยงน้อย',
    1: 'เสี่ยงน้อยมาก',
    0: 'ไม่เสี่ยง',
  }

  alertPlaceColor = {
    4: 'danger',
    3: 'warning',
    2: 'info',
    1: 'success',
    0: 'success',
  }
}
</script>
