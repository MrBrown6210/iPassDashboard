<template>
  <div>
    <b-navbar id="navbar" toggleable="md" type="light" variant="dark">
      <!-- <b-navbar-brand class="d-md-none" to="/explore">
        <img
          style="width: 50px"
          class="navbar-logo"
          src="@/assets/images/ipass-on-card-4.png"
          alt="iPass"
        />
      </b-navbar-brand> -->
      <b-navbar-toggle target="collapse-area"></b-navbar-toggle>
      <b-collapse id="collapse-area" is-nav>
        <b-navbar-nav>
          <b-nav-item to="/explore">
            <img
              style="width: 55px"
              src="@/assets/images/ipass-on-card-4.png"
              alt="iPass logo"
            />
          </b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav class="d-none d-md-block mx-auto">
          <b-nav-text>
            <img
              style="width: 50px"
              src="@/assets/images/Logo_NBT mixed color.png"
              alt="NBT"
            />
          </b-nav-text>
        </b-navbar-nav>
        <b-navbar-nav>
          <b-nav-item>
            <img
              style="width: 50px"
              src="@/assets/images/logo-nstda-202010.png"
              alt="iPass logo"
            />
          </b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <b-container>
      <Nuxt />
    </b-container>
  </div>
</template>

<style>
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}
</style>
