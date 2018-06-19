<template>
  <div class="x-line">
    <!-- <div class="g-pie-title" v-if="title">
      {{ title }}
    </div> -->
    <g-line
      v-if="data"
      :data="data" 
      :height="height"
      :config="lineConfig">
    </g-line>
  </div>
</template>

<script>
import gLine from './gLine';
import { lineConfig } from '../g2Config';

// 折线图，此次的封装是为了添加除了canvas以外的其他元素
export default {
  name: 'xLine',
  components: {
    gLine,
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
    lineConfig : function() {
      return Object.assign({}, lineConfig, this.config);
    }
  },
  data() {
    return {
    }
  },
}
</script>