<template>
  <div class="g-column">
    <div v-if="title" class="g-column-title">{{title}}</div>
    <g-column class="g-column"
      v-if="data"
      :data="data"
      :height="height"
      :config="columnConfig"
      :title="title">
    </g-column>
  </div>
</template>

<script>
import GColumn from './gColumn';
import { columnConfig } from '../g2Config';
// 柱状图
export default {
  name: 'XColumn',
  components: {
    GColumn,
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
    columnConfig: function() {
      return Object.assign({}, columnConfig, this.config);
    }
  }
}
</script>

<!-- <style lang="less" scoped>
@import "~@/assets/styles/variables.less";

.g-column {
  position: relative;
  .g-column-title {
    position: absolute;
    top: 12px;
    left: 12px;
    z-index: 10;
    color: @gray-base;
    font-size: 14px;
  }
}
</style> -->
