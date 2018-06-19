<template>
  <cd-table ref="table" class="courses-table" v-bind="{ 'list': { data: courseData, paging }, columns, config }" @changePage="currentChange">
    <!-- <el-table-column :width="180" v-if="isExpand"></el-table-column> -->
    <template slot="scope">
      <el-table-column label="操作" width="120">
        <template slot-scope="scope">
          <el-button @click="modifyData(scope.row.id, scope.$index)">修改数据</el-button>
        </template>
      </el-table-column>
    </template>
  </cd-table>
</template>

<script>
import { mapActions, mapState } from 'vuex';
export default {
  name: 'courseList',
  data() {
    return {
      columns: [
        { prop: 'id', label: '课程ID', sortable: true, width:"100" },
        { prop: 'title', label: '课程名', 'min-width': '300' },
        { prop: 'status', label: '课程名', width: "120", formatter: (row, column, cellValue, index) => this.$formatter.courseStatus(cellValue) },
        { prop: "minCoursePrice", label: "价格", width: "120", sortable: true },
        { prop: "type", label: "课程类型", width: "120", formatter: (row, column, cellValue, index) => this.$formatter.courseType(cellValue) },
        { prop: "studentNum", label: "学员数", width: "80" },
        { prop: "createdTime", label: "创建时间", width: "200", formatter: (row, column, cellValue, index) => this.$formatter.datetime(cellValue) },
      ],
      config: {
        'default-sort': {
          prop: 'id',
          order: 'ascending', 
        },
        'cell-class-name': ({ row, column, rowIndex, columnIndex }) => {
          if (columnIndex === 1) {
            return 'cvp-text-overflow';
          }
          if (columnIndex ===3 ) {
            return 'cvp-text-right cvp-padding-right-50';
          }
        },
      }
    }
  },
  computed: {
    ...mapState({
      courseData: state => state.course.courseSet,
      paging: state => state.course.paging
    })
  },
  created() {
  },
  methods: {
    ...mapActions('course', [
      'getCourses'
    ]),
    fetchData(params = {}) {
      this.getCourses(params).then((res) => {
        console.log('res', res);
      })
    },
    handleCurrentChange(val) {
      console.log('当前第', val, '页');
      this.fetchData({
        offset: (val - 1) * this.paging.limit,
      })
    },
    currentChange(val) {
      this.fetchData({
        offset: val,
      })
    }
  }
}
</script>
