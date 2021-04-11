<template>
  <div class="home">
    <el-card>
      <div id="main" class="main_container"></div>
    </el-card>
  </div>
</template>

<script>
import * as echarts from "echarts";
import { TitleComponent, GridComponent } from "echarts/components";
import { BarChart } from "echarts/charts";
import { CanvasRenderer } from "echarts/renderers";
echarts.use([TitleComponent, GridComponent, BarChart, CanvasRenderer]);

export default {
  data() {
    return {
      list:{},
      listName:[],
      listNum:[],
    };
  },
  mounted() {
    this.initCharts();
    this.handleList();
  },
  methods: {
    handleList(){
      this.$axios.get('queryNums/info')
        .then(function(res){
          console.log(res.data)
        })
    },
    initCharts() {
      var myChart = echarts.init(document.getElementById("main"));
      // 绘制图表
      myChart.setOption({
        title: {
          text: "ECharts 入门示例",
        },
        tooltip: {},
        xAxis: {
          data: [],
        },
        yAxis: {},
        series: [
          {
            name: "销量",
            type: "bar",
            data: [this.listNum[0],this.listNum[1],this.listNum[2],this.listNum[3]],
          },
        ],
      });
    },
  },
};
</script>
<style>
.main_container {
  width: 400px;
  height: 200px;
  overflow: hidden;
}
</style>