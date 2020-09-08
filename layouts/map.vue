<template>
  <div>
    <b-container>
      <b-row
        class="bg-danger no-gutters"
        style="min-height: 100vh; min-width: 50vw"
      ></b-row>
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
