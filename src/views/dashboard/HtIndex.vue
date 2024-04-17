<template>
    <div class="dashboard-page">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>面经后台</el-breadcrumb-item>
        <el-breadcrumb-item>数据看板</el-breadcrumb-item>
      </el-breadcrumb>
      <el-row :gutter="20">
        <el-col :span="6">
          <el-card style="height: 140px" shadow="never">
            <i class="el-icon-user"></i>
            <h5 class="tit">活跃用户</h5>
            <h2 class="num">802</h2>
            <p class="tag">
              <i>↑ 5.23%</i> 最近一个月
            </p>
          </el-card>
          <el-card style="height: 140px" shadow="never">
            <i class="el-icon-tickets"></i>
            <h5 class="tit">平均访问量</h5>
            <h2 class="num">1298</h2>
            <p class="tag">
              <i class="red">↓ 8.56%</i> 截止最近一周
            </p>
          </el-card>
          <el-card class="row" style="height: 180px" shadow="never">
            <h4>Enhance your Campaign for better outreach →</h4>
            <img src="@/assets/img.svg" alt />
          </el-card>
        </el-col>
        <el-col :span="18">
          <el-card style="height: 504px" shadow="never">
            <div ref="chart" class="chart-box" style="height: 500px">

            </div>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card style="height: 420px" shadow="never">
            <h4>性别分布情况</h4>
            <img style="margin-top: 60px" src="@/assets/chart-03.png" alt />
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card style="height: 420px" shadow="never">
            <h4>浏览访问情况</h4>
            <img src="@/assets/chart-01.svg" alt />
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card style="height: 420px" shadow="never">
            <h4>设备系统访问情况</h4>
            <img style="margin-top: 20px" src="@/assets/chart-02.svg" alt />
          </el-card>
        </el-col>
      </el-row>
    </div>
  </template>

<script>
import * as echarts from 'echarts'
// import { getLineAPI } from '@/api/user'
export default {
  name: 'dashboard-page',
  data () {
    return {
      mychart: null,
      xAxisData: [],
      yAxisData: [],
      yAxisData2: []
    }
  },
  //   created () {
  //     setInterval(async () => {
  //       try {
  //         const res = await getLineAPI()
  //         console.log('测试数据接口')
  //         this.xAxisData = res.data.list.map(item => item.ref_date)
  //         this.yAxisData = res.data.list.map(item => item.session_cnt)
  //         this.yAxisData2 = res.data.list.map(item => item.visit_pv)
  //         console.log(' this.xAxisData ', this.xAxisData)
  //         console.log(' this.yAxisData :', this.yAxisData)
  //         console.log(' this.yAxisData2 :', this.yAxisData2)
  //       } catch (err) {
  //         console.log('dashoboarderr:', err)
  //       }

  //       // 获取更新数据之后，如果需要更新echarts图标，重新this.mychart.setOption({ })
  //       this.mychart.setOption({
  //         xAxis: { data: this.xAxisData },
  //         series: [{
  //           data: this.yAxisData
  //         }, {
  //           data: this.yAxisData2
  //         }]
  //       })
  //     }, 2000)
  //   },
  mounted () {
    console.log('一次mounted')
    this.mychart = echarts.init(this.$refs.chart)
    const option = {
      xAxis: {
        type: 'category',
        boundaryGap: false, // x轴两边留白
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: [{
        name: 'session_cnt',
        type: 'value',
        min: 0,
        max: 20,
        interval: 4
      },
      {
        type: 'value',
        name: 'visit_pv',
        position: 'right',
        alignTicks: true,
        min: 0,
        max: 600,
        interval: 120,
        axisLine: {
          show: true,
          lineStyle: {
            // color: 'blue'
          }
        },

        axisLabel: {
          formatter: '{value}'
        }
      }],
      series: [
        {
          name: 'session_cnt',
          data: [10, 2, 9, 14, 19, 13, 2],
          type: 'line',
          areaStyle: {},
          smooth: true,
          linetyle: {
            color: '#1bd4ae'
          },
          itemStyle: {
            color: '#1bd4ae'
          }
        //   areaStyle: {
        //     color: '#5ee0c6'
        //   }
        },
        {
          name: 'visit_pv',
          yAxisIndex: 1,

          data: [80, 393, 71, 34, 290, 330, 520],
          type: 'line',
          areaStyle: {},
          smooth: true,
          linetyle: {
            color: '#4fc8db'
          },
          itemStyle: {
            color: '#4fc8db'
          }
        //   areaStyle: {
        //     color: '#5ee0c6'
        //   }
        }
      ]
    }
    this.mychart.setOption(option)
  }
}
</script>

  <style lang="scss" scoped>
  .dashboard-page {
    .el-breadcrumb {
      margin-top: 10px;
      margin-bottom: 25px;
    }
    .el-card {
      margin-bottom: 20px;
      position: relative;
      &.row {
        h4 {
          width: 40%;
          float: left;
          font-size: 18px;
          margin-left: 5%;
        }
        img {
          width: 40%;
          float: left;
          margin-left: 10%;
          margin-top: 30px;
        }
      }
      [class^="el-icon"] {
        font-size: 30px;
        color: #ccc;
        position: absolute;
        right: 25px;
        top: 30px;
        font-weight: bold;
      }
      .tit {
        color: #6c757d;
        font-size: 14px;
        margin: 6px 0;
      }
      .num {
        color: #6c757d;
        font-size: 30px;
        margin: 6px 0;
      }
      .tag {
        color: #999;
        margin: 0;
        font-size: 14px;
        > i {
          font-style: normal;
          margin-right: 10px;
          color: rgb(10, 207, 151);
          &.red {
            color: #fa5c7c;
          }
        }
      }
      img {
        width: 100%;
        height: 100%;
      }
      h4 {
        margin: 0;
        padding-bottom: 20px;
        color: #6c757d;
      }
    }
  }
  </style>
