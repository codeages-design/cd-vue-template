import createG2 from '../g2';
import BaseG2 from '../BaseG2';
import DataSet from '@antv/data-set';

class GPie extends BaseG2 {
  constructor(chart, data, config) {
    super(chart, data, config);
  }

  setSource() {
    const ds = new DataSet();
    const dv = ds.createView()
      .source(this.data)
      .transform({
        type: 'percent',
        field: this.key2,
        dimension: this.key1,
        as: 'percent'
      });
    this.chart.source(dv, this.config.scaleConfig || {});
    this.dv = dv;
  }

  settooltip() {
    this.chart.tooltip({
      showTitle: false, // 不展示标题
      itemTpl: '<li data-index={index}><span style="color:{color}">{name}: </span>{value}</li>'
    });
  }

  setLegend() {
    const config = this.config;
    const position = (config.legendConfig && config.legendConfig.position) || 'right';

    this.chart.coord('theta', {
      radius: 0.9
    });
    this.chart.legend({
      position,
      useHtml: true,
      container: `
          <div class="g2-pie-legend left g2-legend">
            <table class="g2-legend-list" style="list-style-type:none;margin:0;padding:0;"></table>
          </div>`,
      itemTpl: (value, color, checked, index) => {
        const obj = this.dv.rows[index];
        checked = checked ? 'checked' : 'unChecked';
        return `<tr class="g2-legend-list-item item-${index} ${checked}" data-value="${value}" data-color="${color}" style="cursor: pointer;font-size: 12px;">
          <td width=150 style="border: none;padding:0;">
            <i class="g2-legend-marker" style="width:10px;height:10px;display:inline-block;margin-right:10px;background-color:${color};"></i>
            <span class="g2-legend-text">${value}</span>
          </td>
          <td style="text-align: right;border: none;padding:0;">${obj[this.key2]}</td>
        </tr>`;
      },
    });
  }

  setPosition() {
    this.chart.intervalStack()
      .position('percent')
      .color(this.key1, [ '#67b7dc', '#84b761', '#fdd400', '#cc4748', '#cd82ad', '#2f4074', '#448e4d', '#b7b83f', '#b9783f' ]);
  }
}

const gPie = createG2(function(chart, data, config) {
  const pie = new GPie(chart, data, config);
  pie.init();
});

export default gPie;