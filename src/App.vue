<template>
  <div id="app">
    <div class="wrapper">
      <router-view/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Hammersmith One', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #111110;
  background: #161616;
  height: 100%;
  width: 100%;
  position: absolute;
  left: 0%;
  top: 0%
}

.wrapper {
  position: relative;
  height: 100%;
  max-width: 100%;
  max-height: 100%
}
</style>
