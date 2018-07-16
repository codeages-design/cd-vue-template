import DataSet from '@antv/data-set';
// 等这次
export default class BaseG2 {
  constructor(chart, data, config) {
    this.chart = chart;
    this.data = data;
    this.config = config;
    this.key1 = '';
    this.key2 = '';
    this.number = 0;  // 为了区分多条和单条折线图
    this.yKey = '';  // 规定多种数据时，采用'yKey'的值
    this.yVal = '';  // 规定多种数据时，采用'yVal'的值
    this.setData();
  }

  setData() {
    for(let value in this.data[0]) {
      this.number++;
      this[`key${this.number}`] = value;
    }

    if(this.number <= 2) {
      this.yKey = this.key2;
    }
  }

  init() {
    this.setSource();
    this.setScale();
    this.setLegend();
    this.setAxis();
    this.setTooltip();
    this.setEvents();
    if (this.setCoord && typeof this.setCoord === 'function') {
      this.setCoord();
    }
    if (this.setPosition && typeof this.setPosition === 'function') {
      this.setPosition();
    }
    this.done();
  }

  /*
   * 配置图形的数据源
   * https://antv.alipay.com/zh-cn/g2/3.x/api/chart.html#_source
  */
  setSource() { 
    const number = this.number;
    if(number >= 3) {
      // 处理折线图等有多条折线图的情况
      const ds = new DataSet();
      const dv = ds.createView().source(this.data);
      const fields = [];

      this.yKey = 'yKey';
      this.yVal = 'yVal'; // 数据项超过2个时，将多个项目合并后统一命名为yVal
      for(let i = 2;i <= number; i++) {
        fields.push(this[`key${i}`]);
      }
      
      dv.transform({
        type: 'fold',
        fields,
        key: this.yKey,
        value: this.yVal,
      });
      this.chart.source(dv, {
        [this.key1]: {
          range: [0, 1]
        }
      });
    } else {
      this.chart.source(this.data);
    }
  }

  /*
   * 对指定的数据字段进行列定义
   * https://antv.alipay.com/zh-cn/g2/3.x/api/chart.html#_scale
  */
  setScale() {
    if(this.config.scaleConfig) {
      this.chart.scale(this.config.scaleConfig || {});
    }
  }
  
  /*
   * 配置坐标轴
   * https://antv.alipay.com/zh-cn/g2/3.x/api/chart.html#_axis
  */
  setAxis() {
    const axisConfig = this.config.axisConfig;
    if(axisConfig) {
      for (const key in axisConfig) {
        this.chart.axis(key, axisConfig[key]);
      }
    }
  }

  /*
   * 配置图例
   * https://antv.alipay.com/zh-cn/g2/3.x/api/chart.html#_legend
  */
  setLegend() {
    const legendConfig = this.config.legendConfig;
    if(legendConfig) {
      for(const filed in legendConfig) {
        this.chart.legend(filed, legendConfig[filed] || {});
      }
    }
  }

  /*
   * 配置鼠标移到图形上时的弹层
   * https://antv.alipay.com/zh-cn/g2/3.x/api/chart.html#_tooltip
  */
  setTooltip() {
    if (this.config.tooltipConfig) {
      this.chart.tooltip(this.config.tooltipConfig || {});
    }
  }

  setEvents() {
    // 注册事件
    if(this.config['event']) {
      for(const name in this.config['event']) {
        this.chart.on(name, this.config['event'][name])
      }
    }
  }

  done() {
    this.chart.render();
  }
}