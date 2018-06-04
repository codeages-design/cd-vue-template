<template>
  <div class="form-control">
    <el-input v-if="(data.type==='input' || data.type==='password'|| data.type==='textarea' ) "
      :type="data.type"
      v-model="model[data.prop]"
      :readonly="data.readonly ? true : false"
      :placeholder="data.placeholder ? data.placeholder : '请输入'"
      :disabled="data.disabled ? data.disabled : false"
      @change="handleChangeInputs(data.changeName)"
     >
    </el-input>

    <el-date-picker v-if="data.type==='date'"
      v-model="model[data.prop]"
      :editable="data.editable ? false : true"
      :placeholder="data.placeholder ? data.placeholder : '请选择'"
      :value-format="data.options.valueFormat"
      :type="data.options.type"
      :picker-options="data.options.pickerOptions"
      :format="data.options.format"
      @change="(value)=>{handleChangeDatePicker(value,data.prop, data.changeDatePicker)}">
    </el-date-picker>

    <el-cascader
      clearable
      filterable
      change-on-select
      v-if="data.type==='cascader'"
      v-model="model[data.prop]"
      :options="data.options"
      :props="cascaderProps"
      :placeholder="data.placeholder ? data.placeholder : '请选择'"
      @change="handleChangeSelect(data.changeName)">
    </el-cascader>

    <el-select
      v-if="data.type==='select'"
      v-model="model[data.prop]"
      size="small"
      :filterable="data.filterable ? false : true"
      :clearable="data.clearable ? false : true"
      :multiple="data.multiple ? data.multiple : false"
      :placeholder="data.placeholder ? data.placeholder : '请选择'"
      @change="handleChangeSelect(data.changeName)"
      :disabled="data.disabled ? data.disabled : false"
      >
      <el-option
        v-for="(item,index) in data.options"
        :key="index"
        :label="data.optionsProps ? item[data.optionsProps.name] : item.name "
        :value="data.optionsProps ? item[data.optionsProps.id] : item.id">
      </el-option>
    </el-select>

    <!--@TODO  区分radio 和 radioGroup-->
    <el-radio-group
      v-if="data.type==='radio'"
      v-model="model[data.prop]">
      <el-radio
        v-for="(item,index) in data.options"
        :key="index"
        :label="item.label">
        {{item.name}}
      </el-radio>
    </el-radio-group>

    <el-checkbox-group
      v-if="data.type==='checkboxGroup'"
      v-model="model[data.prop]">
      <el-checkbox
        v-for="(item,index) in data.options"
        :label="item.optionsProps ? item[item.optionsProps.id]: item.id"
        :key="index"
        :disabled="item.isdisabled" >{{!item.optionsProps ? item.name : item[item.optionsProps.name] }}
      </el-checkbox>

    </el-checkbox-group>

    <el-checkbox
      v-if="data.type==='checkbox'"
      v-model="model[data.prop]"
      :disabled="data.disabled ? data.disabled : false"
      @change="changeChecked(data.changeName)">{{ data.labelStr }}
    </el-checkbox>

    <div v-if="data.type==='static'" v-html="data.prop" ></div>
  </div>
</template>

<script>
  export default {
    name: 'FormItemControl',
    props: {
      data: {
        type: Object,
        default: {}
      },
      model: {
        type: Object,
        default: {}
      },
      cascaderProps: {
        type: Object,
        default: function() {
          return {
            value: 'id',
            label: 'name',
          }
        }
      },
      checked: {
        type: Boolean,
        default: false
      },
    },
    methods: {
      changeChecked(changeName) {
        if (changeName) {
          changeName();
        }
      },
     handleChangeInputs(changeName){
       if(changeName) {
         changeName();
       }
     },
      handleChangeSelect(changeName) {
        if (changeName) {
          changeName();
        }
      },
      handleChangeDatePicker(value, prop, change){
        //bug for  element ui 2.0
        // if(value  === this.model[prop]){
        //   return
        // }
        // this.model[prop] = value;
        if (change) {
          change();
        }
      }
    }
  }
</script>
