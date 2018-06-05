export const pieConfig = {
  padding: [0, '50%', 0, 0],
  legendConfig: {
    position: 'right' // 一定要和padding配合使用 
  },
  scaleConfig: {
    percent: {
      formatter: val => {
        val = (val * 100).toFixed(2) + '%';
        return val;
      }
    },
    nice: false
  }
}

// 柱状图
export const columnConfig = {
  padding: [62, 40, 100, 40]
}
// 面积图
export const areaConfig = {

};
// 折线图
export const lineConfig = {
  padding: [40, 40, 100, 40],
  toolTipConfig: {
    crosshairs: {
      type: 'line'
    }
  }
}