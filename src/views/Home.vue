<template>
  <div class="home">
    <top-view />
    <sales-view />
    <bottom-view />
    <map-view />
  </div>
</template>

<script>
// @ is an alias to /src
import TopView from '../components/TopView'
import SalesView from '../components/SalesView'
import BottomView from '../components/BottomView'
import MapView from '../components/MapView'
import { wordcloud, mapScatter, screenData } from '../api'

export default {
  name: 'Home',
  components: {
    TopView,
    SalesView,
    BottomView,
    MapView,
  },
  data() {
    return {
      reportData: null,
      wordCloud: null,
      mapData: null
    }
  },
  methods: {
    getReportData() {
      return this.reportData
    },
    getWordCloud() {
      return this.wordCloud
    },
    getMapData() {
      return this.mapData
    }
  },
  provide() {
    return {
      getReportData: this.getReportData,
      getWordCloud: this.getWordCloud,
      getMapData: this.getMapData
    }
  },
  mounted() {
    screenData().then(data => { this.reportData = data })
    wordcloud().then(data => { this.wordCloud = data })
    mapScatter().then(data => { this.mapData = data })
  }
}
</script>

<style lang="scss" scoped>
.home {
  width: 1920px;
  margin: 0 auto;
  padding: 0 20px;
  background: #eee;
  box-sizing: border-box;
}

@media (max-width: 1920px) {
  .home {
    width: 100%;
  }
}
</style>
