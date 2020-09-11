<template>
  <div>
    <b-container>
      <b-row
        class="bg-danger no-gutters"
        style="min-height: 100vh; min-width: 50vw"
      >
        <gmap-map
          ref="mapRef"
          :center="{ lat: 13, lng: 100 }"
          :zoom="5"
          style="width: 100%"
        >
          <!-- <gmap-polygon :paths="paths"></gmap-polygon> -->
        </gmap-map>
      </b-row>
      <b-row class="no-gutters" style="min-width: 50vw">
        <b-col cols="12" align-self="start">
          <b-nav class="p-3">
            <b-nav-item exact-active-class="nav-activeX" to="/"
              >Dashboard</b-nav-item
            >
            <b-nav-item active-class="nav-active" to="/graph">Graph</b-nav-item>
            <b-nav-item active-class="nav-active">Cases</b-nav-item>
            <b-nav-item active-class="nav-active">Death Rate</b-nav-item>
          </b-nav>
        </b-col>
        <b-col cols="12" style="height: 90vh">
          <div class="p-3">
            <div class="px-3">
              <Nuxt />
            </div>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'nuxt-property-decorator'
import { gmapApi } from 'vue2-google-maps'
import MapButton from '@/components/MapButton.vue'
import Logo from '@/components/Logo.vue'

@Component({})
export default class Map extends Vue {
  $refs!: {
    mapRef: any
  }

  infoWindow!: google.maps.InfoWindow

  mocksData = [
    {
      id: '40',
      value: 250,
    },
    {
      id: '12',
      value: 120,
    },
    {
      id: '10',
      value: 122,
    },
  ]

  get googleMap(): GoogleMapsBase {
    return gmapApi()
  }

  @Watch('googleMap', { deep: true })
  onGoogleMapChange(gmap: { maps: google.maps.Map }) {
    console.log(gmap)
  }

  addButtonToGoogleMap() {
    const gm = document.getElementsByClassName('vue-map').item(0)
    console.dir(gm)
    if (!gm) return
    const ComponentClass = Vue.extend(Logo)
    const instance = new ComponentClass()
    instance.$mount()
    // this.$refs.mapRef.$addChild(instance.$el)
    gm.appendChild(instance.$el)
  }

  async mounted() {
    const countryData: any = await this.$content('gadm36_THA/gadm36_THA_1')
      .only('features')
      .fetch()
    this.infoWindow = new google.maps.InfoWindow()
    const features: any[] = countryData.features
    const map: google.maps.Map = await this.$refs.mapRef.$mapPromise

    // console.log('map', map)
    // map.data.loadGeoJson('gadm36_THA/gadm36_THA_1')

    const ComponentClass = Vue.extend(MapButton)
    const instance = new ComponentClass()
    instance.$mount()
    map.controls[google.maps.ControlPosition.RIGHT_TOP].push(instance.$el)

    // const instance2 = new ComponentClass()
    // instance.$mount()
    // map.controls[google.maps.ControlPosition.LEFT_TOP].push(instance2.$el)

    features.forEach((feature) => {
      const coordinates: any[] = feature.geometry.coordinates
      if (feature.geometry.type === 'Polygon') {
        coordinates.forEach((coordinate: any[]) => {
          const paths: google.maps.LatLng[] = []
          coordinate.forEach((coords: any[]) => {
            const latlng: google.maps.LatLng = new google.maps.LatLng(
              coords[1],
              coords[0]
            )
            paths.push(latlng)
          })
          this.addPolygonFromPath(paths, feature.properties, map)
        })
      } else {
        // let polygon: google.maps.Polygon | undefined
        coordinates.forEach((coordinate: any[]) => {
          coordinate.forEach((coords: any[]) => {
            const paths: any[] = []
            coords.forEach((coord: any[]) => {
              const latlng = { lat: coord[1], lng: coord[0] }
              paths.push(latlng)
            })
            this.addPolygonFromPath(paths, feature.properties, map)
          })
        })
      }
    })

    // this.addButtonToGoogleMap()
  }

  addPolygonFromPath(
    paths: google.maps.LatLng[],
    properties: any,
    map: google.maps.Map
  ) {
    if (!paths) return
    let color = '#66AA00'
    const mock = this.mocksData.find((mock) => {
      return (
        (properties.CC_1 as string)?.startsWith(mock.id) ||
        (properties.CC_2 as string)?.startsWith(mock.id)
      )
    })
    if (mock) {
      color = '#DDAA00'
    }
    const polygon = new google.maps.Polygon({
      paths: [paths],
      map,
      strokeColor: '#660000',
      strokeOpacity: 0.8,
      strokeWeight: 0.5,
      fillColor: color,
      fillOpacity: 0.65,
      clickable: true,
    })

    const bounds = new google.maps.LatLngBounds()
    polygon.getPaths().forEach((path) => {
      const points = path.getArray()
      points.forEach((point) => {
        bounds.extend(point)
      })
    })

    polygon.addListener('click', (event) => {
      console.log(properties)
      this.infoWindow.setPosition({
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
      })
      this.infoWindow.setContent(properties.NAME_1)
      this.infoWindow.open(map, polygon)
      map.setCenter(bounds.getCenter())
      map.fitBounds(bounds)
    })

    polygon.addListener('mouseout', () => {
      this.infoWindow.close()
    })
    return polygon
  }

  findCenterOf(polygon: google.maps.Polygon) {
    let x1 = 0
    let x2 = 0
    let y1 = 0
    let y2 = 0
    const paths = polygon.getPaths()
    paths.forEach((path) => {
      path.forEach((point) => {
        const lat = point.lat()
        const lng = point.lng()
        if (lat <= x1) {
          x1 = lat
        }
        if (lat >= x2) {
          x2 = lat
        }
        if (lng <= y1) {
          y1 = lng
        }
        if (lng >= y2) {
          y2 = lng
        }
      })
    })
    const centerX = x1 - (x1 - x2)
    const centerY = y1 - (y1 - y2)
    return new google.maps.LatLng(centerX, centerY)
  }
}
</script>

<style lang="scss" scoped>
.container {
  margin: 0 auto;
  min-height: 10vh;
  min-width: 100vw;
  display: flex;
  justify-content: center;
  background-color: rgba(233, 237, 240, 255);
}

.nav-link {
  color: rgba(136, 148, 162, 255);
  &.active {
    color: rgba(45, 50, 52, 255);
    font-weight: 700;
  }
  &:hover {
    color: rgba(45, 50, 52, 255);
  }
}
</style>
