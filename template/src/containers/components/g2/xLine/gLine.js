import createG2 from '../g2';
import BaseG2 from '../BaseG2';

class GLine extends BaseG2 {
  constructor(chart, data, config) {
    super(chart, data, config);
  }

  setPosition() {
    if(this.yVal) {
      this.chart.line().position(`${this.key1}*${this.yVal}`).color(this.yKey);
      this.chart.point().position(`${this.key1}*${this.yVal}`).color(this.yKey).size(4).shape('circle').style({
        stroke: '#000',
        lineWidth: 1
      });
    } else {
      this.chart.line().position(`${this.key1}*${this.key2}`);
      this.chart.point().position(`${this.key1}*${this.key2}`).size(4).style({
        stroke: '#000',
        lineWidth: 1
      });
    }
  }
}

const gLine = createG2(function(chart, data, config) {
  const gLine = new GLine(chart, data, config);
  gLine.init();

  return gLine;
});

export default gLine;