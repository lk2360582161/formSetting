<!-- <template>
  <div class="right-panel-content">
    <a-form layout="vertical">
      <a-form-item label="字段标题">
        <a-input v-model:value="localItem.label" @change="emitUpdate" />
      </a-form-item>
      
      <a-form-item label="字段标识">
        <a-input v-model:value="localItem.field" @change="emitUpdate" />
      </a-form-item>
      
      <a-form-item label="占位提示">
        <a-input v-model:value="localItem.placeholder" @change="emitUpdate" />
      </a-form-item>
      
      <a-form-item label="栅格宽度">
        <a-slider v-model:value="localItem.span" :min="1" :max="24" @change="emitUpdate" />
      </a-form-item>
      
      <a-form-item>
        <a-space>
          <a-checkbox v-model:checked="localItem.required" @change="emitUpdate">必填</a-checkbox>
          <a-checkbox v-model:checked="localItem.disabled" @change="emitUpdate">禁用</a-checkbox>
        </a-space>
      </a-form-item>
      
      <template v-if="localItem.options">
        <a-divider>选项配置</a-divider>
        <div v-for="(opt, idx) in localItem.options" :key="idx" class="option-row">
          <a-input v-model:value="opt.label" size="small" @change="emitUpdate" />
          <a-input v-model:value="opt.value" size="small" @change="emitUpdate" />
          <a-button type="text" danger size="small" @click="removeOption(idx)">
            <DeleteOutlined />
          </a-button>
        </div>
        <a-button type="dashed" block size="small" @click="addOption">
          <PlusOutlined /> 添加选项
        </a-button>
      </template>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons-vue';
import type { FormItem } from '@/types/form';

const props = defineProps<{
  formItem: FormItem;
}>();

const emit = defineEmits<{
  (e: 'update', item: FormItem): void;
}>();

const localItem = ref<FormItem>({ ...props.formItem });

watch(() => props.formItem, (newVal) => {
  localItem.value = { ...newVal };
}, { deep: true });

const emitUpdate = () => {
  emit('update', { ...localItem.value });
};

const addOption = () => {
  if (!localItem.value.options) return;
  localItem.value.options.push({
    label: `选项${localItem.value.options.length + 1}`,
    value: String(localItem.value.options.length + 1)
  });
  emitUpdate();
};

const removeOption = (idx: number) => {
  localItem.value.options?.splice(idx, 1);
  emitUpdate();
};
</script>

<style scoped>
.right-panel-content {
  padding: 8px;
}

.option-row {
  display: flex;
  gap: 8px;
  margin-bottom: 8px;
  align-items: center;
}

.option-row .ant-input {
  flex: 1;
}
</style> -->
<template>
  <div class="right-panel">
    <a-tabs v-model:activeKey="currentTab" class="panel-tabs">
      <a-tab-pane key="field" tab="组件属性" />
      <a-tab-pane key="form" tab="表单属性" />
    </a-tabs>
    
    <div class="panel-content">
      <!-- 组件属性 -->
      <div v-show="currentTab === 'field' && props.activeData" class="field-config">
        <a-form layout="vertical" size="small">
          
          <!-- 组件类型 -->
          <a-form-item v-if="props.activeData?.changeTag" label="组件类型">
            <a-select
              :value="props.activeData.tagIcon"
              placeholder="请选择组件类型"
              @change="handleTagChange"
            >
              <a-select-opt-group v-for="group in tagList" :key="group.label" :label="group.label">
                <a-select-option
                  v-for="item in group.options"
                  :key="item.tagIcon"
                  :value="item.tagIcon"
                >
                  {{ item.label }}
                </a-select-option>
              </a-select-opt-group>
            </a-select>
          </a-form-item>

          <!-- 字段名 -->
          <a-form-item v-if="props.activeData?.field !== undefined" label="字段名">
            <a-input :value="props.activeData.field" 
             @change="(e: any) => updateField('field', e.target.value)"  />
          </a-form-item>

          <!-- 标题 -->
          <a-form-item v-if="props.activeData?.label !== undefined" label="标题">
            <a-input 
              :value="props.activeData.label" 
              placeholder="请输入标题" 
              @change="(e: any) => updateField('label', e.target.value)" 
            />
          </a-form-item>

          <!-- 占位提示 -->
          <a-form-item v-if="props.activeData?.placeholder !== undefined" label="占位提示">
            <a-input 
              :value="props.activeData.placeholder" 
              placeholder="请输入占位提示" 
              @change="(e: any) => updateField('placeholder', e.target.value)" 
            />
          </a-form-item>

          <!-- 栅格宽度 -->
          <a-form-item v-if="props.activeData?.span !== undefined" label="栅格宽度 (1-24)">
            <a-slider 
              :value="props.activeData.span" 
              :min="1" 
              :max="24" 
              :marks="{ 6: '6', 12: '12', 18: '18', 24: '24' }"
              @change="(val: number) => updateField('span', val)"
            />
            <div class="slider-value">当前: {{ props.activeData.span }} / 24</div>
          </a-form-item>

          <!-- 标签宽度 -->
          <a-form-item v-if="props.activeData?.labelWidth !== undefined" label="标签宽度">
            <a-input-number 
              :value="props.activeData.labelWidth" 
              :min="0" 
              :step="10" 
              addon-after="px" 
              @change="(val: number) => updateField('labelWidth', val)" 
            />
          </a-form-item>

          <!-- 组件宽度 -->
          <a-form-item v-if="props.activeData?.style?.width !== undefined" label="组件宽度">
            <a-input 
              :value="props.activeData.style.width" 
              placeholder="如: 100%, 200px" 
              allow-clear 
              @change="(e: any) => updateStyle('width', e.target.value)" 
            />
          </a-form-item>

          <!-- 默认值 -->
          <a-form-item v-if="props.activeData?.defaultValue !== undefined" label="默认值">
            <a-input
              :value="formatDefaultValue(props.activeData.defaultValue)"
              placeholder="请输入默认值"
              @change="handleDefaultValueChange"
            />
          </a-form-item>

          <!-- 最小/最大值 -->
          <template v-if="props.activeData?.min !== undefined || props.activeData?.max !== undefined">
            <a-form-item v-if="props.activeData?.min !== undefined" label="最小值">
              <a-input-number 
                :value="props.activeData.min" 
                placeholder="最小值" 
                @change="(val: number) => updateField('min', val)" 
              />
            </a-form-item>
            <a-form-item v-if="props.activeData?.max !== undefined" label="最大值">
              <a-input-number 
                :value="props.activeData.max" 
                placeholder="最大值" 
                @change="(val: number) => updateField('max', val)" 
              />
            </a-form-item>
          </template>

          <!-- 步长 -->
          <a-form-item v-if="props.activeData?.step !== undefined" label="步长">
            <a-input-number 
              :value="props.activeData.step" 
              placeholder="步长" 
              @change="(val: number) => updateField('step', val)" 
            />
          </a-form-item>

          <!-- 精度 -->
          <a-form-item v-if="props.activeData?.precision !== undefined" label="精度">
            <a-input-number 
              :value="props.activeData.precision" 
              :min="0" 
              placeholder="精度" 
              @change="(val: number) => updateField('precision', val)" 
            />
          </a-form-item>

          <!-- 最大长度 -->
          <a-form-item v-if="props.activeData?.maxlength !== undefined" label="最多输入">
            <a-input-number 
              :value="props.activeData.maxlength" 
              :min="0" 
              placeholder="字符长度" 
              @change="(val: number) => updateField('maxlength', val)"
            >
              <template #addonAfter>个字符</template>
            </a-input-number>
          </a-form-item>

          <!-- 前缀/后缀 -->
          <a-form-item v-if="props.activeData?.prepend !== undefined" label="前缀">
            <a-input 
              :value="props.activeData.prepend" 
              placeholder="请输入前缀" 
              @change="(e: any) => updateField('prepend', e.target.value)" 
            />
          </a-form-item>

          <a-form-item v-if="props.activeData?.append !== undefined" label="后缀">
            <a-input 
              :value="props.activeData.append" 
              placeholder="请输入后缀" 
              @change="(e: any) => updateField('append', e.target.value)" 
            />
          </a-form-item>

          <!-- 开关文字 - 使用安全的属性访问 -->
          <template v-if="hasCheckedChildren(props.activeData)">
            <a-form-item label="开启文字">
              <a-input 
                :value="props.activeData?.checkedChildren" 
                placeholder="请输入开启文字" 
                @change="(e: any) => updateField('checkedChildren', e.target.value)" 
              />
            </a-form-item>
            <a-form-item label="关闭文字">
              <a-input 
                :value="props.activeData?.unCheckedChildren" 
                placeholder="请输入关闭文字" 
                @change="(e: any) => updateField('unCheckedChildren', e.target.value)" 
              />
            </a-form-item>
          </template>

          <!-- 文件上传配置 -->
          <template v-if="props.activeData?.type === 'upload'">
            <a-form-item v-if="props.activeData?.action !== undefined" label="上传地址">
              <a-input 
                :value="props.activeData.action" 
                placeholder="请输入上传地址" 
                allow-clear 
                @change="(e: any) => updateField('action', e.target.value)" 
              />
            </a-form-item>
            
            <a-form-item v-if="props.activeData?.name !== undefined" label="文件字段名">
              <a-input 
                :value="props.activeData.name" 
                placeholder="请输入文件字段名" 
                @change="(e: any) => updateField('name', e.target.value)" 
              />
            </a-form-item>
            
            <a-form-item v-if="props.activeData?.accept !== undefined" label="文件类型">
              <a-select 
                :value="props.activeData.accept" 
                placeholder="请选择文件类型" 
                allow-clear 
                @change="(val: string) => updateField('accept', val)"
              >
                <a-select-option value="image/*">图片</a-select-option>
                <a-select-option value="video/*">视频</a-select-option>
                <a-select-option value="audio/*">音频</a-select-option>
                <a-select-option value=".xls,.xlsx">Excel</a-select-option>
                <a-select-option value=".doc,.docx">Word</a-select-option>
                <a-select-option value=".pdf">PDF</a-select-option>
                <a-select-option value=".txt">TXT</a-select-option>
              </a-select>
            </a-form-item>
            
            <a-form-item v-if="props.activeData?.fileSize !== undefined" label="文件大小">
              <a-input-number 
                :value="props.activeData.fileSize" 
                :min="0" 
                placeholder="文件大小" 
                @change="(val: number) => updateField('fileSize', val)"
              >
                <template #addonAfter>
                  <a-select 
                    :value="props.activeData.sizeUnit" 
                    style="width: 70px" 
                    @change="(val: string) => updateField('sizeUnit', val)"
                  >
                    <a-select-option value="KB">KB</a-select-option>
                    <a-select-option value="MB">MB</a-select-option>
                    <a-select-option value="GB">GB</a-select-option>
                  </a-select>
                </template>
              </a-input-number>
            </a-form-item>
            
            <a-form-item v-if="props.activeData?.['list-type'] !== undefined" label="列表类型">
              <a-radio-group 
                :value="props.activeData['list-type']" 
                size="small" 
                @change="(e: any) => updateField('list-type', e.target.value)"
              >
                <a-radio-button value="text">文字</a-radio-button>
                <a-radio-button value="picture">图片</a-radio-button>
                <a-radio-button value="picture-card">卡片</a-radio-button>
              </a-radio-group>
            </a-form-item>
            
            <a-form-item 
              v-if="props.activeData?.buttonText !== undefined && props.activeData?.['list-type'] !== 'picture-card'" 
              label="按钮文字"
            >
              <a-input 
                :value="props.activeData.buttonText" 
                placeholder="请输入按钮文字" 
                @change="(e: any) => updateField('buttonText', e.target.value)" 
              />
            </a-form-item>
          </template>

          <!-- 选项配置（选择类组件） -->
          <template v-if="['select', 'radio', 'checkbox'].includes(props.activeData?.type || '') && props.activeData?.options">
            <a-divider>选项配置</a-divider>
            <draggable
              :list="props.activeData.options"
              item-key="value"
              handle=".option-drag"
              class="option-list"
              @end="emitUpdate"
            >
              <template #item="{ element, index }">
                <div class="option-item">
                  <DragOutlined class="option-drag" />
                  <a-input 
                    :value="element.label" 
                    size="small" 
                    placeholder="显示名" 
                    @change="(e: any) => updateOption(index, 'label', e.target.value)" 
                  />
                  <a-input 
                    :value="element.value" 
                    size="small" 
                    placeholder="值" 
                    @change="(e: any) => updateOption(index, 'value', e.target.value)" 
                  />
                  <a-button type="text" danger size="small" @click="removeOption(index)">
                    <DeleteOutlined />
                  </a-button>
                </div>
              </template>
            </draggable>
            <a-button type="dashed" block size="small" @click="addOption" style="margin-top: 8px">
              <PlusOutlined /> 添加选项
            </a-button>
          </template>

          <!-- 布尔开关配置 -->
          <a-divider>功能配置</a-divider>
          
          <div class="switch-list">
            <a-form-item v-if="props.activeData?.required !== undefined" class="switch-item">
              <a-switch 
                :checked="props.activeData.required" 
                @change="(val: boolean) => updateField('required', val)" 
                size="small" 
              />
              <span class="switch-label">必填</span>
            </a-form-item>
            
            <a-form-item v-if="props.activeData?.disabled !== undefined" class="switch-item">
              <a-switch 
                :checked="props.activeData.disabled" 
                @change="(val: boolean) => updateField('disabled', val)" 
                size="small" 
              />
              <span class="switch-label">禁用</span>
            </a-form-item>
            
            <a-form-item v-if="props.activeData?.readonly !== undefined" class="switch-item">
              <a-switch 
                :checked="props.activeData.readonly" 
                @change="(val: boolean) => updateField('readonly', val)" 
                size="small" 
              />
              <span class="switch-label">只读</span>
            </a-form-item>
            
            <a-form-item v-if="props.activeData?.clearable !== undefined" class="switch-item">
              <a-switch 
                :checked="props.activeData.clearable" 
                @change="(val: boolean) => updateField('clearable', val)" 
                size="small" 
              />
              <span class="switch-label">可清空</span>
            </a-form-item>
            
            <a-form-item v-if="props.activeData?.filterable !== undefined" class="switch-item">
              <a-switch 
                :checked="props.activeData.filterable" 
                @change="(val: boolean) => updateField('filterable', val)" 
                size="small" 
              />
              <span class="switch-label">可搜索</span>
            </a-form-item>
            
            <a-form-item 
              v-if="props.activeData?.multiple !== undefined && props.activeData?.type === 'select'" 
              class="switch-item"
            >
              <a-switch 
                :checked="props.activeData.multiple" 
                @change="handleMultipleChange" 
                size="small" 
              />
              <span class="switch-label">多选</span>
            </a-form-item>
            
            <a-form-item v-if="props.activeData?.['allow-half'] !== undefined" class="switch-item">
              <a-switch 
                :checked="props.activeData['allow-half']" 
                @change="(val: boolean) => updateField('allow-half', val)" 
                size="small" 
              />
              <span class="switch-label">允许半选</span>
            </a-form-item>
            
            <a-form-item v-if="props.activeData?.['show-word-limit'] !== undefined" class="switch-item">
              <a-switch 
                :checked="props.activeData['show-word-limit']" 
                @change="(val: boolean) => updateField('show-word-limit', val)" 
                size="small" 
              />
              <span class="switch-label">显示字数统计</span>
            </a-form-item>
          </div>

          <!-- 正则校验 -->
          <template v-if="props.activeData?.regList !== undefined">
            <a-divider>正则校验</a-divider>
            <div v-for="(item, index) in props.activeData.regList" :key="index" class="reg-item">
              <div class="reg-header">
                <span>规则 {{ index + 1 }}</span>
                <a-button type="text" danger size="small" @click="removeReg(index)">
                  <DeleteOutlined />
                </a-button>
              </div>
              <a-form-item label="表达式" class="reg-form-item">
                <a-input 
                  :value="item.pattern" 
                  placeholder="请输入正则表达式" 
                  size="small" 
                  @change="(e: any) => updateReg(index, 'pattern', e.target.value)" 
                />
              </a-form-item>
              <a-form-item label="错误提示" class="reg-form-item">
                <a-input 
                  :value="item.message" 
                  placeholder="请输入错误提示" 
                  size="small" 
                  @change="(e: any) => updateReg(index, 'message', e.target.value)" 
                />
              </a-form-item>
            </div>
            <a-button type="dashed" block size="small" @click="addReg" style="margin-top: 8px">
              <PlusOutlined /> 添加规则
            </a-button>
          </template>
        </a-form>
      </div>

      <!-- 表单属性 -->
      <div v-show="currentTab === 'form'" class="form-config">
        <a-form layout="vertical" size="small">
          <a-form-item label="表单名">
            <a-input 
              :value="props.formConf.formRef" 
              placeholder="请输入表单名（ref）" 
              @change="(e: any) => updateConf('formRef', e.target.value)" 
            />
          </a-form-item>
          
          <a-form-item label="表单模型">
            <a-input 
              :value="props.formConf.formModel" 
              placeholder="请输入数据模型" 
              @change="(e: any) => updateConf('formModel', e.target.value)" 
            />
          </a-form-item>
          
          <a-form-item label="表单尺寸">
            <a-radio-group 
              :value="props.formConf.size" 
              @change="(e: any) => updateConf('size', e.target.value)"
            >
              <a-radio-button value="small">小</a-radio-button>
              <a-radio-button value="middle">中</a-radio-button>
              <a-radio-button value="large">大</a-radio-button>
            </a-radio-group>
          </a-form-item>
          
          <a-form-item label="标签对齐">
            <a-radio-group 
              :value="props.formConf.labelAlign" 
              @change="(e: any) => updateConf('labelAlign', e.target.value)"
            >
              <a-radio-button value="left">左对齐</a-radio-button>
              <a-radio-button value="right">右对齐</a-radio-button>
            </a-radio-group>
          </a-form-item>
          
          <a-form-item label="标签宽度">
            <a-input-number 
              :value="props.formConf.labelWidth" 
              :min="0" 
              :step="10" 
              addon-after="px" 
              @change="(val: number) => updateConf('labelWidth', val)" 
            />
          </a-form-item>
          
          <a-form-item label="栅格间隔">
            <a-input-number 
              :value="props.formConf.gutter" 
              :min="0" 
              placeholder="栅格间隔" 
              @change="(val: number) => updateConf('gutter', val)" 
            />
          </a-form-item>
          
          <a-form-item label="布局方式">
            <a-radio-group 
              :value="props.formConf.layout" 
              @change="(e: any) => updateConf('layout', e.target.value)"
            >
              <a-radio-button value="horizontal">水平</a-radio-button>
              <a-radio-button value="vertical">垂直</a-radio-button>
              <a-radio-button value="inline">行内</a-radio-button>
            </a-radio-group>
          </a-form-item>
          
          <a-form-item>
            <a-space direction="vertical">
              <a-checkbox 
                :checked="props.formConf.disabled" 
                @change="(e: any) => updateConf('disabled', e.target.checked)"
              >
                禁用整个表单
              </a-checkbox>
              <a-checkbox 
                :checked="props.formConf.formBtns" 
                @change="(e: any) => updateConf('formBtns', e.target.checked)"
              >
                显示表单按钮
              </a-checkbox>
            </a-space>
          </a-form-item>
        </a-form>
      </div>

      <!-- 空状态 -->
      <div v-if="currentTab === 'field' && !props.activeData" class="empty-state">
        <InfoCircleOutlined class="icon" />
        <p>请先选择左侧表单项进行配置</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import draggable from 'vuedraggable';
import { 
  DragOutlined, 
  DeleteOutlined, 
  PlusOutlined,
  InfoCircleOutlined 
} from '@ant-design/icons-vue';
import { inputComponents, selectComponents, allComponents } from '@/config/form-components';
import type { FormItem, FormConf } from '@/types/form';

// 定义 props
const props = defineProps<{
  activeData?: FormItem | null;
  formConf: FormConf;
}>();

const emit = defineEmits<{
  (e: 'update', item: FormItem): void;
  (e: 'update-conf', conf: FormConf): void;
  (e: 'tag-change', tag: any): void;
}>();

const currentTab = ref('field');

// 组件类型列表
const tagList = computed(() => [
  { label: '输入型组件', options: inputComponents },
  { label: '选择型组件', options: selectComponents }
]);

// 类型守卫函数
const hasCheckedChildren = (item: FormItem | null | undefined): boolean => {
  return item?.type === 'switch' && 'checkedChildren' in item;
};

// 更新字段
const updateField = (key: keyof FormItem, value: any) => {
  if (!props.activeData) return;
  emit('update', { ...props.activeData, [key]: value });
};

// 更新样式
const updateStyle = (key: string, value: string) => {
  if (!props.activeData) return;
  emit('update', { 
    ...props.activeData, 
    style: { ...props.activeData.style, [key]: value } 
  });
};

// 更新配置
const updateConf = (key: keyof FormConf, value: any) => {
  emit('update-conf', { ...props.formConf, [key]: value });
};

// 更新选项
const updateOption = (index: number, key: 'label' | 'value', value: string) => {
  if (!props.activeData?.options) return;
  const newOptions = [...props.activeData.options];
  newOptions[index] = { ...newOptions[index], [key]: value };
  emit('update', { ...props.activeData, options: newOptions });
};

// 更新正则
const updateReg = (index: number, key: 'pattern' | 'message', value: string) => {
  if (!props.activeData?.regList) return;
  const newRegList = [...props.activeData.regList];
  newRegList[index] = { ...newRegList[index], [key]: value };
  emit('update', { ...props.activeData, regList: newRegList });
};

// 触发更新
const emitUpdate = () => {
  if (props.activeData) {
    emit('update', { ...props.activeData });
  }
};

// 格式化默认值
const formatDefaultValue = (val: any): string => {
  if (Array.isArray(val)) return val.join(',');
  if (typeof val === 'boolean') return String(val);
  return val ?? '';
};

// 默认值变化
const handleDefaultValueChange = (e: Event) => {
  const val = (e.target as HTMLInputElement).value;
  if (!props.activeData) return;
  
  let newValue: any = val;
  const oldValue = props.activeData.defaultValue;
  
  if (Array.isArray(oldValue)) {
    newValue = val.split(',').map(v => v.trim());
  } else if (['true', 'false'].includes(val)) {
    newValue = val === 'true';
  } else if (!isNaN(Number(val)) && val !== '') {
    newValue = Number(val);
  }
  
  emit('update', { ...props.activeData, defaultValue: newValue });
};

// 组件类型切换
const handleTagChange = (tagIcon: string) => {
  const target = allComponents.find(item => item.tagIcon === tagIcon);
  if (target) {
    emit('tag-change', target);
  }
};

// 多选切换
const handleMultipleChange = (val: boolean) => {
  if (!props.activeData) return;
  emit('update', { 
    ...props.activeData, 
    multiple: val, 
    defaultValue: val ? [] : undefined 
  });
};

// 选项操作
const addOption = () => {
  if (!props.activeData?.options) return;
  const len = props.activeData.options.length + 1;
  emit('update', {
    ...props.activeData,
    options: [
      ...props.activeData.options,
      { label: `选项${len}`, value: String(len) }
    ]
  });
};

const removeOption = (index: number) => {
  if (!props.activeData?.options) return;
  const newOptions = [...props.activeData.options];
  newOptions.splice(index, 1);
  emit('update', { ...props.activeData, options: newOptions });
};

// 正则规则操作
const addReg = () => {
  if (!props.activeData) return;
  const newRegList = [...(props.activeData.regList || []), { pattern: '', message: '' }];
  emit('update', { ...props.activeData, regList: newRegList });
};

const removeReg = (index: number) => {
  if (!props.activeData?.regList) return;
  const newRegList = [...props.activeData.regList];
  newRegList.splice(index, 1);
  emit('update', { ...props.activeData, regList: newRegList });
};
</script>

<style scoped>
/* 样式保持不变... */
.right-panel {
  height: 100%;
  display: flex;
  flex-direction: column;
  background: #fff;
}

.panel-tabs {
  flex-shrink: 0;
}

.panel-tabs :deep(.ant-tabs-nav) {
  margin-bottom: 0;
  padding: 0 16px;
}

.panel-content {
  flex: 1;
  overflow-y: auto;
  padding: 16px;
}

.field-config,
.form-config {
  padding-bottom: 24px;
}

.slider-value {
  text-align: center;
  color: #1890ff;
  font-size: 12px;
  margin-top: 4px;
}

.option-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.option-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px;
  background: #f5f5f5;
  border-radius: 4px;
}

.option-drag {
  cursor: move;
  color: #999;
  font-size: 14px;
}

.option-item .ant-input {
  flex: 1;
}

.switch-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.switch-item {
  margin-bottom: 0;
  display: flex;
  align-items: center;
  gap: 8px;
}

.switch-item :deep(.ant-form-item-control) {
  flex: none;
}

.switch-label {
  color: #666;
  font-size: 14px;
}

.reg-item {
  background: #f5f5f5;
  border-radius: 4px;
  padding: 12px;
  margin-bottom: 12px;
}

.reg-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  font-size: 12px;
  color: #666;
}

.reg-form-item {
  margin-bottom: 8px;
}

.reg-form-item:last-child {
  margin-bottom: 0;
}

.reg-form-item :deep(.ant-form-item-label) {
  padding-bottom: 4px;
}

.reg-form-item :deep(label) {
  font-size: 12px;
  color: #999;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  color: #999;
  text-align: center;
}

.empty-state .icon {
  font-size: 48px;
  margin-bottom: 16px;
  color: #d9d9d9;
}

:deep(.ant-form-item) {
  margin-bottom: 16px;
}

:deep(.ant-divider) {
  margin: 16px 0;
}
</style>