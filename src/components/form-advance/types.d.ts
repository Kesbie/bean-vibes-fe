declare namespace App.Components.FormAdvance {
  type AntdFormProps<T extends object> = import('antd').FormProps<T>;
  type AntdFormInstance<T extends object> = import('antd').FormInstance<T>;
  type AntdFormItemProps = import('antd').FormItemProps;
  type AntdModalProps = import('antd').ModalProps;

  type InputProps<T extends object = object> = T & {
    name?: string | string[];
    cols?: number;
    form?: AntdFormInstance;
  }

  type FormElement = AntdFormItemProps & {
    type?: string,
    inputProps?: InputProps,
    noFormItem?: boolean,
    cols?: number,
  }

  type OnFinishEvent<T extends object> = (info: {
    values: T;
    form: AntdFormInstance<T>;
    api: FormAdvanceRef;
  }) => void;

  type FormAdvanceProps<T extends object> = Omit<AntdFormProps<T>, 'onFinish'> & DynamicRendererProps<T>
    & {
      hasModal?: boolean;
      modalProps?: AntdModalProps;
      onFinish?: OnFinishEvent<T>;
      name?: string;
      cols?: number;
    };

  type FormAdvanceRef = {
    show: () => void;
    hide: () => void;
    edit: (values: T) => void;
    reset: () => void;
    loading: () => void;
    done: () => void;
    fail: () => void
  }



  // type ElementTypes = Record<string, React.ComponentType<Record<string, unknown>>>;
  type ElementTypes = {
    [key: string]: React.ComponentElement
  };

  type DynamicRendererProps<T extends object> = {
    formKey?: string
    elements: FormElement<T>[];
    elementTypes?: ElementTypes;
    form?: AntdFormInstance<T>;
    enable?: boolean;
  }

  type UseFormAdvanceConfigs<T extends object> = Omit<FormAdvanceProps<T>, 'form' | 'ref'> & {
    dependencies?: unknown[];
    enable?: boolean;
  }
}
