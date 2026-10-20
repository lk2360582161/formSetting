<template>
  <a-form v-bind="formProps" @finish="handleFinish">
    <a-row :gutter="24">
      <a-col 
        v-for="item in formItems" 
        :key="item.id" 
        :span="item.span || 24"
      >
        <a-form-item
          :label="item.label"
          :name="item.field"
          :rules="getRules(item)"
        >
          <RenderComponent :item="item" />
        </a-form-item>
      </a-col>
    </a-row>
    
    <a-form-item>
      <a-button type="primary" html-type="submit">提交</a-button>
    </a-form-item>
  </a-form>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { message } from 'ant-design-vue';
import RenderComponent from './components/RenderComponent.vue';
import type { FormItem, FormConf } from '@/types/form';

const props = defineProps<{
  formItems: FormItem[];
  formConf: FormConf;
}>();

const formProps = computed(() => ({
  layout: props.formConf.layout,
  size: props.formConf.size,
  labelAlign: props.formConf.labelAlign,
  labelCol: { style: { width: `${props.formConf.labelWidth}px` } }
}));

const getRules = (item: FormItem) => {
  if (!item.required) return [];
  return [{ required: true, message: `${item.label}不能为空` }];
};

const handleFinish = (values: any) => {
  message.success('提交成功！');
  console.log(values);
};
</script>