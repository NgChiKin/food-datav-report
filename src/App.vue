<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'app'
}
</script>

<style>
html, body, #app {
  width: 100%;
  margin: 0;
  padding: 0;
}
#app {
  background: #eee;
}
</style>
