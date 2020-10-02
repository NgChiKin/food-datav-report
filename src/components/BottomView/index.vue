<template>
  <div>
    <el-row :gutter="30">
      <el-col :lg="12" :md="24">
        <el-card :body-style="{padding: 0}" shadow="hover">
          <template v-slot:header>
            <div class="title-wrapper">关键词搜索</div>
          </template>
          <template>
            <div class="chart-wrapper">
              <div class="chart-inner">
                <div class="chart">
                  <div class="chart-title">搜索用户数量</div>
                  <div class="chart-data">{{userCount | format}}</div>
                  <v-chart :options="searchUserOptions"/>
                </div>
                <div class="chart">
                  <div class="chart-title">搜索量</div>
                  <div class="chart-data">{{searchCount | format}}</div>
                  <v-chart :options="searchNumberOptions"/>
                </div>
              </div>
              <div class="table-wrapper">
                <el-table :data="tableData">
                  <el-table-column label="排名" prop="rank"></el-table-column>
                  <el-table-column label="关键字" prop="keyword"></el-table-column>
                  <el-table-column label="总搜索量" prop="count"></el-table-column>
                  <el-table-column label="搜索用户数" prop="users"></el-table-column>
                  <el-table-column label="搜索率" prop="range"></el-table-column>
                </el-table>
                <el-pagination
                  :page-size="4"
                  :total="total"
                  background
                  layout="prev, pager, next"
                  @current-change="onPageChange"
                />
              </div>
            </div>
          </template>
        </el-card>
      </el-col>
      <el-col :lg="12" :md="24">
        <el-card :body-style="{padding: 0}" shadow="hover">
          <template v-slot:header>
            <div class="title-wrapper">
              <div class="title">分类销售排行</div>
              <div class="radio-wrapper">
                <el-radio-group v-model="radioSelect" size="small" @change="onRadioChange">
                  <el-radio-button label="商品"></el-radio-button>
                  <el-radio-button label="品类"></el-radio-button>
                </el-radio-group>
              </div>
            </div>
          </template>
          <template>
            <div class="chart-wrapper">
              <v-chart :options="categoryOption"></v-chart>
            </div>
          </template>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import commonDataMixin from '../../mixins/commonDataMixin'

export default {
  mixins: [commonDataMixin],
  mounted() {
    this.renderPieChart()
  },
  watch: {
    wordCloud() {
      const totalData = []
      this.wordCloud.forEach((item, index) => {
        totalData.push({
          id: index + 1,
          rank: index + 1,
          keyword: item.word,
          count: item.count,
          users: item.user,
          range: `${((item.count / item.user) * 100).toFixed(2)}%`
        })
      })
      this.totalData = totalData
      this.total = totalData.length
      this.renderTable(1)
      this.userCount = totalData.reduce((s, i) => i.users + s, 0)
      this.searchCount = totalData.reduce((s, i) => i.count + s, 0)
      this.renderLineChart()
    },
    category1() {
      this.renderPieChart()
    }
  },
  data() {
    return {
      searchUserOptions: {},
      searchNumberOptions: {},
      categoryOption: {},
      tableData: [],
      totalData: [],
      total: 0,
      userCount: 0,
      searchCount: 0,
      radioSelect: '品类'
    }
  },
  methods: {
    onPageChange(page) {
      this.renderTable(page)
    },
    renderPieChart() {
      if (!this.category1.data1 || !this.category2.data1) {
        return
      }
      let data
      let axis
      let total = 0
      if (this.radioSelect === '品类') {
        data = this.category1.data1
        axis = this.category1.axisX
        total = data.reduce((s, i) => s + i, 0)
      } else {
        data = this.category2.data1
        axis = this.category2.axisX
        total = data.reduce((s, i) => s + i, 0)
      }
      const chartData = []
      data.forEach((item, index) => {
        const percent = `${(item / total * 100).toFixed(2)}%`
        chartData.push({
          legendname: axis[index],
          value: item,
          percent,
          name: `${axis[index]} | ${percent}`
        })
      })
      this.categoryOption = {
        title: [{
          text: `${this.radioSelect}分布`,
          textStyle: {
            fontSize: 14,
            color: '#666'
          },
          left: 20,
          top: 20
        }, {
          text: '累计订单量',
          subtext: total,
          x: '34.5%',
          y: '43.5%',
          textAlign: 'center',
          textStyle: {
            fontSize: 14,
            color: '#999'
          },
          subtextStyle: {
            fontSize: 28,
            color: '#333'
          }
        }],
        series: [{
          name: '品类分布',
          type: 'pie',
          data: chartData,
          label: {
            normal: {
              show: true,
              position: 'outter',
              formatter: function (params) {
                return params.data.legendname
              }
            }
          },
          center: ['35%', '50%'],
          radius: ['45%', '60%'],
          labelLine: {
            normal: {
              length: 5,
              length2: 3
            }
          },
          itemStyle: {
            borderWidth: 4,
            borderColor: '#fff'
          }
        }],
        legend: {
          type: 'scroll',
          orient: 'vertical',
          height: 250,
          left: '70%',
          top: 'middle',
          textStyle: {
            color: '#8c8c8c'
          }
        },
        tooltip: {
          trigger: 'item',
          formatter: function(params) {
            const str = params.seriesName + '<br />' +
              params.marker + params.data.legendname + '<br />' +
              '数量' + params.data.value + '<br />' +
              '占比' + params.data.percent + '%'
            return str
          }
        }
      }
    },
    renderTable(page) {
      this.tableData = this.totalData.slice(page * 4 - 4, page * 4)
    },
    renderLineChart() {
      const createOption = key => {
        const data = []
        const axis = []
        this.wordCloud.forEach(item => {
          data.push(item[key])
          axis.push(item.word)
        })
        return {
          tooltip: {},
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: axis
          },
          yAxis: {
            show: false
          },
          series: [{
            type: 'line',
            data,
            areaStyle: {
              color: '#E0E0DE',
            },
            lineStyle: {
              color: 'rgba(95,187, 255, .5)',
              lineWidth: 1
            },
            itemStyle: {
              opacity: 0
            },
            smooth: true
          }],
          grid: {
            top: 0,
            left: 0,
            bottom: 0,
            right: 0
          }
        }
      }
      this.searchUserOptions = createOption('user')
      this.searchNumberOptions = createOption('count')
    },
    onRadioChange(type) {
      this.radioSelect = type
      this.renderPieChart()
    }
  }
}
</script>

<style lang="scss" scoped>
.el-col {
  margin-top: 20px;
}
.title-wrapper {
  display: flex;
  align-items: center;
  height: 60px;
  box-sizing: border-box;
  border-bottom: 1px solid #eee;
  font-size: 12px;
  font-weight: 700;
  padding: 0 0 0 20px;

  .radio-wrapper {
    flex: 1;
    display: flex;
    justify-content: flex-end;
    padding-right: 20px;
  }
}

.chart-wrapper {
  display: flex;
  flex-direction: column;
  height: 452px;

  .chart-inner {
    display: flex;
    padding: 0 10px;
    margin-top: 20px;

    .chart {
      flex: 1;
      padding: 0 10px;

      .chart-title {
        color: #999;
        font-size: 14px;
      }

      .chart-data {
        color: #333;
        font-size: 22px;
        font-weight: 600;
        letter-spacing: 2px;
      }

      .echarts {
        height: 50px;
      }
    }
  }

  .table-wrapper {
    flex: 1;
    margin-top: 20px;
    padding: 0 20px 20px;

    .el-pagination {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      margin-top: 15px;
    }
  }
}

</style>
