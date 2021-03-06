function formatter(v) {
  const reg = /\d{1,3}(?=(\d{3})+$)/g
  return `${v}`.replace(reg, '$&,')
}

function wrapperMoney(o, k) {
  return o && o[k] ? ' ¥ ' + formatter(o[k]) : 0
}
function wrapperOriginalNumber(o, k) {
  return o && o[k] ? o[k] : 0
}
function wrapperNumber(o, k) {
  return o && o[k] ? formatter(o[k]) : 0
}
function wrapperPercentage(o, k) {
  return o && o[k] ? o[k] + '%' : '0%'
}
function wrapperArray(o, k) {
  return o && o[k] ? o[k] : []
}
function wrapperObj(o, k) {
  if (o && k.indexOf('.') >= 0) {
    const keys = k.split('.')
    keys.forEach(key => {
      o = o[key]
    })
    return o
  } else {
    return o && o[k] ? o[k] : {}
  }
}

export default {
  inject: ['getReportData', 'getWordCloud', 'getMapData'],
  filters: {
    format(v) {
      return formatter(v)
    }
  },
  computed: {
    reportData() {
      return this.getReportData()
    },
    salesToday() {
      return wrapperMoney(this.reportData, 'salesToday')
    },
    salesGrowthLastDay() {
      return wrapperPercentage(this.reportData, 'salesGrowthLastDay')
    },
    salesGrowthLastMonth() {
      return wrapperPercentage(this.reportData, 'salesGrowthLastMonth')
    },
    salesLastDay() {
      return wrapperMoney(this.reportData, 'salesLastDay')
    },
    orderToday() {
      return wrapperNumber(this.reportData, 'orderToday')
    },
    orderLastDay() {
      return wrapperNumber(this.reportData, 'orderLastDay')
    },
    orderTrend() {
      return wrapperArray(this.reportData, 'orderTrend')
    },
    orderUser() {
      return wrapperNumber(this.reportData, 'orderUser')
    },
    returnRate() {
      return wrapperPercentage(this.reportData, 'returnRate')
    },
    orderUserTrend() {
      return wrapperArray(this.reportData, 'orderUserTrend')
    },
    orderUserTrendAxis() {
      return wrapperArray(this.reportData, 'orderUserTrendAxis')
    },
    userToday() {
      return wrapperNumber(this.reportData, 'userToday')
    },
    userTodayNumber() {
      return wrapperOriginalNumber(this.reportData, 'userToday')
    },
    userGrowthLastDay() {
      return wrapperPercentage(this.reportData, 'userGrowthLastDay')
    },
    userGrowthLastMonth() {
      return wrapperPercentage(this.reportData, 'userGrowthLastMonth')
    },
    userGrowthLastMonthNumber() {
      return wrapperOriginalNumber(this.reportData, 'userGrowthLastMonth')
    },
    userLastMonth() {
      return wrapperOriginalNumber(this.reportData, 'userLastMonth')
    },
    orderFullYear() {
      return wrapperArray(this.reportData, 'orderFullYear')
    },
    orderFullYearAxis() {
      return wrapperArray(this.reportData, 'orderFullYearAxis')
    },
    orderRank() {
      return wrapperArray(this.reportData, 'orderRank')
    },
    userFullYear() {
      return wrapperArray(this.reportData, 'userFullYear')
    },
    userFullYearAxis() {
      return wrapperArray(this.reportData, 'userFullYearAxis')
    },
    userRank() {
      return wrapperArray(this.reportData, 'userRank')
    },
    wordCloud() {
      return this.getWordCloud()
    },
    category1() {
      return wrapperObj(this.reportData, 'category.data1')
    },
    category2() {
      return wrapperObj(this.reportData, 'category.data2')
    },
    mapData() {
      return this.getMapData()
    }

  }
}
