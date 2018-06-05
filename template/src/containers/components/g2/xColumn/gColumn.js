import createG2 from '../g2';
import BaseG2 from '../BaseG2';
// import DataSet from '@antv/data-set';

class GColumn extends BaseG2{
  constructor(chart, data, config) {
    super(chart, data, config);
    this.setInterval();
  }
  
  setPosition() {
    this.chart.intervalStack().position(`${this.key1}*${this.key2}`);
  }

  setInterval() {
    const geom = this.chart.interval().position(`${this.key1}*${this.key2}`)

    if(this.config.style) {
      geom.style(this.key2, this.config.style);
    }
  }
}

const gColumn = createG2(function(chart, data, config) {
  const column = new GColumn(chart, data, config);
  column.init();
});

export default gColumn;