<template>
  <ve-wordcloud :data="chartData" height="100%" :settings="chartSettings"/>
</template>

<script>
import commonDataMixin from '../../mixins/commonDataMixin'

export default {
  mixins: [commonDataMixin],
  data() {
    return {
      chartData: {},
      chartSettings: {}
    }
  },
  mounted() {
    this.chartSettings = {}
  },
  watch: {
    wordCloud() {
      const data = []
      this.wordCloud.forEach(item => {
        data.push({
          name: item.word,
          value: item.count
        })
      })
      this.chartData = {
        columns: ['name', 'value'],
        rows: data
      }
    }
  }
}
</script>

<style scoped>
</style>
