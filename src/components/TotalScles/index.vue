<template>
  <common-card title="累计销售金额" :value="salesToday">
    <template>
      <div class="compare-wrap">
        <div class="compare">
          <span>日同比</span>
          <span class="emphasis">{{salesGrowthLastDay}}</span>
          <div class="increase"></div>
        </div>
        <div class="compare">
          <span>月同比</span>
          <span class="emphasis"> {{salesGrowthLastMonth}}</span>
          <div class="decrease"></div>
        </div>
      </div>
    </template>
    <template v-slot:footer>
      <span>昨日销售:</span>
      <span class="emphasis">{{salesLastDay}}</span>
    </template>
  </common-card>
</template>

<script>
import commonCardMixin from '../../mixins/CommonCardMixins'
import commonDataMixin from '../../mixins/commonDataMixin'

export default {
  mixins: [commonCardMixin, commonDataMixin]
}
</script>

<style lang="scss" scoped>
.compare-wrap {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  .compare {
    display: flex;
    align-items: center;
    font-size: 12px;
    margin-top: 3px;
  }
}
span {
  font-size: 12px;
}
</style>
