<template>
  <div>
    <el-form :model="model" :inline="isInline" :ref="formName" :rules="rules" :label-position="labelPosition " :label-width="labelWidth">
      <el-form-item v-for="(itemData,index) in formItem" :key="index" :class="itemData.className" :label="itemData.label ? `${ itemData.label}：` : ''" :prop="itemData.prop" :label-width="isInline ?'auto':(itemData.labelWidth ? itemData.labelWidth : labelWidth)" :required="itemData.required ? true : false">
        <el-col v-if="!itemData.children" :span="itemData.colSpan ? itemData.colSpan : colSpan" :offset="itemData.colOffset ? itemData.colOffset : 0">
          <FormControl :data="itemData" :model="model"></FormControl>
        </el-col>
        <el-col v-else v-for="(childrenItemData,childrenItemIndex) in itemData.children" :key="childrenItemIndex" :class="childrenItemData.className" :span="childrenItemData.colSpan ? childrenItemData.colSpan : colSpan" :offset="childrenItemData.colOffset ? childrenItemData.colOffset : 0">
          <el-form-item :prop="childrenItemData.prop" :class=" childrenItemData.noRequired ? 'no-required': '' ">
            <FormControl :data="childrenItemData" :model="model"></FormControl>
          </el-form-item>
        </el-col>
      </el-form-item>
      <slot name="el-form-item">
      </slot>
      <el-form-item class="buttons" :label-width="labelWidth" v-if="buttons && buttons.length ">
        <el-button v-for="(button,index) in buttons" :key="index" :type="button.type" :loading="button.loading" :disabled="button.disabled ? button.disabled : false" :class="button.class" @click="handleButton(button.method)">
          {{button.text}}
        </el-button>
      </el-form-item>
      <slot name="el-form-item-buttons-after">
      </slot>
    </el-form>
  </div>
</template>

<script>
import FormControl from './form-control';
export default {
  name: 'Form',
  props: {
    isInline: {
      type: Boolean,
      default: false
    },
    labelWidth: {
      type: String,
      default: '120px'
    },
    labelPosition: {
      type: String,
      default: 'right'
    },
    colSpan: {
      type: Number,
      default: 24,
    },
    formName: {
      type: String,
      default: ''
    },
    model: {
      type: Object,
      default: null
    },
    rules: {
      type: Object,
      default: null
    },
    formItem: {
      type: Array,
      default: null
    },
    buttons: {
      type: Array,
      default: null
    }
  },
  components: {
    FormControl,
  },
  methods: {
    handleButton(method) {
      method(this.$refs[this.formName], this.model);
      
    }
  }
}
</script>
