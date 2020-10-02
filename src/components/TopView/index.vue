<template>
  <div class="top-view">
    <el-row :gutter="20">
      <el-col :md="6" :xs="24" :sm="12">
        <el-card shadow="hover">
          <total-scles />
        </el-card>
      </el-col>
      <el-col :md="6" :xs="24" :sm="12">
        <el-card shadow="hover">
          <total-orders />
          </el-card>
      </el-col>
      <el-col :md="6" :xs="24" :sm="12">
        <el-card shadow="hover">
          <today-users />
          </el-card>
      </el-col>
      <el-col :md="6" :xs="24" :sm="12">
        <el-card shadow="hover">
          <total-users />
          </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import TotalScles from '../TotalScles'
import TotalOrders from '../TotalOrders'
import TodayUsers from '../TodayUsers'
import TotalUsers from '../TotalUsers'
export default {
  components: {
    TotalScles,
    TotalOrders,
    TodayUsers,
    TotalUsers
  },
}
</script>

<style lang="scss" scoped>
.el-col {
  margin: 10px 0;
}
</style>
