import createG2 from '../g2';
import BaseG2 from '../BaseG2';
class GArea extends BaseG2{
  constructor(chart, data, config) {
    super(chart, data, config);
  }

  setTooltip() {
    const tooltipConfig = Object.assign({
      crosshairs: {
        type: 'cross',
      }
    }, this.config.tooltipConfig);
    this.chart.tooltip(tooltipConfig);
  }

  setScale() {
    const scaleConfig = Object.assign({
      [this.key1]: {
        range: [0, 1]
      },
    }, this.config.scaleConfig);
    this.chart.scale(scaleConfig);
  }

  setPosition() {
    const key1 = this.key1;
    const key2 = this.key2;

    this.chart.area().position(`${key1}*${key2}`).color('#4591ec');
    this.chart.line().position(`${key1}*${key2}`).color('#4591ec');
  }
}

const gArea = createG2((chart, data, config) => {
  const gArea = new GArea(chart, data, config);
  gArea.init();

  return gArea;
})

export default gArea;