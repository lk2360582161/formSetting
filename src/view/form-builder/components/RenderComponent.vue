<template>
  <div class="render-component">
    <!-- Input -->
    <a-row :gutter="24" v-if="item.type === 'input'">
      <a-col :span="item.span || 6">
        <a-input
          v-bind="bindProps"
          :value="item.defaultValue"
          :disabled="disabled"
        />
      </a-col>
    </a-row>

    <a-row :gutter="24" v-else-if="item.type === 'textarea'">
      <a-col :span="item.span || 6">
        <!-- Textarea -->
        <a-textarea
          v-bind="bindProps"
          :value="item.defaultValue"
          :disabled="disabled"
        />
      </a-col>
    </a-row>
    <a-row :gutter="24" v-else-if="item.type === 'password'">
      <a-col :span="item.span || 6">
        <!-- Password -->
        <a-input-password
          v-bind="bindProps"
          :value="item.defaultValue"
          :disabled="disabled"
        />
      </a-col>
    </a-row>
    <a-row :gutter="24" v-else-if="item.type === 'number'">
      <a-col :span="item.span || 6">
        <!-- Number -->
        <a-input-number
          v-bind="bindProps"
          :value="item.defaultValue"
          :disabled="disabled"
          style="width: 100%"
        />
      </a-col>
    </a-row>
    <a-row :gutter="24" v-else-if="item.type === 'select'">
      <a-col :span="item.span || 6">
        <!-- Select -->
        <a-select
          v-bind="bindProps"
          :value="item.defaultValue"
          :disabled="disabled"
          style="width: 100%"
        >
          <a-select-option
            v-for="opt in item.options"
            :key="opt.value"
            :value="opt.value"
          >
            {{ opt.label }}
          </a-select-option>
        </a-select>
      </a-col>
    </a-row>
    <a-row :gutter="24" v-else-if="item.type === 'radio'">
      <a-col :span="item.span || 6">
        <!-- Radio -->
        <a-radio-group
          v-bind="bindProps"
          :value="item.defaultValue"
          :disabled="disabled"
        >
          <a-radio
            v-for="opt in item.options"
            :key="opt.value"
            :value="opt.value"
          >
            {{ opt.label }}
          </a-radio>
        </a-radio-group>
      </a-col>
    </a-row>
    <a-row :gutter="24" v-else-if="item.type === 'checkbox'">
      <a-col :span="item.span || 6">
        <!-- Checkbox -->
        <a-checkbox-group
          v-bind="bindProps"
          :value="item.defaultValue"
          :disabled="disabled"
        >
          <a-checkbox
            v-for="opt in item.options"
            :key="opt.value"
            :value="opt.value"
          >
            {{ opt.label }}
          </a-checkbox>
        </a-checkbox-group>
      </a-col>
    </a-row>
    <a-row :gutter="24" v-else-if="item.type === 'switch'">
      <a-col :span="item.span || 6">
        <!-- Switch -->
        <a-switch
          v-bind="bindProps"
          :checked="item.defaultValue"
          :disabled="disabled"
        />
      </a-col>
    </a-row>
    <a-row :gutter="24" v-else-if="item.type === 'date'">
      <a-col :span="item.span || 6">
        <!-- Date -->
        <a-date-picker
          v-bind="bindProps"
          :value="item.defaultValue"
          :disabled="disabled"
          style="width: 100%"
        />
      </a-col>
    </a-row>
    <a-row :gutter="24" v-else-if="item.type === 'dateRange'">
      <a-col :span="item.span || 6">
        <!-- DateRange -->
        <a-range-picker
          v-bind="bindProps"
          :value="item.defaultValue"
          :disabled="disabled"
          style="width: 100%"
        />
      </a-col>
    </a-row>
    <a-row :gutter="24" v-else-if="item.type === 'time'">
      <a-col :span="item.span || 6">
        <!-- Time -->
        <a-time-picker
          v-bind="bindProps"
          :value="item.defaultValue"
          :disabled="disabled"
          style="width: 100%"
        />
      </a-col>
    </a-row>
    <a-row :gutter="24" v-else-if="item.type === 'rate'">
      <a-col :span="item.span || 6">
        <!-- Rate -->
        <a-rate
          v-bind="bindProps"
          :value="item.defaultValue"
          :disabled="disabled"
        />
      </a-col>
    </a-row>
    <a-row :gutter="24" v-else-if="item.type === 'upload'">
      <a-col :span="item.span || 6">
        <!-- Upload -->
        <a-upload
          v-bind="bindProps"
          :file-list="item.defaultValue"
          :disabled="disabled"
        >
          <a-button>
            <UploadOutlined /> {{ item.props?.buttonText || "点击上传" }}
          </a-button>
        </a-upload>
      </a-col>
    </a-row>
    <a-row :gutter="24" v-else-if="item.type === 'color'">
      <a-col :span="item.span || 6">
        <!-- Color -->
        <div class="color-picker">
          <input
            type="color"
            :value="item.defaultValue"
            :disabled="disabled"
            style="width: 60px; height: 32px; border: none; cursor: pointer"
          />
          <span style="margin-left: 8px">{{ item.defaultValue }}</span>
        </div>
      </a-col>
    </a-row>
    <a-row :gutter="24" v-else>
      <a-col :span="item.span || 6">
        <!-- Fallback -->
        <a-input placeholder="未知组件" disabled />
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { UploadOutlined } from "@ant-design/icons-vue";
import type { FormItem } from "@/types/form";

const props = defineProps<{
  item: FormItem;
  disabled?: boolean;
}>();

const bindProps = computed(() => {
  const { placeholder, ...rest } = props.item.props || {};
  return {
    placeholder: props.item.placeholder || placeholder,
    allowClear: true,
    ...rest,
  };
});
</script>
