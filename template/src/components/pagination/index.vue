<template>
  <div class="cvp-pagination cvp-text-right">
    <el-pagination
      v-if="totalPage"
      class="mt24 text-center"
      background
      layout="total, prev, pager, next, jumper"
      :total="total"
      :page-size="limitN"
      :current-page="currentPage"
      @current-change="changePage">
    </el-pagination>
  </div>
</template>

<script>
export default {
  props: ['total', 'limit', 'offset'],
  computed: {
    totalPage: function() {
      return Math.ceil(this.total / this.limit);
    },
    currentPage: function() {
      return parseInt(this.offset / this.limit) + 1;
    },
    limitN: function() {
      return parseInt(this.limit);
    }
  },
  methods: {
    changePage(currentPage) {
      const offset = this.limit * (currentPage - 1);
      this.$emit('current-change', offset);
    }
  }
}
</script>
