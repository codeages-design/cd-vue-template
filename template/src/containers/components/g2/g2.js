import { Chart } from '@antv/g2';

// 创建唯一的 ID
let uniqueId = 0;
function generateUniqueId() {
  uniqueId += 1;
  return `el-g2-${uniqueId}`;
}

export default function createG2(__operation) {
  return {
    data() {
      return {
        chart: null,
        chartId: generateUniqueId(),
      };
    },
    props: {
      height: {
        type: Number,
        default: 300,
      },
      data: {
        type: Array,
        default: function() {
          return [];
        }
      },
      config: {
        type: Object,
        default: function() {
          return {};
        }
      },
      title: String,
    },
    watch: {
      data: function(newData, oldData) {
        if (oldData && newData) {
          this.chart.changeData(newData);
        }
      },
      height: function(val, oldVal) {
        if (oldVal && val) {
          this.chart.changeHeight(val);
        }
      },
    },
    mounted() {
      this.initChart();
    },
    beforeDestroy() {
      this.chart.destroy();
      this.chart = null;
      this.chartId = null;
    },
    methods: {
      initChart() {
        const { height, data } = this;
        const chart = new Chart({
          id: this.chartId, // 这里还是需要用id，或者是如下的container
          height,
          forceFit: true,
          background: {
            fill: '#fff',
          },
          padding: this.config.padding || 50,
        });
        
        this.chart = chart;
        __operation(chart, data, this.config);
      },
    },
    render(createElement) {
      return createElement('div', {
        attrs: {
          id: this.chartId,
        },
      });
    },
  };
}
