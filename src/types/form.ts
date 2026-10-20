// src/views/form-builder/types.ts

export interface FormConf {
  formRef: string;
  formModel: string;
  size: 'small' | 'middle' | 'large';
  layout: 'horizontal' | 'vertical' | 'inline';
  labelWidth: number;
  labelAlign: 'left' | 'right';
  disabled: boolean;
  gutter?: number;
  formBtns?: boolean;
  unFocusedComponentBorder?: boolean;
}

export interface FormOption {
  label: string;
  value: string | number;
  disabled?: boolean;
}

export interface ValidationRule {
  pattern?: string;
  message?: string;
  trigger?: 'blur' | 'change';
}

export interface FormItem {
  id: string;
  type: string;
  tag?: string;
  label: string;
  field: string;
  vModel?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  readonly?: boolean;
  span?: number;
  defaultValue?: any;
  props?: Record<string, any>;
  options?: FormOption[];
  rules?: ValidationRule[];
  // 扩展字段
  changeTag?: boolean;
  tagIcon?: string;
  layout?: string;
  document?: string;
  // 各种属性
  prepend?: string;
  append?: string;
  'prefix-icon'?: string;
  'suffix-icon'?: string;
  maxlength?: number;
  'show-word-limit'?: boolean;
  'show-password'?: boolean;
  min?: number;
  max?: number;
  step?: number;
  precision?: number;
  'controls-position'?: string;
  'step-strictly'?: boolean;
  'active-text'?: string;
  'inactive-text'?: string;
  'active-color'?: string;
  'inactive-color'?: string;
  'active-value'?: any;
  'inactive-value'?: any;
  'allow-half'?: boolean;
  'show-text'?: boolean;
  'show-score'?: boolean;
  'show-stops'?: boolean;
  range?: boolean;
  border?: boolean;
  clearable?: boolean;
  filterable?: boolean;
  multiple?: boolean;
  'auto-upload'?: boolean;
  showTip?: boolean;
  buttonText?: string;
  fileSize?: number;
  sizeUnit?: string;
  accept?: string;
  action?: string;
  name?: string;
  'list-type'?: string;
  format?: string;
  'value-format'?: string;
  'range-separator'?: string;
  'start-placeholder'?: string;
  'end-placeholder'?: string;
  optionType?: 'default' | 'button';
  autosize?: { minRows?: number; maxRows?: number };
  style?: { width?: string };
  labelWidth?: number | null;
  gutter?: number;
  justify?: string;
  align?: string;
  regList?: ValidationRule[];
  dataType?: 'dynamic' | 'static';
  labelKey?: string;
  valueKey?: string;
  childrenKey?: string;
  separator?: string;
  'show-all-levels'?: boolean;
  'color-format'?: string;
  'show-alpha'?: boolean;
  componentName?: string;
  layoutTree?: boolean;
  renderKey?: number;
  checkedChildren?: any;
   unCheckedChildren?: any;
}

export interface FormItemTemplate {
  type: string;
  label: string;
  icon: string;
  tag?: string;
  tagIcon?: string;
  defaultProps: Record<string, any>;
  options?: FormOption[];
  changeTag?: boolean;
  layout?: string;
  document?: string;
}

export interface ComponentGroup {
  title: string;
  icon: string;
  components: FormItemTemplate[];
}