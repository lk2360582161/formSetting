// import type { FormConf, ComponentGroup } from '../types/form';

// export const formConfDefault: FormConf = {
//   formRef: 'formRef',
//   formModel: 'formData',
//   size: 'middle',
//   layout: 'horizontal',
//   labelWidth: 100,
//   labelAlign: 'right',
//   disabled: false
// };

// export const componentGroups: ComponentGroup[] = [
//   {
//     title: '基础字段',
//     icon: 'EditOutlined',
//     components: [
//       { type: 'input', label: '单行文本', icon: 'EditOutlined', defaultProps: { placeholder: '请输入' } },
//       { type: 'textarea', label: '多行文本', icon: 'FileTextOutlined', defaultProps: { autoSize: { minRows: 3 } } },
//       { type: 'password', label: '密码', icon: 'LockOutlined', defaultProps: {} },
//       { type: 'number', label: '数字输入', icon: 'NumberOutlined', defaultProps: {} }
//     ]
//   },
//   {
//     title: '选择字段',
//     icon: 'CheckSquareOutlined',
//     components: [
//       { type: 'select', label: '下拉选择', icon: 'DownOutlined', defaultProps: {}, options: [{ label: '选项1', value: '1' }] },
//       { type: 'radio', label: '单选框', icon: 'CheckCircleOutlined', defaultProps: {}, options: [{ label: '选项1', value: '1' }] },
//       { type: 'checkbox', label: '多选框', icon: 'CheckSquareOutlined', defaultProps: {}, options: [{ label: '选项1', value: '1' }] },
//       { type: 'switch', label: '开关', icon: 'SwapOutlined', defaultProps: {} }
//     ]
//   },
//   {
//     title: '高级字段',
//     icon: 'CalendarOutlined',
//     components: [
//       { type: 'date', label: '日期选择', icon: 'CalendarOutlined', defaultProps: {} },
//       { type: 'dateRange', label: '日期范围', icon: 'CalendarOutlined', defaultProps: {} },
//       { type: 'time', label: '时间选择', icon: 'ClockCircleOutlined', defaultProps: {} },
//       { type: 'rate', label: '评分', icon: 'StarOutlined', defaultProps: {} },
//       { type: 'upload', label: '文件上传', icon: 'UploadOutlined', defaultProps: { buttonText: '点击上传' } },
//       { type: 'color', label: '颜色选择', icon: 'BgColorsOutlined', defaultProps: {} }
//     ]
//   }
// ];
// src/views/form-builder/config.ts
import type { FormConf, ComponentGroup,FormItemTemplate } from '../types/form';

export const formConfDefault: FormConf = {
  formRef: 'formRef',
  formModel: 'formData',
  size: 'middle',
  layout: 'horizontal',
  labelWidth: 100,
  labelAlign: 'right',
  disabled: false,
  gutter: 15,
  formBtns: true,
  unFocusedComponentBorder: false
};

// 日期格式配置
export const dateTimeFormat: Record<string, string> = {
  date: 'YYYY-MM-DD',
  week: 'YYYY 第 ww 周',
  month: 'YYYY-MM',
  year: 'YYYY',
  datetime: 'YYYY-MM-DD HH:mm:ss',
  daterange: 'YYYY-MM-DD',
  monthrange: 'YYYY-MM',
  datetimerange: 'YYYY-MM-DD HH:mm:ss'
};

// 输入组件
export const inputComponents: FormItemTemplate[] = [
  {
    type: 'input',
    tag: 'a-input',
    tagIcon: 'input',
    label: '单行文本',
    icon: 'EditOutlined',
    changeTag: true,
    document: 'https://www.antdv.com/components/input-cn',
    defaultProps: {
      placeholder: '请输入',
      allowClear: true,
      maxlength: null,
      'show-word-limit': false,
      readonly: false,
      disabled: false
    }
  },
  {
    type: 'textarea',
    tag: 'a-textarea',
    tagIcon: 'textarea',
    label: '多行文本',
    icon: 'FileTextOutlined',
    changeTag: true,
    document: 'https://www.antdv.com/components/input-cn',
    defaultProps: {
      placeholder: '请输入',
      autosize: { minRows: 4, maxRows: 4 },
      maxlength: null,
      'show-word-limit': false,
      readonly: false,
      disabled: false
    }
  },
  {
    type: 'password',
    tag: 'a-input-password',
    tagIcon: 'password',
    label: '密码',
    icon: 'LockOutlined',
    changeTag: true,
    document: 'https://www.antdv.com/components/input-cn',
    defaultProps: {
      placeholder: '请输入密码',
      visibilityToggle: true,
      allowClear: true,
      disabled: false
    }
  },
  {
    type: 'number',
    tag: 'a-input-number',
    tagIcon: 'number',
    label: '计数器',
    icon: 'NumberOutlined',
    changeTag: true,
    document: 'https://www.antdv.com/components/input-number-cn',
    defaultProps: {
      placeholder: '',
      min: undefined,
      max: undefined,
      step: 1,
      precision: undefined,
      'step-strictly': false,
      disabled: false
    }
  }
];

// 选择组件
export const selectComponents: FormItemTemplate[] = [
  {
    type: 'select',
    tag: 'a-select',
    tagIcon: 'select',
    label: '下拉选择',
    icon: 'DownOutlined',
    changeTag: true,
    document: 'https://www.antdv.com/components/select-cn',
    defaultProps: {
      placeholder: '请选择',
      allowClear: true,
      disabled: false,
      filterable: false,
      multiple: false,
      mode: null
    },
    options: [
      { label: '选项一', value: '1' },
      { label: '选项二', value: '2' }
    ]
  },
  {
    type: 'radio',
    tag: 'a-radio-group',
    tagIcon: 'radio',
    label: '单选框组',
    icon: 'CheckCircleOutlined',
    changeTag: true,
    document: 'https://www.antdv.com/components/radio-cn',
    defaultProps: {
      disabled: false,
      optionType: 'default',
      buttonStyle: 'outline',
      size: 'middle'
    },
    options: [
      { label: '选项一', value: '1' },
      { label: '选项二', value: '2' }
    ]
  },
  {
    type: 'checkbox',
    tag: 'a-checkbox-group',
    tagIcon: 'checkbox',
    label: '多选框组',
    icon: 'CheckSquareOutlined',
    changeTag: true,
    document: 'https://www.antdv.com/components/checkbox-cn',
    defaultProps: {
      disabled: false,
      optionType: 'default',
      size: 'middle'
    },
    options: [
      { label: '选项一', value: '1' },
      { label: '选项二', value: '2' }
    ]
  },
  {
    type: 'switch',
    tag: 'a-switch',
    tagIcon: 'switch',
    label: '开关',
    icon: 'SwapOutlined',
    changeTag: true,
    document: 'https://www.antdv.com/components/switch-cn',
    defaultProps: {
      disabled: false,
      checkedChildren: '开',
      unCheckedChildren: '关'
    }
  }
];

// 高级组件
export const advancedComponents: FormItemTemplate[] = [
  {
    type: 'date',
    tag: 'a-date-picker',
    tagIcon: 'date',
    label: '日期选择',
    icon: 'CalendarOutlined',
    changeTag: true,
    document: 'https://www.antdv.com/components/date-picker-cn',
    defaultProps: {
      placeholder: '请选择日期',
      format: 'YYYY-MM-DD',
      'value-format': 'YYYY-MM-DD',
      disabled: false,
      allowClear: true
    }
  },
  {
    type: 'dateRange',
    tag: 'a-range-picker',
    tagIcon: 'date-range',
    label: '日期范围',
    icon: 'CalendarOutlined',
    changeTag: true,
    document: 'https://www.antdv.com/components/date-picker-cn',
    defaultProps: {
      placeholder: ['开始日期', '结束日期'],
      format: 'YYYY-MM-DD',
      'value-format': 'YYYY-MM-DD',
      disabled: false,
      allowClear: true
    }
  },
  {
    type: 'time',
    tag: 'a-time-picker',
    tagIcon: 'time',
    label: '时间选择',
    icon: 'ClockCircleOutlined',
    changeTag: true,
    document: 'https://www.antdv.com/components/time-picker-cn',
    defaultProps: {
      placeholder: '请选择时间',
      format: 'HH:mm:ss',
      disabled: false,
      allowClear: true
    }
  },
  {
    type: 'rate',
    tag: 'a-rate',
    tagIcon: 'rate',
    label: '评分',
    icon: 'StarOutlined',
    changeTag: true,
    document: 'https://www.antdv.com/components/rate-cn',
    defaultProps: {
      count: 5,
      'allow-half': false,
      'allow-clear': true,
      disabled: false
    }
  },
  {
    type: 'upload',
    tag: 'a-upload',
    tagIcon: 'upload',
    label: '文件上传',
    icon: 'UploadOutlined',
    changeTag: true,
    document: 'https://www.antdv.com/components/upload-cn',
    defaultProps: {
      action: '',
      multiple: false,
      'max-count': 1,
      'list-type': 'text',
      buttonText: '点击上传',
      disabled: false,
      'auto-upload': true,
      showTip: false,
      fileSize: 2,
      sizeUnit: 'MB',
      accept: ''
    }
  },
  {
    type: 'color',
    tag: 'color-picker',
    tagIcon: 'color',
    label: '颜色选择',
    icon: 'BgColorsOutlined',
    changeTag: true,
    document: 'https://www.antdv.com/components/color-picker-cn',
    defaultProps: {
      disabled: false,
      showText: true
    }
  }
];

// 布局组件
export const layoutComponents: FormItemTemplate[] = [
  {
    type: 'row',
    tag: 'a-row',
    tagIcon: 'row',
    label: '行容器',
    icon: 'LayoutOutlined',
    layout: 'rowFormItem',
    document: 'https://www.antdv.com/components/grid-cn',
    defaultProps: {
      type: 'default',
      justify: 'start',
      align: 'top',
      gutter: 0
    }
  }
];

// 分组配置
export const componentGroups: ComponentGroup[] = [
  {
    title: '基础字段',
    icon: 'EditOutlined',
    components: inputComponents
  },
  {
    title: '选择字段',
    icon: 'CheckSquareOutlined',
    components: selectComponents
  },
  {
    title: '高级字段',
    icon: 'CalendarOutlined',
    components: advancedComponents
  }
];

// 获取所有组件列表（用于切换组件类型）
export const allComponents = [
  ...inputComponents,
  ...selectComponents,
  ...advancedComponents
];

// 触发方式映射
export const triggerMap: Record<string, string> = {
  'a-input': 'blur',
  'a-textarea': 'blur',
  'a-input-number': 'blur',
  'a-select': 'change',
  'a-radio-group': 'change',
  'a-checkbox-group': 'change',
  'a-switch': 'change',
  'a-date-picker': 'change',
  'a-range-picker': 'change',
  'a-time-picker': 'change',
  'a-rate': 'change'
};