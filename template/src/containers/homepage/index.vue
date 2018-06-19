<template>
  <div>
    <el-alert
      title="成功提示的文案"
      type="success"
      show-icon
      :closable="true"
      @close="alertClose">
    </el-alert>
    <cd-panel title="今日数据" size="sm">
      <ul class="subfield-list">
        <li class="subfield-item" v-for="item in todayData" :key="item.title">
          <div class="subfield-item__title">{{ item.title }}</div>
          <div class="subfield-item__number">{{ item.number }}</div>
          <div class="subfield-item__subtitle">{{ item.subtitle }}: {{ item.total }}</div>
        </li>
      </ul>
    </cd-panel>

    <cd-panel title="按钮控制模态框示例" size="sm">
      <el-button type="primary" @click="openModalMd">打开模态框1</el-button>
      <el-button type="warning" @click="openModalLg">打开模态框2</el-button>
    </cd-panel>

    <el-row :gutter="24" v-if="isAdmin || isSuperAdmin">
      <el-col :span="10">
        <cd-panel title="付费订单" size="sm">
          <x-pie-chart
            :height="400"
            :data="payOrderData">
          </x-pie-chart>
          <pie-chart
            :height="400"
            :data="payOrderData"
            :config="pieConfig"
            :key="flag">
          </pie-chart>
        </cd-panel>
      </el-col>
      <el-col :span="14">
        <cd-panel title="付费订单" size="sm">
          <x-line-chart
            :height="400"
            :data="orderData">
          </x-line-chart>
        </cd-panel>
      </el-col>
    </el-row>
    <cd-modal size="md" ref="modal-md">
      <h3 slot="header">模态框1</h3>
      <div slot="body" class="cvp-text-center">
        <pre style="text-align: left;">{{ JSON.stringify(payOrderData, null, 2) }}</pre>
      </div>
      <div slot="footer" class="cvp-text-right">
        模态框footer
      </div>
    </cd-modal>
    <cd-modal size="sm" ref="modal-lg">
      <h3 slot="header">模态框2</h3>
      <div slot="body" class="cvp-text-center">
        <el-button type="primary" @click="message">提示消息示例</el-button>
      </div>
      <div slot="footer" class="cvp-text-right">
        模态框footer
      </div>
    </cd-modal>
  </div>
</template>

<script>
import G2 from 'g2';
import createG2 from '@/containers/components/g2';
import pieChart from '@/containers/components/g2/xPie/index.vue';

import { mapState, mapActions, mapGetters } from 'vuex';
// 处理
const XLineChart = createG2((chart, data) => {
  console.log(data);
  let Frame = G2.Frame;
  let frame = new Frame(data);
  frame = Frame.combinColumns(frame, ['newOrder', 'payOrder'], 'value', 'order', 'date');
  console.log('frame', frame)
  chart.source(frame, {
    date: {
      alias: '日期',
      type: 'time',
      mask: 'yyyy.mm.dd',
    },
    value: {
      alias: '订单数'
    }
  });
  chart.legend({
    position: 'bottom'
  });
  chart.line().position('date*value').color('order', ['#1f77b4', '#ff7f0e']).shape('spline').size(2);
  chart.render();
});

const XPieChart = createG2((chart, data) => {
  var Stat = G2.Stat;
  chart.source(data);
  chart.coord('theta', {
    radius: 1 // 设置饼图的大小
  });
  chart.legend('name', {
    position: 'bottom',
    itemWrap: true,
  });
  chart.intervalStack()
    .position(Stat.summary.percent('value'))
    .color('name')
    .label('name*..percent', function(name, percent) {
      percent = (percent * 100).toFixed(2) + '%';
      return name + ' ' + percent;
    });
  chart.render();
});

export default {
  components: {
    XLineChart,
    XPieChart,
    pieChart
  },
  data() {
    return {
      flag: false,
      pieConfig: {
        padding: [0, '20%', '20%', '20%'],
        legendConfig: {
          position: 'bottom' // 一定要和padding配合使用 
        },
      }
    }
  },
  created() {
  },
  computed: {
    ...mapState({
      todayData: state => state.homepage.todayData,
      orderData: state => state.homepage.orderData,
      payOrderData: state => state.homepage.payOrderData,
    }),
    ...mapGetters({
      isAdmin: 'isAdmin',
      isSuperAdmin: 'isSuperAdmin'
    })
  },
  methods: {
    ...mapActions('homepage', [
      'getTodayData',
      'getOrderStatistic',
      'getPayOrderStatistic'
    ]),
    openModalMd() {
      this.$refs['modal-md'].showModal();
    },
    openModalLg() {
      this.$refs['modal-lg'].showModal();
    },
    fetchData() {
      this.getTodayData().then((res) => {
        console.log('getTodayData', res);
      });
      this.getOrderStatistic().then((res) => {
        console.log('getOrderStatistic', res);
      });
      this.getPayOrderStatistic().then((res) => {
        console.log('getPayOrderStatistic', res);
        this.flag = !this.flag;
      });
    },
    alertClose(e) {
      console.log('alert被关闭了', e);
    },
    message() {
      this.$message({
        type: 'warning',
        message: '这是message的一个例子',
        showClose: true,
      });
    }
  }
}
</script>

<style lang="less" scoped>
.subfield-list {
  display: flex;
  padding-left: 0;
  margin: 0 auto;
}

.subfield-item {
  flex: 1;
  color: #616161;
  text-align: center;
  list-style: none;
  + .subfield-item {
    border-left: 1px solid #f5f5f5;
  }
  &__title {
    font-size: 14px;
    color: #313131;
    margin-top: 0;
  }
  &__number {
    font-size: 24px;
    display: block;
    color: #313131;
  }
  &__subtitle {
    color: #919191;
  }
}

</style>
