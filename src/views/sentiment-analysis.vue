<template>
  <div class="container">
    <!-- 顶部 -->
    <div class="top-header">
      <div class="title">
        <h1>{{ title }}</h1>
        <div class="top-header-tip">
          <div class="back-btn" @click="goBack">
            <i class="el-icon-back"></i> 返回主页
          </div>
        </div>
      </div>
    </div>
    
    <div class="main-content">
      <el-row :gutter="20">
        <!-- 词云分析区域 -->
        <el-col :span="12">
          <div class="chart-card">
            <div class="card-header">
              <h3>舆情分析 - 词云图</h3>
              <div class="slider-label">当前日期：{{ currentDate }}</div>
            </div>
            <div class="chart-content">
              <word-cloud-chart
                ref="wordCloudChart"
                :data="currentWordCloudData"
                :timeline="dateList"
                :seriesMap="wordCloudMap"
                :maxWords="50"
                :sizeRange="[14,50]"
                :rotationRange="[0,0]"
                :gridSize="16"
                style="width: 100%; height: 600px"
              />
            </div>
          </div>
        </el-col>
        
        <!-- 数据预测区域 -->
        <el-col :span="12">
          <div class="chart-card">
            <div class="card-header">
              <h3>数据增长预测</h3>
              <div class="prediction-info">
                <el-tag type="info">预测算法：LSTM</el-tag>
                <el-tag type="success" style="margin-left: 10px;">准确率：92.5%</el-tag>
              </div>
            </div>
            <div class="chart-content">
              <prediction-chart
                ref="predictionChart"
                :data="predictionData"
                style="width: 100%; height: 600px"
              />
            </div>
          </div>
          
          <!-- 预测指标卡片 -->
          <div class="prediction-metrics">
            <el-row :gutter="15">
              <el-col :span="8" v-for="(metric, index) in predictionMetrics" :key="index">
                <div class="metric-card">
                  <div class="metric-icon" :style="{ background: metric.color }">
                    <i :class="metric.icon"></i>
                  </div>
                  <div class="metric-info">
                    <div class="metric-label">{{ metric.label }}</div>
                    <div class="metric-value">{{ metric.value }}</div>
                    <div class="metric-trend" :style="{ color: metric.trendColor }">
                      <i :class="metric.trendIcon"></i> {{ metric.trend }}
                    </div>
                  </div>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import PredictionChart from '../components/temp/prediction-chart.vue';
import WordCloudChart from '../components/temp/word-cloud-chart.vue';

export default {
  name: 'SentimentAnalysis',
  components: {
    WordCloudChart,
    PredictionChart
  },
  data() {
    return {
      title: '新冠肺炎舆情分析与预测',
      dateIndex: 6,
      dateList: [
        '2024-10-18',
        '2024-10-19',
        '2024-10-20',
        '2024-10-21',
        '2024-10-22',
        '2024-10-23',
        '2024-10-24'
      ],
      wordCloudDataList: [
        // Mock数据 - 不同日期的词云数据
        [
          { name: '疫情防控', value: 1500 },
          { name: '核酸检测', value: 1200 },
          { name: '隔离', value: 1100 },
          { name: '疫苗接种', value: 1000 },
          { name: '健康码', value: 900 },
          { name: '社区防疫', value: 850 },
          { name: '医护人员', value: 800 },
          { name: '志愿者', value: 750 },
          { name: '物资保障', value: 700 },
          { name: '居家隔离', value: 650 }
        ],
        [
          { name: '疫苗', value: 1600 },
          { name: '防控措施', value: 1300 },
          { name: '核酸', value: 1150 },
          { name: '确诊病例', value: 1050 },
          { name: '治愈', value: 950 },
          { name: '医疗资源', value: 900 },
          { name: '防护', value: 850 },
          { name: '抗疫', value: 800 },
          { name: '封控', value: 750 },
          { name: '健康', value: 700 }
        ],
        [
          { name: '新增病例', value: 1400 },
          { name: '疫情', value: 1250 },
          { name: '防疫', value: 1100 },
          { name: '医院', value: 1000 },
          { name: '口罩', value: 920 },
          { name: '消毒', value: 880 },
          { name: '体温', value: 830 },
          { name: '病毒', value: 780 },
          { name: '传播', value: 730 },
          { name: '预防', value: 680 }
        ],
        [
          { name: '治疗方案', value: 1550 },
          { name: '疫情形势', value: 1280 },
          { name: '防控', value: 1120 },
          { name: '患者', value: 1020 },
          { name: '康复', value: 940 },
          { name: '医疗', value: 890 },
          { name: '病床', value: 840 },
          { name: '重症', value: 790 },
          { name: '症状', value: 740 },
          { name: '药物', value: 690 }
        ],
        [
          { name: '疫情数据', value: 1480 },
          { name: '防疫政策', value: 1220 },
          { name: '检测', value: 1080 },
          { name: '疫苗研发', value: 980 },
          { name: '免疫', value: 910 },
          { name: '防护服', value: 860 },
          { name: '医疗队', value: 810 },
          { name: '救治', value: 760 },
          { name: '隔离点', value: 710 },
          { name: '疫情通报', value: 670 }
        ],
        [
          { name: '疫情防控', value: 1520 },
          { name: '核酸检测', value: 1240 },
          { name: '接种疫苗', value: 1090 },
          { name: '健康监测', value: 990 },
          { name: '防疫措施', value: 920 },
          { name: '医疗救治', value: 870 },
          { name: '抗疫精神', value: 820 },
          { name: '疫情态势', value: 770 },
          { name: '防控成果', value: 720 },
          { name: '复工复产', value: 680 }
        ],
        [
          { name: '疫情防控', value: 1580 },
          { name: '动态清零', value: 1300 },
          { name: '核酸筛查', value: 1130 },
          { name: '疫苗加强针', value: 1030 },
          { name: '精准防控', value: 950 },
          { name: '流调溯源', value: 900 },
          { name: '医疗保障', value: 850 },
          { name: '疫情监测', value: 800 },
          { name: '常态化防控', value: 750 },
          { name: '抗疫一线', value: 700 }
        ]
      ],
      predictionData: {
        dateList: [],
        actualData: [],
        predictedData: []
      },
      predictionMetrics: [
        {
          label: '预测峰值',
          value: '12,450',
          trend: '+8.5%',
          trendColor: '#ff4757',
          trendIcon: 'el-icon-top',
          icon: 'el-icon-s-data',
          color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
        },
        {
          label: '预测日期',
          value: '11-05',
          trend: '15天后',
          trendColor: '#ffa502',
          trendIcon: 'el-icon-time',
          icon: 'el-icon-date',
          color: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
        },
        {
          label: '增长趋势',
          value: '上升',
          trend: '+3.2%/天',
          trendColor: '#ff6348',
          trendIcon: 'el-icon-top',
          icon: 'el-icon-s-marketing',
          color: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
        }
      ]
    }
  },
  computed: {
    currentDate() {
      return this.dateList[this.dateIndex]
    },
    currentWordCloudData() {
      return this.wordCloudDataList[this.dateIndex]
    },
    wordCloudMap() {
      const map = {}
      this.dateList.forEach((d, idx) => {
        map[d] = this.wordCloudDataList[idx] || []
      })
      return map
    }
  },
  methods: {
    goBack() {
      this.$router.push('/')
    },
    initPredictionData() {
      // Mock预测数据
      const dates = []
      const actual = []
      const predicted = []
      
      // 生成过去30天的实际数据
      for (let i = 30; i >= 0; i--) {
        const date = new Date()
        date.setDate(date.getDate() - i)
        dates.push(`${date.getMonth() + 1}-${date.getDate()}`)
        
        // 实际数据（带一些随机波动）
        const baseValue = 8000 + Math.sin(i / 5) * 1000
        actual.push(Math.floor(baseValue + Math.random() * 500))
      }
      
      // 生成未来15天的预测数据
      for (let i = 1; i <= 15; i++) {
        const date = new Date()
        date.setDate(date.getDate() + i)
        dates.push(`${date.getMonth() + 1}-${date.getDate()}`)
        
        // 预测数据（呈上升趋势）
        const predictValue = 9000 + i * 150 + Math.sin(i / 3) * 300
        predicted.push(Math.floor(predictValue))
        actual.push(null) // 未来的实际数据为null
      }
      
      this.predictionData = {
        dateList: dates,
        actualData: actual,
        predictedData: [
          ...new Array(31).fill(null),
          ...predicted
        ]
      }
    },
    initCharts() {
      this.$refs.wordCloudChart.initChart()
      this.$refs.predictionChart.initChart()
    }
  },
  mounted() {
    this.initPredictionData()
    this.$nextTick(() => {
      this.initCharts()
    })
  }
}
</script>

<style scoped>
/* 继承主页面样式 */
.container {
  position: relative;
  min-height: 100vh;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
  background-attachment: fixed;
  padding: 20px;
  font-family: 'Microsoft YaHei', Arial, sans-serif;
}

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
  position: absolute;
  top: 50%;
  right: 30px;
  transform: translateY(-50%);
}

.back-btn {
  padding: 10px 25px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #fff;
  border-radius: 25px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  transition: all 0.3s ease;
  box-shadow: 0 5px 15px rgba(102, 126, 234, 0.3);
}

.back-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.5);
}

.chart-card {
  background: rgba(15, 20, 43, 0.8);
  backdrop-filter: blur(15px);
  border-radius: 15px;
  margin-bottom: 25px;
  border: 2px solid transparent;
  background-image: 
    linear-gradient(rgba(15, 20, 43, 0.8), rgba(15, 20, 43, 0.8)),
    linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #4facfe 75%, #00f2fe 100%);
  background-origin: border-box;
  background-clip: padding-box, border-box;
  box-shadow: 0 10px 40px rgba(102, 126, 234, 0.2);
  transition: all 0.3s ease;
  overflow: hidden;
}

.chart-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 50px rgba(102, 126, 234, 0.4);
}

.card-header {
  padding: 20px 25px;
  border-bottom: 1px solid rgba(0, 212, 255, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-header h3 {
  color: #00d4ff;
  font-size: 20px;
  font-weight: bold;
  text-shadow: 0 0 10px rgba(0, 212, 255, 0.5);
  margin: 0;
}

.date-slider-wrapper {
  display: flex;
  align-items: center;
}

.slider-label {
  color: #a0d8ef;
  font-size: 14px;
  white-space: nowrap;
}

.prediction-info {
  display: flex;
  align-items: center;
}

.chart-content {
  padding: 20px;
}

.prediction-metrics {
  margin-top: 25px;
}

.metric-card {
  background: rgba(15, 20, 43, 0.9);
  backdrop-filter: blur(15px);
  border-radius: 12px;
  padding: 20px;
  border: 1px solid rgba(102, 126, 234, 0.2);
  display: flex;
  align-items: center;
  transition: all 0.3s ease;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
}

.metric-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 30px rgba(102, 126, 234, 0.3);
}

.metric-icon {
  width: 50px;
  height: 50px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.metric-icon i {
  font-size: 24px;
  color: #fff;
}

.metric-info {
  flex: 1;
}

.metric-label {
  color: #a0d8ef;
  font-size: 13px;
  margin-bottom: 5px;
}

.metric-value {
  color: #00d4ff;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 5px;
}

.metric-trend {
  font-size: 12px;
  display: flex;
  align-items: center;
}

.metric-trend i {
  margin-right: 5px;
}

/* Element UI 样式覆盖 */
::v-deep .el-slider__runway {
  background-color: rgba(102, 126, 234, 0.2);
}

::v-deep .el-slider__bar {
  background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
}

::v-deep .el-slider__button {
  border-color: #667eea;
  background-color: #fff;
}

::v-deep .el-slider__marks-text {
  color: #a0d8ef;
  font-size: 12px;
}

::v-deep .el-tag {
  border: none;
  font-weight: bold;
}
</style>