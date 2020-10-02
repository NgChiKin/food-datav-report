<template>
  <ve-liquidfill :data="chartData" :settings="chartSettings" height="100%"/>
</template>

<script>
import commonDataMixin from '../../mixins/commonDataMixin'
function getColor(value) {
  if (value > 0 && value < 0.5) {
    return '#f08a5d'
  } else if (value > 0.5 && value < 0.8) {
    return '#b83b5e'
  } else {
    return '#6a2c70'
  }
}

export default {
  mixins: [commonDataMixin],
  watch: {
    userGrowthLastMonthNumber() {
      this.chartData = {
        columns: ['title', 'percent'],
        rows: [{
          title: '用户月同比增长',
          percent: this.userGrowthLastMonthNumber / 100
        }]
      }
      /* eslint-disable*/
      this.chartSettings = {
        seriesMap: {
          '用户月同比增长': {
            radius: '80%',
            label: {
              normal: {
                formatter: v => {
                  return `${(v.data.value * 100).toFixed(2)}%`
                },
                textStyle: {
                  fontSize: 36,
                  color: '#999',
                  fontWeight: 'normal'
                },
                position: ['50%', '50%']
              }
            },
            outline: {
              itemStyle: {
                borderColor: '#aaa4a4',
                borderWidth: 1,
                color: 'none',
                shadowBlur: 0,
                shadowColor: '#fff'
              },
              borderDistance: 3
            },
            backgroundStyle: {
              color: '#fff'
            },
            itemStyle: {
              shadowBlur: 0,
              shadowColor: '#fff'
            },
            color: [getColor(this.chartData.rows[0].percent)]
          }
        }
      }
    }
  },
  data() {
    return {
      chartData: {},
      chartSettings: {}
    }
  }
}
</script>

<style scoped>
</style>
