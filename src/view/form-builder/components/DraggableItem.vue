<template>
  <div
    class="relative group rounded border-2 transition-all duration-200"
    :class="[
      isActive ? 'border-blue-500 bg-blue-50 shadow-md' : 'border-transparent hover:border-gray-300 bg-gray-50'
    ]"
    @click.stop="$emit('select')"
  >
    <!-- 拖拽手柄 -->
    <div class="drag-handle absolute left-0 top-0 bottom-0 w-6 flex items-center justify-center cursor-move opacity-0 group-hover:opacity-100 transition-opacity">
      <DragOutlined class="text-gray-400" />
    </div>

    <!-- 操作按钮 -->
    <div class="absolute right-2 top-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity z-10">
      <a-button type="text" size="small" @click.stop="$emit('copy')">
        <CopyOutlined />
      </a-button>
      <a-button type="text" size="small" danger @click.stop="$emit('delete')">
        <DeleteOutlined />
      </a-button>
    </div>

    <!-- 表单组件 -->
    <div class="pl-8 pr-4 py-4">
      <RenderComponent :item="item" :disabled="true" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { DragOutlined, CopyOutlined, DeleteOutlined } from '@ant-design/icons-vue';
import RenderComponent from './RenderComponent.vue';
import type { FormItem } from '@/types/form';

defineProps<{
  item: FormItem;
  isActive: boolean;
}>();

defineEmits<{
  (e: 'select'): void;
  (e: 'delete'): void;
  (e: 'copy'): void;
}>();
</script>