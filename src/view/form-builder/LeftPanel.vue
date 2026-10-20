<template>
  <div class="h-full flex flex-col">
    <div class="p-4 border-b border-gray-200">
      <h3 class="text-lg font-medium m-0">组件库</h3>
    </div>
    
    <div class="flex-1 overflow-y-auto p-4">
      <a-collapse v-model:activeKey="activeKeys" :bordered="false">
        <a-collapse-panel 
          v-for="group in componentGroups" 
          :key="group.title"
          :header="group.title"
        >
          <div class="grid grid-cols-2 gap-2">
            <div
              v-for="component in group.components"
              :key="component.type"
              class="component-item"
              draggable="true"
              @dragstart="handleDragStart($event, component)"
              @click="$emit('add-component', component)"
            >
              <component :is="icons[component.icon]" class="text-xl mb-1" />
              <span class="text-xs">{{ component.label }}</span>
            </div>
          </div>
        </a-collapse-panel>
      </a-collapse>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import * as Icons from '@ant-design/icons-vue';
import { componentGroups } from '@/config/form-components';
import type { FormItemTemplate } from '@/types/form';

defineEmits<{
  (e: 'add-component', template: FormItemTemplate): void;
}>();

const activeKeys = ref(['基础字段', '选择字段', '高级字段']);
const icons = Icons as Record<string, any>;

const handleDragStart = (e: DragEvent, component: FormItemTemplate) => {
  e.dataTransfer?.setData('component-type', JSON.stringify(component));
};
</script>

<style scoped>
.component-item {
  @apply flex flex-col items-center justify-center p-3 bg-gray-50 rounded cursor-pointer 
         hover:bg-blue-50 hover:text-blue-500 hover:border-blue-300 border border-transparent
         transition-all duration-200;
}
</style>