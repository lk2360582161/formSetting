<template>
  <div class="form-builder">
    <div class="left-panel">
      <div class="panel-header">
        <h3>组件2库</h3>
      </div>
      <div class="component-list">
        <a-collapse v-model:activeKey="activeKeys" :bordered="false">
          <a-collapse-panel v-for="group in componentGroups" :key="group.title" :header="group.title">
            <div class="component-grid">
              <div
                v-for="component in group.components"
                :key="component.type"
                class="component-item"
                draggable="true"
                @dragstart="handleDragStart($event, component)"
                @click="addFormItem(component)"
              >
                <component :is="getAntIcon(component.icon)" class="icon" />
                <span>{{ component.label }}</span>
              </div>
            </div>
          </a-collapse-panel>
        </a-collapse>
      </div>
    </div>

    <div class="center-panel">
      <div class="toolbar">
        <a-input v-model:value="formConf.formRef" style="width: 150px" />
        <a-select v-model:value="formConf.size" style="width: 100px">
          <a-select-option value="small">小</a-select-option>
          <a-select-option value="middle">中</a-select-option>
          <a-select-option value="large">大</a-select-option>
        </a-select>
        <a-button type="primary" @click="previewVisible = true">
          <EyeOutlined /> 预览
        </a-button>
        <a-button @click="handleExport">
          <DownloadOutlined /> 导出JSON
        </a-button>
        <a-button danger @click="clearForm">
          <DeleteOutlined /> 清空
        </a-button>
      </div>

      <!-- <div 
        class="canvas"
        @dragover.prevent="isOver = true"
        @dragleave="isOver = false"
        @drop.prevent="handleDrop"
        :class="{ 'drag-over': isOver }"
      >
        <div v-if="formItems.length === 0" class="empty-tip">
          <PlusOutlined class="empty-icon" />
          <p>从左侧拖拽组件到此处</p>
        </div>

        <a-form v-else v-bind="formProps" class="form-content">
          <draggable 
            v-model="formItems"
            item-key="id"
            handle=".drag-handle"
            class="form-list"
            :animation="200"
          >
            <template #item="{ element }">
              <div 
                class="form-item-wrapper"
                :class="{ active: activeId === element.id }"
                @click.stop="selectItem(element.id)"
              >
                <div class="drag-handle">
                  <DragOutlined />
                </div>
                
                <div class="form-item-content">
                  <a-form-item :label="element.label">
                    <RenderComponent :item="element" :disabled="true" />
                  </a-form-item>
                </div>

                <div class="item-actions">
                  <a-button type="text" size="small" @click.stop="copyFormItem(element.id)">
                    <CopyOutlined />
                  </a-button>
                  <a-button type="text" danger size="small" @click.stop="deleteFormItem(element.id)">
                    <DeleteOutlined />
                  </a-button>
                </div>
              </div>
            </template>
          </draggable>
        </a-form>
      </div>-->
      <div 
    class="canvas"
    @dragover.prevent="isOver = true"
    @dragleave="isOver = false"
    @drop.prevent="handleDrop"
    :class="{ 'drag-over': isOver }"
  >
    <div v-if="formItems.length === 0" class="empty-tip">
      <PlusOutlined class="empty-icon" />
      <p>从左侧拖拽组件到此处</p>
    </div>

    <a-form v-else v-bind="formProps" class="form-content">
      <!-- 关键：vuedraggable 正确配置 -->
      <draggable 
        :list="formItems"
        item-key="id"
        handle=".drag-handle"
        class="form-list"
        :animation="200"
        ghost-class="ghost"
        chosen-class="chosen"
        drag-class="dragging"
        @start="drag = true"
        @end="drag = false"
      >
        <template #item="{ element, index }">
          <div 
            class="form-item-wrapper"
            :class="{ active: activeId === element.id }"
            @click.stop="selectItem(element.id)"
          >
            <!-- 拖拽手柄 -->
            <div class="drag-handle" title="拖动排序">
              <DragOutlined />
            </div>
            
            <div class="form-item-content">
              <a-form-item :label="element.label">
                <RenderComponent :item="element" :disabled="true" />
              </a-form-item>
            </div>

            <!-- 操作按钮 -->
            <div class="item-actions">
              <a-button type="text" size="small" @click.stop="copyFormItem(element.id)">
                <CopyOutlined />
              </a-button>
              <a-button type="text" danger size="small" @click.stop="deleteFormItem(element.id)">
                <DeleteOutlined />
              </a-button>
            </div>
          </div>
        </template>
      </draggable>
    </a-form>
  </div>
    </div> 

    <div class="right-panel">
      <div class="panel-header">
        <h3>属性配置</h3>
      </div>
      <div class="panel-content">
        <RightPanel 
        :active-data="activeItem"
      :form-conf="formConf"
      @update="handleUpdateItem"
      @update-conf="handleUpdateConf"
      @tag-change="handleTagChange"
          v-if="activeItem" 
          :form-item="activeItem"
     
        />
        <div v-else class="empty-config">
          <InfoCircleOutlined class="icon" />
          <p>请选择左侧表单项进行配置</p>
        </div>
      </div>
    </div>

    <!-- 预览弹窗 -->
    <a-modal v-model:visible="previewVisible" title="表单预览" width="800px" :footer="null">
      <FormPreview :form-items="formItems" :form-conf="formConf" />
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { message } from 'ant-design-vue';
import draggable from 'vuedraggable';
import * as Icons from '@ant-design/icons-vue';
import { componentGroups, formConfDefault } from '@/config/form-components';
import { useFormBuilder } from '@/composables/useFormBuilder';
import RenderComponent from './components/RenderComponent.vue';
import RightPanel from './RightPanel.vue';
import FormPreview from './FormPreview.vue';
import type {FormConf,FormItemTemplate,FormItem } from '@/types/form';
import { 
  PlusOutlined,
  DragOutlined,
  CopyOutlined,
  DeleteOutlined,
  InfoCircleOutlined
} from '@ant-design/icons-vue';
const {
  formConf,
  formItems,
  activeId,
  activeItem,
  addFormItem,
  updateFormItem,
  deleteFormItem,
  copyFormItem,
  selectItem,
  changeTag,
  updateFormConf,
  clearForm,
  generateJson
} = useFormBuilder();

const activeKeys = ref(['基础字段', '选择字段', '高级字段']);
const isOver = ref(false);
const drag = ref(false);
const previewVisible = ref(false);

const formProps = computed(() => ({
  layout: formConf.value.layout,
  size: formConf.value.size,
  labelAlign: formConf.value.labelAlign,
  labelCol: { style: { width: `${formConf.value.labelWidth}px` } }
}));

const getAntIcon = (name: string) => {
  return (Icons as any)[name] || Icons.QuestionOutlined;
};

const handleDragStart = (e: DragEvent, component: FormItemTemplate) => {
  e.dataTransfer?.setData('component', JSON.stringify(component));
};

const handleDrop = (e: DragEvent) => {
  isOver.value = false;
  const data = e.dataTransfer?.getData('component');
  if (data) {
    const component = JSON.parse(data);
    addFormItem(component);
    message.success(`已添加 ${component.label}`);
  }
};

const handleUpdateItem = (item: FormItem) => {
  updateFormItem(item.id, item);
};
// 更新表单配置
const handleUpdateConf = (conf: FormConf) => {
  updateFormConf(conf);
};

// 切换组件类型
const handleTagChange = (tag: FormItemTemplate) => {
  if (activeItem.value) {
    changeTag(activeItem.value.id, tag);
  }
}
const handleExport = () => {
  console.log(generateJson());
  message.success('已导出到控制台');
};
</script>

<style scoped>
.form-builder {
  display: flex;
  height: 100vh;
  background: #f0f2f5;
}

/* 左侧面板 */
.left-panel {
  width: 260px;
  background: #fff;
  border-right: 1px solid #e8e8e8;
  display: flex;
  flex-direction: column;
}

.panel-header {
  padding: 16px;
  border-bottom: 1px solid #e8e8e8;
}

.panel-header h3 {
  margin: 0;
  font-size: 16px;
  font-weight: 500;
}

.component-list {
  flex: 1;
  overflow-y: auto;
  padding: 12px;
}

.component-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
}

.component-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 12px 8px;
  background: #f6f8fa;
  border: 1px solid #e8e8e8;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
}

.component-item:hover {
  background: #e6f7ff;
  border-color: #1890ff;
  color: #1890ff;
}

.component-item .icon {
  font-size: 20px;
  margin-bottom: 4px;
}

.component-item span {
  font-size: 12px;
}

/* 中间面板 */
.center-panel {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.toolbar {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 24px;
  background: #fff;
  border-bottom: 1px solid #e8e8e8;
}

.canvas {
  flex: 1;
  margin: 24px;
  background: #fff;
  border: 2px dashed #d9d9d9;
  border-radius: 8px;
  padding: 24px;
  overflow-y: auto;
  transition: all 0.2s;
}

.canvas.drag-over {
  border-color: #1890ff;
  background: #e6f7ff;
}

.empty-tip {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 300px;
  color: #999;
}

.empty-icon {
  font-size: 48px;
  margin-bottom: 16px;
}

.form-content {
  min-height: 100%;
}

.form-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.form-item-wrapper {
  display: flex;
  align-items: flex-start;
  padding: 16px;
  background: #fafafa;
  border: 2px solid transparent;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
  position: relative;
}

.form-item-wrapper:hover {
  border-color: #d9d9d9;
}

.form-item-wrapper.active {
  border-color: #1890ff;
  background: #e6f7ff;
}

.drag-handle {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
  color: #999;
  cursor: move;
}

.form-item-content {
  flex: 1;
}

.item-actions {
  display: flex;
  gap: 4px;
  opacity: 0;
  transition: opacity 0.2s;
}

.form-item-wrapper:hover .item-actions {
  opacity: 1;
}

/* 右侧面板 */
.right-panel {
  width: 320px;
  background: #fff;
  border-left: 1px solid #e8e8e8;
  display: flex;
  flex-direction: column;
}

.panel-content {
  flex: 1;
  overflow-y: auto;
  padding: 16px;
}

.empty-config {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  color: #999;
  text-align: center;
}

.empty-config .icon {
  font-size: 48px;
  margin-bottom: 16px;
}
</style>