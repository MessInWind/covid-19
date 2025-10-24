<template>
  <div class="container">
    <!-- 顶部 -->
    <div class="top-header">
      <div class="title">
        <h1>{{ title }}</h1>
        <div class="top-header-tip">
          <div class="last-update-time">
          </div>
        </div>
      </div>
    </div>
    <div class="main-content">
      <el-row>
        <el-col :span="18">
          <!-- 中间信息开始 -->
          <div class="statistics-content">
            <!-- 中间左侧开始 -->
            <div class="main-inner">
              <el-row>
                <el-col :span="7">
                  <chart-card
                    title="累计排名(TOP 10)"
                    :customClass="`chart-item-bottom-sep`"
                  >
                    <province-ranking-bar-chart
                      ref="topConfirmedCountRankChart"
                      :data="top10ProvinceData"
                      style="width: 100%; height: 380px"
                    />
                  </chart-card>
                  <!-- 占比 -->
                  <chart-card
                    title="占比"
                    :customClass="`chart-item-bottom-sep`"
                  >
                    <basic-proportion-chart
                      ref="basicProportionChart"
                      :data="basicData"
                      style="width: 100%; height: 120px"
                    />
                  </chart-card>
                  <chart-card title="最近一周累计治愈">
                    <current-confirmed-compare-bar-chart
                      ref="confirmSingleBarChart"
                      :data="confirmSingleBarChartData"
                      style="width: 100%; height: 310px"
                    />
                  </chart-card>
                </el-col>
                <el-col :span="17">
                  <!-- 顶部基本统计信息开始 -->
                  <div class="basic-header flex">
                    <!-- 顶部统计信息开始 -->
                    <div class="top-basic-info">
                      <basic-data-item-label
                        label="现有确诊"
                        :config="defaultDataConfig.currentConfirmedCount"
                        :inCrValue="basicData.currentConfirmedIncr"
                      />
                      <basic-data-item-label
                        label="累计确诊"
                        :config="defaultDataConfig.confirmedCount"
                        :inCrValue="basicData.confirmedIncr"
                      />
                      <!-- 境外输入 -->
                      <basic-data-item-label
                        label="境外输入"
                        :config="defaultDataConfig.importedCount"
                        :inCrValue="basicData.importedIncr"
                      />
                      <!-- 无症状感染者 -->
                      <basic-data-item-label
                        label="无症状感染者"
                        :config="defaultDataConfig.noInFectCount"
                        :inCrValue="basicData.noInFectIncr"
                      />
                      <!-- 累计治愈 -->
                      <basic-data-item-label
                        label="累计治愈"
                        :config="defaultDataConfig.curedCount"
                        :inCrValue="basicData.curedIncr"
                      />
                      <!-- 死亡人数 -->
                      <basic-data-item-label
                        label="累计死亡"
                        :config="defaultDataConfig.deadCount"
                        :inCrValue="basicData.deadIncr"
                      />
                    </div>
                    <!-- 顶部统计信息结束 -->
                  </div>
                  <!-- 顶部基本统计信息开始 -->
                  <div class="main-inner-map-wraper">
                    <!-- 地图 -->
                    <div class="map">
                      <data-map
                        ref="dataMap"
                        title=""
                        :list="mapDataList"
                        style="width: 100%; height: 100%"
                      />
                    </div>
                  </div>
                </el-col>
              </el-row>
            </div>
            <!-- 中间左侧结束 -->
          </div>
          <!-- 中间信息结束 -->
        </el-col>
        <el-col :span="6">
          <!-- 右侧区域开始 -->
          <div class="main-right">
            <!-- 治愈率和死亡率 -->
            <chart-card
              title="治愈率和死亡率"
              :innerClass="`cure-and-dead-rate-chart`"
              :customClass="`chart-item-bottom-sep`"
            >
              <cured-and-dead-rate-chart
                ref="cureRateChart"
                :data="rate"
                title="治愈率"
                style="width: 280px; height: 130px"
              />
            </chart-card>
            <chart-card title="新增数据" :customClass="`chart-item-bottom-sep`">
              <basic-trend-chart
                :data="basicIncrTrendData"
                ref="confirmedCountTrendChart"
                style="width: 100%; height: 320px"
              />
            </chart-card>
            <chart-card title="">
              <div slot="title" class="province-table-title flex">
                各省累计确诊
                <el-link
                  icon="el-icon-view"
                  style="color: #bcbcbf; padding-left: 10px"
                  :underline="false"
                  @click="provinceTableDialogShowHandler"
                  >详情</el-link
                >
              </div>
               <dv-scroll-board
                  :config="provinceConfirmedCountBoardConfig"
                  style="width: 100%; height: 360px"
                />
            </chart-card>
          </div>
          <!-- 右侧区域结束 -->
        </el-col>
      </el-row>
    </div>
    <!-- 其他页面 -->
    <div class="province-data-table-wrapper">
      <el-dialog
        :visible.sync="provinceTableDialogVisible"
        width="50%"
        :before-close="provinceTableDialogClose"
      >
        <div slot="title" class="province-data-modal-title">
          <p>各省数据表</p>
          <span class="province-data-modal-update-time"
            >( 更新时间:{{ basicData.updateTime }} )</span
          >
        </div>
        <div class="area-data-table-wrapper">
          <el-table
            class="area-data-table"
            :data="provinceDataList"
            style="width: 100%"
          >
            <el-table-column prop="provinceLabel" align="center" label="省份">
            </el-table-column>
            <el-table-column
              prop="confirmedCount"
              align="center"
              label="累计确诊"
            >
            </el-table-column>
            <el-table-column
              prop="currentConfirmedCount"
              align="center"
              label="现有确诊"
            >
            </el-table-column>
            <el-table-column prop="curedCount" align="center" label="累计治愈">
            </el-table-column>
            <el-table-column prop="deadCount" align="center" label="累计死亡">
            </el-table-column>
          </el-table>
        </div>
      </el-dialog>
      <!-- 关于弹窗 -->
      <el-dialog
        title="关于"
        :visible.sync="aboutDialogVisible"
        width="30%"
        :before-close="aboutDialogClose"
      >
        <about />
      </el-dialog>
      <!-- 关于图标 -->
      <div class="about-wraper">
        <i
          class="el-icon-info"
          style="font-size: 30px"
          @click="aboutDialogShowHandler"
        ></i>
      </div>
      <div class="sentiment-btn-wraper">
        <i
          class="el-icon-data-analysis"
          style="font-size: 30px"
          @click="goToSentimentAnalysis"
        ></i>
      </div>
    </div>
  </div>
</template>
<script>
// ...existing code...
import About from '../components/About'
import BasicDataItemLabel from '../components/BasicDataItemLabel'
import BasicProportionChart from '../components/BasicProportionChart'
import BasicTrendChart from '../components/BasicTrendChart'
import ChartCard from '../components/ChartCard'
import CuredAndDeadRateChart from '../components/CuredAndDeadRateChart'
import CurrentConfirmedCompareBarChart from '../components/CurrentConfirmedCompareBarChart'
import DataMap from '../components/DataMap'
import ProvinceRankingBarChart from '../components/ProvinceRankingBarChart'

import covid19Service from '../api/covid19'

const formatter = (number) => {
  const numbers = number.toString().split('').reverse()
  const segs = []
  while (numbers.length) segs.push(numbers.splice(0, 3).join(''))
  return segs.join(',').split('').reverse().join('')
}
// 数据样式
const getNumberStyle = (color = '#E8EAF6', fontSize = 30, fontWeight = 'bolder') => {
  return {
    fontSize: fontSize,
    fill: color,
    fontWeight: fontWeight
  }
}

const initBasicConfig = (data = null) => {
  let currentConfirmedCount = data ? [data.currentConfirmedCount] : 0
  let confirmedCount = data ? [data.confirmedCount] : 0
  let importedCount = data ? [data.importedCount] : 0
  let noInFectCount = data ? [data.noInFectCount] : 0
  let deadCount = data ? [data.deadCount] : 0
  let curedCount = data ? [data.curedCount] : 0
  return {
    confirmedCount: {
      number: [confirmedCount],
      content: '{nt}',
      formatter,
      style: getNumberStyle()
    },
    currentConfirmedCount: {
      number: [currentConfirmedCount],
      content: '{nt}',
      formatter,
      style: getNumberStyle('#2E8EEA')
    },
    importedCount: {
      number: [importedCount],
      content: '{nt}',
      formatter,
      style: getNumberStyle()
    },
    noInFectCount: {
      number: [noInFectCount],
      content: '{nt}',
      formatter,
      style: getNumberStyle()
    },
    deadCount: {
      number: [deadCount],
      content: '{nt}',
      formatter,
      style: getNumberStyle('#D32E58')
    },
    curedCount: {
      number: [curedCount],
      content: '{nt}',
      formatter,
      style: getNumberStyle()
    }
  }
}

const initProvinceConfirmedCountBoardConfig = (resultList = []) => {
  return {
    header: ['省份', '累计确诊', '累计治愈', '累计死亡'],
    headerHeight: 30,
    data: resultList,
    align: ['center'],
    rowNum: 10,
    index: true,
    indexHeader: '排名',
    headerBGC: '',
    oddRowBGC: '',
    evenRowBGC: '',
    carousel: 'single'
  }
}
export default {
  components: {
    ChartCard,
    DataMap,
    CuredAndDeadRateChart,
    BasicDataItemLabel,
    BasicTrendChart,
    ProvinceRankingBarChart,
    CurrentConfirmedCompareBarChart,
    About,
    BasicProportionChart
  },
  data () {
    return {
      title: '新冠肺炎疫情数据分析',
      provinceTableDialogVisible: false,
      aboutDialogVisible: false,
      commonData: {},
      basicData: {
        currentConfirmedCount: 0,
        currentConfirmedIncr: 0,
        confirmedCount: 0,
        confirmedIncr: 0,
        curedCount: 0,
        curedIncr: 0,
        deadCount: 0,
        deadIncr: 0,
        sure: 0,
        sureAdd: 0,
        importedCount: 0,
        importedIncr: 0,
        noInFectCount: 0,
        noInFectIncr: 0,
        suspectCount: 0,
        suspectIncr: 0,
        updateTime: '-'
      },
      defaultDataConfig: initBasicConfig(),
      cureRateConfig: {
        data: [0],
        shape: 'round'
      },
      deadRateConfig: {
        data: [0],
        shape: 'round'
      },
      countryRankingTakeTurnChartConfig: {
        data: [],
        waitTime: 2000,
        unit: '单位',
        valueFormatter ({ value }) {
          const reverseNumber = (value + '').split('').reverse()
          let valueStr = ''

          while (reverseNumber.length) {
            const seg = reverseNumber.splice(0, 3).join('')
            valueStr += seg
            if (seg.length === 3) valueStr += ','
          }

          return valueStr.split('').reverse().join('')
        }
      },
      provinceConfirmedCountBoardConfig: initProvinceConfirmedCountBoardConfig(),
      provinceDataList: [],
      trendDataList: [],
      confirmedCountList: [],
      top10ProvinceData: {
        provinceList: [],
        valueList: []
      },
      basicIncrTrendData: {
        dateList: [],
        importedIncrDataList: [],
        currentConfirmedIncrDataList: []
      },
      confirmSingleBarChartData: {
        dateList: [],
        currentConfirmedCountList: [],
        confirmedCountList: []
      },
      rate: {
        curedRate: 0,
        deadRate: 0
      },
      areaData: {},
      mapDataList: []
    }
  },
  methods: {
    goToSentimentAnalysis() {
      this.$router.push('/sentiment-analysis')
    },
    queryBasicData () {
      let self = this
      covid19Service.getOverall().then((res) => {
        if (!res.success) {
          console.log('错误:' + res.info)
          return
        }
        self.basicData = res.data
        self.setBasicData(res.data)
      })
    },
    queryProvinceDataList () {
      let self = this
      covid19Service.getProvinceDataList().then((res) => {
        if (!res.success) {
          // TODO 错误处理...
          console.log('错误:' + res.info)
          return
        }
        self.provinceDataList = res.data
        self.setAreaChartData(res.data)
        // 设置累计排名数据
        self.setProvinceRankingData(res.data)
        // 设置各省累计确诊轮播表格数据
        self.setProvinceComfirmedCountBoardData(res.data)
        // 设置地图数据
        self.setMapData(res.data)
      })
    },
    queryTrendDataList () {
      let self = this
      covid19Service.getDailyList().then((res) => {
        if (!res.success) {
          // TODO 错误处理...
          console.log('错误:' + res.info)
          return
        }
        self.trendDataList = res.data
        // 重置图表数据
        self.setBasicIncrTrendData(res.data)
      })
    },
    setProvinceRankingData (areaList) {
      let provinceList = []
      let dataValueList = []
      for (let i = 0; i < 10; i++) {
        provinceList.push(areaList[i].provinceLabel)
        dataValueList.push(areaList[i].confirmedCount)
      }
      let data = {
        provinceList: provinceList,
        valueList: dataValueList
      }
      this.top10ProvinceData = data
    },
    setBasicIncrTrendData (data) {
      let dateList = []
      let currentConfirmedIncrList = []
      let importedIncrList = []

      let sevenDayDateList = []
      // 仅显示一周条数据
      let confirmedCountList = []
      let curedCountList = []
      // 仅获取7条数据
      let count = 7
      let noInFectDataList = []

      for (let i = data.currentConfirmedIncrList.length - 1; i >= 0; i--) {
        dateList.push(data.currentConfirmedIncrList[i][0])
        currentConfirmedIncrList.push(data.currentConfirmedIncrList[i][1])
      }
      for (let i = data.importedIncrList.length - 1; i >= 0; i--) {
        importedIncrList.push(data.importedIncrList[i][1])
      }
      for (let i = data.noInFectCountList.length - 1; i >= 0; i--) {
        noInFectDataList.push(data.noInFectCountList[i][1])
      }

      for (let i = count; i >= 0; i--) {
        if (confirmedCountList.length >= count) {
          break
        }
        sevenDayDateList.push(data.confirmedCountList[i][0])
        confirmedCountList.push(data.confirmedCountList[i][1])
      }
      for (let i = count; i >= 0; i--) {
        if (curedCountList.length >= count) {
          break
        }
        curedCountList.push(data.curedCountList[i][1])
      }

      this.basicIncrTrendData = {
        dateList: dateList,
        importedIncrDataList: importedIncrList,
        currentConfirmedIncrDataList: currentConfirmedIncrList,
        noInFectDataList: noInFectDataList
      }
      this.confirmSingleBarChartData = {
        dateList: sevenDayDateList,
        curedCountList: curedCountList,
        confirmedCountList: confirmedCountList
      }
    },
    setProvinceComfirmedCountBoardData (areaList) {
      let resultList = areaList.map(item => {
        return [item.provinceLabel, item.confirmedCount, item.curedCount, item.deadCount]
      })
      // 重新生成,否则无法刷新状态
      this.provinceConfirmedCountBoardConfig = initProvinceConfirmedCountBoardConfig(resultList)
    },
    setAreaChartData (areaList) {
      let confirmedCountList = []
      let provinceList = []
      let curedCountList = []
      let deadCountList = []
      areaList.forEach(item => {
        provinceList.push(item.provinceLabel)
        confirmedCountList.push(item.confirmedCount)
        curedCountList.push(item.curedCount)
        deadCountList.push(item.deadCount)
      })
      this.areaData = {
        provinceList: provinceList,
        confirmedCountList: confirmedCountList,
        curedCountList: curedCountList,
        deadCountList: deadCountList
      }
    },
    setMapData (dataList) {
      let list = dataList.map(item => {
        return {
          name: item.provinceLabel,
          value: item.confirmedCount
        }
      })
      this.mapDataList = list
    },
    provinceTableDialogShowHandler () {
      this.provinceTableDialogVisible = true
    },
    provinceTableDialogClose () {
      this.provinceTableDialogVisible = false
    },
    aboutDialogShowHandler () {
      this.aboutDialogVisible = true
    },
    aboutDialogClose () {
      this.aboutDialogVisible = false
    },
    setBasicData (data) {
      // 重新生成,否则视图不更新
      let config = initBasicConfig(data)
      this.defaultDataConfig = config
      // 处理治愈率和死亡率
      this.rate = {
        curedRate: data.curedRate / 100,
        deadRate: data.deadRate / 100
      }
    },
    startQueryData () {
      this.queryBasicData()
      this.queryProvinceDataList()
      this.queryTrendDataList()
    },
    initAllChart() {
      this.$refs.dataMap.initChart()
      this.$refs.cureRateChart.initChart()
      this.$refs.confirmedCountTrendChart.initChart()
      this.$refs.topConfirmedCountRankChart.initChart()
      this.$refs.confirmSingleBarChart.initChart()
      this.$refs.basicProportionChart.initChart()
    }
  },
  mounted () {
    this.initAllChart()
    this.startQueryData()

    let self = this
    // 定义定时器,隔 5 秒刷新一次
    this.timer = setInterval(() => {
      self.startQueryData()
    }, 5000)
  },
  beforeDestroy() {
    clearInterval(this.timer)
  }
}
</script>
<style>
/* 全局重置 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* 主容器 - 深色科技风 */
.container {
  position: relative;
  min-height: 100vh;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
  background-attachment: fixed;
  padding: 20px;
  font-family: 'Microsoft YaHei', Arial, sans-serif;
}

/* 标题区域 */
h1 {
  font-size: 42px;
  font-weight: 900;
  padding: 25px 30px;
  background: linear-gradient(90deg, #00d4ff 0%, #00a8ff 50%, #0077ff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 0 30px rgba(0, 212, 255, 0.3);
  letter-spacing: 3px;
  animation: glow 2s ease-in-out infinite alternate;
}

@keyframes glow {
  from {
    filter: drop-shadow(0 0 10px rgba(0, 212, 255, 0.5));
  }
  to {
    filter: drop-shadow(0 0 20px rgba(0, 212, 255, 0.8));
  }
}

.flex {
  display: flex;
}

/* 顶部区域 */
.top-header {
  position: relative;
  margin-bottom: 25px;
  background: rgba(15, 20, 43, 0.6);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  border: 1px solid rgba(0, 212, 255, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}

.top-header-tip {
  font-size: 15px;
  position: absolute;
  padding: 25px 30px;
  text-align: right;
  top: 0;
  right: 0;
  color: #00d4ff;
}

.title {
  min-width: 380px;
}

/* 卡片样式 - 渐变边框 */
.chart-card {
  background: rgba(15, 20, 43, 0.8);
  backdrop-filter: blur(15px);
  border-radius: 15px;
  margin: 0 20px;
  border: 2px solid transparent;
  background-image: 
    linear-gradient(rgba(15, 20, 43, 0.8), rgba(15, 20, 43, 0.8)),
    linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #4facfe 75%, #00f2fe 100%);
  background-origin: border-box;
  background-clip: padding-box, border-box;
  box-shadow: 0 10px 40px rgba(102, 126, 234, 0.2);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.chart-card::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: linear-gradient(
    45deg,
    transparent,
    rgba(102, 126, 234, 0.1),
    transparent
  );
  transform: rotate(45deg);
  animation: shimmer 3s infinite;
}

@keyframes shimmer {
  0% {
    transform: translateX(-100%) translateY(-100%) rotate(45deg);
  }
  100% {
    transform: translateX(100%) translateY(100%) rotate(45deg);
  }
}

.chart-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 50px rgba(102, 126, 234, 0.4);
}

.main-inner-map-wraper {
  height: 100%;
  margin: 0 20px;
}

.map {
  width: 99%;
  height: 840px;
  padding: 25px 15px 15px 15px;
  background: rgba(15, 20, 43, 0.6);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  border: 2px solid rgba(79, 172, 254, 0.3);
  box-shadow: inset 0 0 30px rgba(79, 172, 254, 0.1);
}

.province-scroll-board-wrapper {
  padding-top: 15px;
  padding-bottom: 15px;
}

.chart-item-bottom-sep {
  margin-bottom: 25px;
}

.sentiment-btn-wraper {
  position: fixed;
  bottom: 110px;
  right: 30px;
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 5px 25px rgba(79, 172, 254, 0.5);
  transition: all 0.3s ease;
  z-index: 1000;
}

.sentiment-btn-wraper:hover {
  transform: scale(1.1) rotate(-10deg);
  box-shadow: 0 8px 35px rgba(79, 172, 254, 0.8);
}

.sentiment-btn-wraper i {
  color: #fff;
  font-size: 32px !important;
}

.province-table-title {
  color: #00d4ff;
  font-size: 17px;
  font-weight: bold;
  padding: 15px 15px 15px 25px;
  text-align: left;
  text-shadow: 0 0 10px rgba(0, 212, 255, 0.5);
}

.basic-incr-trend-chart-wrapper {
  padding-bottom: 15px;
}

.sub-title,
.last-update-time,
.province-scroll-board-wrapper ::v-deep .dv-scroll-board .header,
.province-scroll-board-wrapper ::v-deep .dv-scroll-board .rows {
  font-size: 15px;
}

.province-scroll-board-wrapper ::v-deep .dv-scroll-board .rows {
  color: #a0d8ef;
}

.province-scroll-board-wrapper ::v-deep .dv-scroll-board .header {
  color: #00d4ff;
  font-weight: bold;
}

.province-data-modal-title {
  color: #1a1a2e;
  font-size: 22px;
  font-weight: bold;
}

.province-data-modal-update-time {
  color: #667eea;
  font-size: 16px;
  font-weight: normal;
  padding-top: 12px;
  display: block;
}

.cure-and-dead-rate-chart {
  display: flex;
  justify-content: space-around;
  padding: 10px;
}

.top-basic-info {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

/* 滚动排名渐变 */
.dv-scroll-ranking-board .ranking-column .inside-column {
  background: linear-gradient(90deg, #667eea, #764ba2, #f093fb, #4facfe);
  box-shadow: 0 0 15px rgba(102, 126, 234, 0.5);
}

.chart-item-container {
  margin: 0 12px;
}

/* 关于按钮 */
.about-wraper {
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 5px 25px rgba(102, 126, 234, 0.5);
  transition: all 0.3s ease;
  z-index: 1000;
}

.about-wraper:hover {
  transform: scale(1.1) rotate(10deg);
  box-shadow: 0 8px 35px rgba(102, 126, 234, 0.8);
}

.about-wraper i {
  color: #fff;
  font-size: 32px !important;
}

/* 主内容区域 */
.main-content {
  position: relative;
  z-index: 1;
}

/* 右侧区域 */
.main-right {
  padding: 0 10px;
}

/* 对话框样式优化 */
::v-deep .el-dialog {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

::v-deep .el-dialog__header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 15px 15px 0 0;
  padding: 20px;
}

::v-deep .el-dialog__title {
  color: #fff;
  font-weight: bold;
}

/* 表格样式 */
::v-deep .el-table {
  background: transparent;
  border-radius: 10px;
  overflow: hidden;
}

::v-deep .el-table th {
  background: rgba(102, 126, 234, 0.1);
  color: #667eea;
  font-weight: bold;
}

::v-deep .el-table tr:hover {
  background: rgba(102, 126, 234, 0.05);
}

/* 链接样式 */
::v-deep .el-link {
  transition: all 0.3s ease;
}

::v-deep .el-link:hover {
  color: #00f2fe !important;
  text-shadow: 0 0 10px rgba(0, 242, 254, 0.5);
}

/* 响应式优化 */
@media (max-width: 1200px) {
  h1 {
    font-size: 32px;
  }
  
  .chart-card {
    margin: 0 10px;
  }
}
</style>