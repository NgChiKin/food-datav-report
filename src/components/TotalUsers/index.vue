<template>
  <common-card title="累计用户数" :value="userToday">
    <template>
      <v-chart :options="getOptions()" />
    </template>
    <template v-slot:footer>
      <div class="total-users-footer">
        <span>日同比</span>
        <span class="emphasis"> {{userGrowthLastDay}}</span>
        <div class="increase"></div>
        <span class="month">月同比</span>
        <span class="emphasis"> {{userGrowthLastMonth}}</span>
        <div class="decrease"></div>
      </div>
    </template>
  </common-card>
</template>

<script>
import commonCardMixin from '../../mixins/CommonCardMixins'
import commonDataMixin from '../../mixins/commonDataMixin'

export default {
  mixins: [commonCardMixin, commonDataMixin],
  methods: {
    getOptions() {
      return {
        color: ['#E0B934', '#eee'],
        grid: {
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
        },
        xAxis: {
          type: 'value',
          show: false,
        },
        yAxis: {
          type: 'category',
          show: false,
        },
        tooltip: {},
        series: [
          {
            name: '今日平台用户数',
            type: 'bar',
            stack: '总量',
            data: [this.userLastMonth],
            barWidth: '10px',
          },
          {
            name: '上月平台用户数',
            type: 'bar',
            stack: '总量',
            data: [this.userTodayNumber],
            barWidth: '10px',
          },
          {
            type: 'custom',
            data: [this.userLastMonth],
            stack: '总量',
            renderItem: (params, api) => {
              const value = api.value(0)
              const endPoint = api.coord([value, 0])
              return {
                type: 'group',
                position: endPoint,
                children: [
                  {
                    type: 'path',
                    shape: {
                      d:
                        'M511.744 319.999l-383.744 383.744h767.488l-383.744-383.744z',
                      x: -7,
                      y: 5,
                      width: 15,
                      height: 15,
                    },
                    style: {
                      fill: '#E0B934',
                    },
                  },
                  {
                    type: 'path',
                    shape: {
                      d:
                        'M128 320.001l383.744 383.744 383.744-383.744h-767.488z',
                      x: -7,
                      y: -20,
                      width: 15,
                      height: 15,
                    },
                    style: {
                      fill: '#E0B934',
                    },
                  },
                ],
              }
            },
          },
        ],
      }
    },
  },
}
</script>

<style lang="scss" scopde>
.total-users-footer {
  display: flex;
  align-items: center;
  .month {
    margin-left: 10px;
  }
}
</style>
