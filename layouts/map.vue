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

/* eslint-disable no-undef */

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
    // map.data.loadGeoJson('/_content/gadm36_THA/gadm36_THA_1')
    map.data.setStyle(function (feature) {
      console.log(feature)
      return {
        fillColor: '#66AA00',
        strokeWeight: 0.5,
      }
    })

    map.data.addListener('click', (event: google.maps.Data.MouseEvent) => {
      map.data.overrideStyle(event.feature, {
        strokeWeight: 2,
      })
      const bounds = new google.maps.LatLngBounds()
      event.feature
        .getGeometry()
        .forEachLatLng((latLng) => bounds.extend(latLng))
      console.log(event.feature)
      const province = event.feature.getProperty('NAME_1')
      // this.infoWindow.setPosition(event.latLng)
      this.infoWindow.setPosition(bounds.getCenter())
      this.infoWindow.setContent(province)
      this.infoWindow.open(map)
      map.setCenter(bounds.getCenter())
      map.fitBounds(bounds)

      console.log(province)
      this.loadSingleDistrictFromProvince(province, map)
    })

    map.data.addListener('mouseout', (event: google.maps.Data.MouseEvent) => {
      map.data.revertStyle(event.feature)
      this.infoWindow.close()
    })

    const ComponentClass = Vue.extend(MapButton)
    const instance = new ComponentClass()
    instance.$mount()
    map.controls[google.maps.ControlPosition.RIGHT_TOP].push(instance.$el)

    // const instance2 = new ComponentClass()
    // instance.$mount()
    // map.controls[google.maps.ControlPosition.LEFT_TOP].push(instance2.$el)

    // this.addButtonToGoogleMap()
    this.addFeaturesToMap(features, map)
  }

  addFeaturesToMap(features: any[], map: google.maps.Map) {
    features.forEach((feature) => {
      if (!feature.geometry) return
      if (feature.properties.NAME_1 !== 'Bangkok Metropolis') return
      const coordinates: any[] = feature.geometry?.coordinates || []
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
          map.data.add({
            geometry: new google.maps.Data.Polygon([paths]),
            id: feature.properties.CC_2,
            properties: feature.properties,
          })
          // this.addPolygonFromPath(paths, feature.properties, map)
        })
      } else {
        // let polygon: google.maps.Polygon | undefined
        coordinates.forEach((coordinate: any[]) => {
          coordinate.forEach((coords: any[]) => {
            const paths: any[] = []
            coords.forEach((coord: any[]) => {
              const latlng: google.maps.LatLng = new google.maps.LatLng(
                coord[1],
                coord[0]
              )
              paths.push(latlng)
            })
            map.data.add({
              geometry: new google.maps.Data.Polygon([paths]),
              id: feature.properties.CC_2,
              properties: feature.properties,
            })
            // this.addPolygonFromPath(paths, feature.properties, map)
          })
        })
      }
    })
  }

  async loadSingleDistrictFromProvince(province: string, map: google.maps.Map) {
    const xx = await this.$content('gadm36_THA/gadm36_THA_1').fetch()
    console.log(xx, province, map)
    // if ((xx instanceof Array)) {
    //   const features: { geometry: any; properties: any; type: string }[] = xx instanceof Array ? xx.map(
    //   (x) => x.features
    // )
    // }
    // const features: any[] = []
    // const filtered = features.filter(
    //   (feature) => feature.properties.NAME_1 === province
    // )
    // console.log(filtered)
    // this.addFeaturesToMap(filtered, map)
  }

  // addPolygonFromPath(
  //   paths: google.maps.LatLng[],
  //   properties: any,
  //   map: google.maps.Map
  // ) {
  //   if (!paths) return
  //   let color = '#66AA00'
  //   const mock = this.mocksData.find((mock) => {
  //     return (
  //       (properties.CC_1 as string)?.startsWith(mock.id) ||
  //       (properties.CC_2 as string)?.startsWith(mock.id)
  //     )
  //   })
  //   if (mock) {
  //     color = '#DDAA00'
  //   }
  //   const polygon = new google.maps.Polygon({
  //     paths: [paths],
  //     map,
  //     strokeColor: '#660000',
  //     strokeOpacity: 0.8,
  //     strokeWeight: 0.5,
  //     fillColor: color,
  //     fillOpacity: 0.65,
  //     clickable: true,
  //   })

  //   const bounds = new google.maps.LatLngBounds()
  //   polygon.getPaths().forEach((path) => {
  //     const points = path.getArray()
  //     points.forEach((point) => {
  //       bounds.extend(point)
  //     })
  //   })

  //   polygon.addListener('click', (event) => {
  //     console.log(properties)
  //     this.infoWindow.setPosition({
  //       lat: event.latLng.lat(),
  //       lng: event.latLng.lng(),
  //     })
  //     this.infoWindow.setContent(properties.NAME_1)
  //     this.infoWindow.open(map, polygon)
  //     map.setCenter(bounds.getCenter())
  //     map.fitBounds(bounds)
  //   })

  //   polygon.addListener('mouseout', () => {
  //     this.infoWindow.close()
  //   })
  //   return polygon
  // }
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
