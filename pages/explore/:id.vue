<template>
  <div class="p-2">
    <nuxt-link to="/explore">Back</nuxt-link>
    <h1>
      <b-badge pill variant="danger">
        <span v-if="own">{{ own.name }}</span>
        {{ $route.params.id }} ติดเชื้อ</b-badge
      >
    </h1>
    <div :key="update" class="border border-info rounded p-2 m-2">
      <div>การเดินทาง</div>
      <ul>
        <li v-for="(journal, index) in journals" :key="journal.date">
          <b style="cursor: pointer" @click="toggleDate(index)">
            วันที่ {{ journal.date }} ({{ journal.children.length }} records)
            [{{ journal.expanded ? '-' : '+' }}]
          </b>
          <div v-if="journal.expanded">
            <ol
              v-for="(child, indexChild) in journal.children"
              :key="child._id"
            >
              <span>
                {{ indexChild + 1 }}. <b>{{ child.name }}</b> ({{
                  child.found
                }})
              </span>
              เวลา
              {{
                new Date(child.leave_at * 1000 - child.stay)
                  .toTimeString()
                  .split('GMT')[0]
              }}
              -
              {{
                new Date(child.leave_at * 1000).toTimeString().split('GMT')[0]
              }}
            </ol>
          </div>
        </li>
      </ul>
      <!-- <ul v-for="(journal, date) in journals" :key="journal._id">
        <b-button @click="toggleDate(date)">
          วันที่
          {{ date }}
        </b-button>
        <div>
          <ol v-for="log in journal" :key="log._id">
            <div>
              <span>
                <b>{{ log.name }}</b> ({{ log.found }})
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
          <div v-for="id in openings" :key="id">
            {{ id }}
          </div>
        </div>
      </ul> -->
    </div>
    <div class="border border-info rounded p-2 m-2">
      <div>สถานที่อันตราย</div>
      <ul>
        <div v-for="track in placeTracks" :key="track._id">
          <span>
            <b>{{ track.name }}</b> ({{ track._id }})
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
          <b>{{ track.name }}</b> ({{ track._id }})
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
export default class ExploreID extends Vue {
  journals: any[] = []
  placeTracks: any[] = []
  personTracks: any[] = []
  openings: string[] = []
  own: any = null
  update = 0
  async mounted() {
    const own = await this.$axios.$get(`/identities/${this.$route.params.id}`)
    this.own = own
    const places: any[] = await this.$axios.$get(
      `/tracks/explore/place/${this.$route.params.id}`
    )
    const persons: any[] = await this.$axios.$get(
      `/tracks/explore/person/${this.$route.params.id}`
    )

    this.placeTracks = places
    this.personTracks = persons

    const journals: any = await this.$axios.$get(
      `/tracks/explore/${this.$route.params.id}`
    )

    const journalls: any = []

    for (const date in journals) {
      console.log(`date: ${date}`)
      console.log(journals[date])
      journalls.push({
        date,
        expanded: false,
        children: journals[date],
      })
    }

    console.log(journalls)

    this.journals = journalls
  }

  toggleDate(index: number) {
    this.journals[index].expanded = !this.journals[index].expanded
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
