<template>
  <!-- 此为 demo，可以参照复制粘贴使用 -->
  <el-form ref="form" :rules="rules" :model="form" label-width="80px">
    <el-form-item label="活动名称">
      <el-input v-model="form.name"></el-input>
    </el-form-item>
    <el-form-item label="活动区域">
      <el-select v-model="form.region" placeholder="请选择活动区域">
        <el-option label="区域一" value="shanghai"></el-option>
        <el-option label="区域二" value="beijing"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="活动时间">
      <el-col :span="11">
        <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
      </el-col>
      <el-col class="line" :span="2">-</el-col>
      <el-col :span="11">
        <el-time-picker type="fixed-time" placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
      </el-col>
    </el-form-item>
    <el-form-item label="即时配送">
      <el-switch v-model="form.delivery"></el-switch>
    </el-form-item>
    <el-form-item label="活动性质">
      <el-checkbox-group v-model="form.type">
        <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
        <el-checkbox label="地推活动" name="type"></el-checkbox>
        <el-checkbox label="线下主题活动" name="type"></el-checkbox>
        <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
      </el-checkbox-group>
    </el-form-item>
    <el-form-item label="特殊资源">
      <el-radio-group v-model="form.resource">
        <el-radio label="线上品牌商赞助"></el-radio>
        <el-radio label="线下场地免费"></el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="活动形式">
      <el-input type="textarea" v-model="form.desc"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">立即创建</el-button>
      <el-button>取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  export default {
    data() {
      let positiveInteger = (rule, value, callback) => {
        let re = /^[1-9]\d*$/ 
        if(!re.test(value)){
          return callback(new Error('请输入正整数'));
        }
        callback();
      };

      let integer = (rule, value, callback) => {
        let re = /^[0-9]\d*$/
        if(!re.test(value)){
          return callback(new Error('请输入整数'));
        }
        callback();
      };

      let unique = (rule, value, callback) => {
        if(this.isUniqueRule(value)){
          callback();
        }
        return callback(new Error('答对数已经存在！'));
      };

      let legal = (rule, value, callback) => {
        if(value > this.total){
          return callback(new Error('请输入小于总题数的参数'));
        }
        callback();
      };
      return {
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        rules: {
          right_num: [
            { required: true, message: '请输入答对数', trigger: 'blur' },
            { validator: integer, trigger: 'change' },
            { validator: unique, trigger: 'change' },
            { validator: legal, trigger: 'change' }
          ],
          name: [
            { required: true, message: '请输入称呼', trigger: 'change' },
            { min: 2, max: 6, message: '长度在 2 到 6 个字符', trigger: 'blur' }
          ],
          coupon_price:[
            { required: true, message: '请输入优惠金额', trigger: 'blur' },
            { validator: positiveInteger, trigger: 'change' },
            { min: 1, max: 5, message: '请输入小于100000正整数', trigger: 'blur' }
          ],
          day:[
            { required: true, message: '请输入有效期', trigger: 'blur' },
            { validator: positiveInteger, trigger: 'change' },
            { min: 1, max: 5, message: '请输入小于100000正整数', trigger: 'blur' }
          ],
          source_name:[
            { required: true, message: '请输入课程名称', trigger: 'change' }
          ]
        },
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      }
    }
  }
</script>