<template>
  <g-area
    v-if="data && data.length > 0"
    :data="data"
    :height="height"
    :config="areaConfig">
  </g-area>
</template>

<script>
import gArea from './gArea.js';
import { areaConfig } from '../g2Config';
// 面积图
export default {
  name: 'XArea',
  components: {
    gArea,
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
    areaConfig: function() {
      return Object.assign({}, areaConfig, this.config);
    }
  }
}
</script>
