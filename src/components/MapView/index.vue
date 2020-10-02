<template>
  <div class="map-view">
    <div class="left">
      <bmap-scatter></bmap-scatter>
    </div>
    <div class="right">
      <el-card shadow="hover">
        <template v-slot:header>
          <div class="title">用户月同比增长</div>
        </template>
        <template>
          <div class="chart-wrapper">
            <liquid-fill></liquid-fill>
          </div>
        </template>
      </el-card>
      <el-card shadow="hover">
        <template v-slot:header>
          <div class="title">热门搜索</div>
        </template>
        <template>
          <div class="chart-wrapper">
            <word-cloud />
          </div>
        </template>
      </el-card>
    </div>
  </div>
</template>

<script>
import BmapScatter from '../BMapScatter'
import LiquidFill from '../LiquidFill'
import WordCloud from '../wordCloud'

export default {
  components: {
    BmapScatter,
    LiquidFill,
    WordCloud
  }
}
</script>

<style lang="scss" scoped>
.map-view {
  display: flex;
  margin-top: 20px;
  padding-bottom: 20px;
  .left {
    flex: 0 0 80%;
    width: 80%;
    height: 600px;
    background: #fff;
  }

  .right {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-left: 20px;
    .title {
      display: flex;
      align-items: center;
      height: 60px;
      box-sizing: border-box;
      border-bottom: 1px solid #eee;
      font-size: 12px;
      font-weight: 700;
      padding: 0 0 0 20px;
    }
    .chart-wrapper {
      height: 190px;
      width: 100%;
    }
  }

}
</style>
