<template>
  <div class="main_app">
    <!-- <h1>日报~</h1>
    <el-row>
      <el-col :span="12">
        <el-time-select
          placeholder="起始时间"
          v-model="startTime"
          :picker-options="{
            start: '08:30',
            step: '00:15',
            end: '18:30'
          }"
        ></el-time-select>
        至
        <el-time-select
          placeholder="结束时间"
          v-model="endTime"
          :picker-options="{
            start: '08:30',
            step: '00:15',
            end: '18:30',
            minTime: startTime
          }"
        ></el-time-select>
      </el-col>
    </el-row> -->
  </div>
</template>

<script>
export default {
  name: "app",
  // data() {
  //   return {
  //     startTime: "",
  //     endTime: ""
  //   };
  // }
};
</script>

<style>
.main_app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
