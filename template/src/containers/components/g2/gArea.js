import createG2 from './g2';

const gArea = createG2((chart, data, config) => {
  let key1, key2;
  for(const item in data[0]) {
    if(key1) {
      key2 = item;
    } else {
      key1 = item;
    }
  }
  // data
  chart.source(data);

  // tooltip
  const tooltipConfig = Object.assign({
    crosshairs: {
      type: 'cross',
    }
  }, config.tooltipConfig);
  chart.tooltip(tooltipConfig);
  
  // axis
  const axisConfig = config.axisConfig;
  for (const key in axisConfig) {
    chart.axis(key, axisConfig[key]);
  }

  // scale
  const scaleConfig = Object.assign({
    [key1]: {
      range: [0, 1]
    },
  }, config.scaleConfig);
  chart.scale(scaleConfig);

  // 图形类型制作
  chart.area().position(`${key1}*${key2}`).color('#4591ec');
  chart.line().position(`${key1}*${key2}`).color('#4591ec');

  // 注册事件
  if(config['event']) {
    for(const name in config['event']) {
      chart.on(name, config['event'][name])
    }
  }
  // render
  chart.render();
});

export default gArea;