<template>
  <div class="cd-table" v-loading="isLoading" v-if="list">
    <el-table ref="table" :data="list.data" @sort-change="sortsChange" @expand-change='expandChange' :stripe="tableConfig.stripe" :default-sort="tableConfig['default-sort']" :cell-class-name="tableConfig['cell-class-name']" :show-header="tableConfig['show-header']" :highlight-current-row="tableConfig['highlight-current-row']">
      <el-table-column
        v-for="(column,index) in columns"
        :type="column.type"
        :prop="column.prop"
        :label="column.label"
        :sortable="column.sortable"
        :formatter="column.formatter"
        :width="column.width"
        :min-width="column['min-width']"
        :key="index">
      </el-table-column>
      <slot></slot>
			<slot name="scope"></slot>
			<slot name="expand"></slot>
		</el-table>

    <cd-pagination
      :total="list.paging.total"
			:limit="list.paging.limit"
			:offset="list.paging.offset"
			@current-change="changePage">
    </cd-pagination>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  props: {
    list: {
      required: true,
    },
    columns: {
      type: Array,
      required: true,
    },
    config: {
      type: Object,
      default() {
        return {};
      },
    },
    classrooms: {},
    expandRow: {}
  },
  data() {
    return {
      tableBaseConfig: {
        stripe: true,
        'show-header': true,
        'highlight-current-row': false,
        'show-summary': false,
      },
    };
  },
  computed: {
    ...mapState({
      isLoading: state => state.isLoading,
    }),
    tableConfig() {
      return Object.assign(this.tableBaseConfig, this.config);
    },
  },
  watch: {
    expandRow: function(oldVal, val) {
      if(oldVal !== val) {
        list.forEach(row => {
          if(row.id === val.id) {
            this.$refs.table.toggleRowSelection(row);
          } else {
            this.$refs.table.toggleRowSelection(row, false);
          }
        })
      }
    }
  },
  methods: {
    sortsChange(data) {
      this.$emit('sort-change', data);
    },
    changePage(offset) {
      this.$emit('changePage', offset);
    },
    expandChange(row) {
      this.$emit('expand-change', row);
    },
    getRowKey(row) {
      console.log(row);
    }
  },
  mounted() {
    console.log(this.cellClassName);
  }
}
</script>

<!-- <style lang="less">
  .el-table__row {
    transform: translate(0,0);
  }
</style> -->
