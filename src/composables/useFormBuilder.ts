import { ref, computed } from 'vue';
import type { FormItem, FormConf, FormItemTemplate } from '../types/form';
import { formConfDefault } from '../config/form-components';

// // 生成ID
// const generateId = () => Math.random().toString(36).substr(2, 9);

// // 获取默认值
// const getDefaultValue = (type: string): any => {
//   const map: Record<string, any> = {
//     input: '',
//     textarea: '',
//     password: '',
//     number: null,
//     select: undefined,
//     radio: undefined,
//     checkbox: [],
//     switch: false,
//     date: null,
//     dateRange: [],
//     time: null,
//     rate: 0,
//     upload: [],
//     color: '#1890ff'
//   };
//   return map[type] ?? '';
// };

// export function useFormBuilder() {
//   const formConf = ref<FormConf>({ ...formConfDefault });
//   const formItems = ref<FormItem[]>([]);
//   const activeId = ref<string | null>(null);

//   const activeItem = computed(() => 
//     formItems.value.find(item => item.id === activeId.value) || null
//   );

//   const addFormItem = (template: FormItemTemplate) => {
//     const id = generateId();
//     const item: FormItem = {
//       id,
//       type: template.type,
//       label: template.label,
//       field: `field_${id}`,
//       placeholder: template.defaultProps?.placeholder || '',
//       required: false,
//       disabled: false,
//       span: 24,
//       defaultValue: getDefaultValue(template.type),
//       props: { ...template.defaultProps },
//       options: template.options ? JSON.parse(JSON.stringify(template.options)) : undefined
//     };
    
//     formItems.value.push(item);
//     activeId.value = id;
//     return item;
//   };

//   const updateFormItem = (id: string, updates: Record<string, any>) => {
//     const index = formItems.value.findIndex(item => item.id === id);
//     if (index > -1) {
//       Object.assign(formItems.value[index], updates);
//     }
//   };

//   const deleteFormItem = (id: string) => {
//     const index = formItems.value.findIndex(item => item.id === id);
//     if (index > -1) {
//       formItems.value.splice(index, 1);
//       if (activeId.value === id) {
//         activeId.value = null;
//       }
//     }
//   };

//   const copyFormItem = (id: string) => {
//     const item = formItems.value.find(item => item.id === id);
//     if (!item) return;
    
//     const newItem: FormItem = {
//       ...JSON.parse(JSON.stringify(item)),
//       id: generateId(),
//       field: `field_${generateId()}`
//     };
    
//     const index = formItems.value.findIndex(item => item.id === id);
//     formItems.value.splice(index + 1, 0, newItem);
//     activeId.value = newItem.id;
//   };

//   const selectItem = (id: string) => {
//     activeId.value = id;
//   };

//   const clearForm = () => {
//     formItems.value = [];
//     activeId.value = null;
//   };

//   const generateJson = () => {
//     return JSON.stringify({
//       formConf: formConf.value,
//       formItems: formItems.value
//     }, null, 2);
//   };

//   return {
//     formConf,
//     formItems,
//     activeId,
//     activeItem,
//     addFormItem,
//     updateFormItem,
//     deleteFormItem,
//     copyFormItem,
//     selectItem,
//     clearForm,
//     generateJson
//   };
// }


const generateId = () => Math.random().toString(36).substr(2, 9);

const getDefaultValue = (type: string): any => {
  const map: Record<string, any> = {
    input: '',
    textarea: '',
    password: '',
    number: null,
    select: undefined,
    radio: undefined,
    checkbox: [],
    switch: false,
    date: null,
    dateRange: [],
    time: null,
    rate: 0,
    upload: [],
    color: '#1890ff'
  };
  return map[type] ?? '';
};

export function useFormBuilder() {
  const formConf = ref<FormConf>({ ...formConfDefault });
  const formItems = ref<FormItem[]>([]);
  const activeId = ref<string | null>(null);

  const activeItem = computed(() => 
    formItems.value.find(item => item.id === activeId.value) || null
  );

  const createFormItem = (template: FormItemTemplate): FormItem => {
    const id = generateId();
    return {
      id,
      type: template.type,
      tag: template.tag,
      tagIcon: template.tagIcon,
      label: template.label,
      field: `field_${id}`,
      placeholder: template.defaultProps?.placeholder || '',
      required: false,
      disabled: false,
      span: 24,
      defaultValue: getDefaultValue(template.type),
      props: { ...template.defaultProps },
      options: template.options ? JSON.parse(JSON.stringify(template.options)) : undefined,
      regList: [],
      changeTag: template.changeTag,
      layout: template.layout,
      document: template.document,
      // 复制所有默认属性
      ...template.defaultProps
    };
  };

  const addFormItem = (template: FormItemTemplate) => {
    const item = createFormItem(template);
    formItems.value.push(item);
    activeId.value = item.id;
    return item;
  };

  const updateFormItem = (id: string, updates: Partial<FormItem>) => {
    const index = formItems.value.findIndex(item => item.id === id);
    if (index > -1) {
      formItems.value[index] = { ...formItems.value[index], ...updates };
    }
  };

  // 切换组件类型
  const changeTag = (id: string, newTag: FormItemTemplate) => {
    const index = formItems.value.findIndex(item => item.id === id);
    if (index === -1) return;

    const oldItem = formItems.value[index];
    const newItem = createFormItem(newTag);
    
    // 保留原有值
    newItem.id = oldItem.id;
    newItem.field = oldItem.field;
    newItem.span = oldItem.span;
    newItem.label = oldItem.label;
    
    // 如果类型兼容，保留默认值
    if (['input', 'textarea', 'password'].includes(oldItem.type) && 
        ['input', 'textarea', 'password'].includes(newItem.type)) {
      newItem.defaultValue = oldItem.defaultValue;
    }
    
    formItems.value.splice(index, 1, newItem);
    activeId.value = newItem.id;
  };

  const deleteFormItem = (id: string) => {
    const index = formItems.value.findIndex(item => item.id === id);
    if (index > -1) {
      formItems.value.splice(index, 1);
      if (activeId.value === id) {
        activeId.value = null;
      }
    }
  };

  const copyFormItem = (id: string) => {
    const item = formItems.value.find(item => item.id === id);
    if (!item) return;
    
    const newItem: FormItem = {
      ...JSON.parse(JSON.stringify(item)),
      id: generateId(),
      field: `field_${generateId()}`
    };
    
    const index = formItems.value.findIndex(item => item.id === id);
    formItems.value.splice(index + 1, 0, newItem);
    activeId.value = newItem.id;
  };

  const selectItem = (id: string) => {
    activeId.value = id;
  };

  const updateFormConf = (updates: Partial<FormConf>) => {
    Object.assign(formConf.value, updates);
  };

  const clearForm = () => {
    formItems.value = [];
    activeId.value = null;
  };

  const generateJson = () => {
    return JSON.stringify({
      formConf: formConf.value,
      formItems: formItems.value
    }, null, 2);
  };

  return {
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
  };
}