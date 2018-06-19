<template>
  <div class="g-pie">
    <div class="g-pie-title" v-if="title">
      {{ title }}
    </div>
    <g-pie class="g2-pie-legend" 
      v-if="data"
      :data="data" 
      :height="height"
      :config="pieConfig" 
      title="这个是测试用的标题">
    </g-pie>
  </div>
</template>

<script>
import gPie from './gPie';
import { pieConfig } from '../g2Config';

// 饼状图，此次的封装是为了添加除了canvas以外的其他元素
export default {
  name: 'xPie',
  components: {
    gPie,
  },
  props: {
    height: {
      type: Number,
      default: 330,
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
  computed: {
    pieConfig : function() {
      return Object.assign({}, pieConfig, this.config);
    }
  },
  data() {
    return {
    }
  },
  created() {
  },
  methods: {
  }
}
</script>

<!-- <style lang="less" scoped>
@import "~@/assets/styles/variables.less";

  .g-pie {
    position: relative;
    .g-pie-title {
      position: absolute;
      top: 12px;
      left: 12px;
      z-index: 10;
      color: @gray-base;
      font-size: 14px;
    }
  }
</style> -->
