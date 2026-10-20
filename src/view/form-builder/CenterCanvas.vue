<template>
  <div class="flex-1 p-6 overflow-y-auto">
    <div 
      class="bg-white rounded-lg shadow-sm border-2 border-dashed border-gray-300 min-h-[500px] p-6"
      :class="{ 'border-blue-400 bg-blue-50/30': isDragging }"
      @dragover.prevent="isDragging = true"
      @dragleave="isDragging = false"
      @drop.prevent="handleDrop"
    >
      <div v-if="formItems.length === 0" class="h-64 flex items-center justify-center text-gray-400">
        <div class="text-center">
          <PlusOutlined class="text-4xl mb-4" />
          <p>从左侧拖拽组件到此处</p>
        </div>
      </div>

      <a-form
        v-else
        :model="formData"
        v-bind="formProps"
      >
        <draggable 
          v-model="localItems"
          item-key="id"
          handle=".drag-handle"
          class="space-y-4"
        >
          <template #item="{ element, index }">
            <DraggableItem
              :item="element"
              :is-active="activeId === element.id"
              @select="$emit('select', element.id)"
              @delete="$emit('delete', element.id)"
              @copy="$emit('copy', element.id)"
            />
          </template>
        </draggable>
      </a-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import draggable from 'vuedraggable';
import { PlusOutlined } from '@ant-design/icons-vue';
import DraggableItem from './components/DraggableItem.vue';
import type { FormItem, FormConf } from '@/types/form';

const props = defineProps<{
  formItems: FormItem[];
  formConf: FormConf;
  activeId: string | null;
}>();

const emit = defineEmits<{
  (e: 'select', id: string): void;
  (e: 'delete', id: string): void;
  (e: 'copy', id: string): void;
  (e: 'update:items', items: FormItem[]): void;
}>();

const isDragging = ref(false);
const formData = ref({});

const localItems = computed({
  get: () => props.formItems,
  set: (val) => emit('update:items', val)
});

const formProps = computed(() => ({
  layout: props.formConf.layout,
  size: props.formConf.size,
  labelAlign: props.formConf.labelAlign,
  labelCol: { style: { width: `${props.formConf.labelWidth}px` } }
}));

const handleDrop = (e: DragEvent) => {
  isDragging.value = false;
  const data = e.dataTransfer?.getData('component-type');
  if (data) {
    const component = JSON.parse(data);
    // 通过事件冒泡到父组件处理
    // 这里简化处理，实际应该用 provide/inject 或状态管理
  }
};
</script>