'use client';

import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  InfoCircleOutlined,
  WarningOutlined,
} from '@ant-design/icons';
import { ToastType } from '../types/IToast';

export const ToastIcon = ({ type }: { type: ToastType }) => {
  switch (type) {
    case 'success':
      return <CheckCircleOutlined />;

    case 'error':
      return <CloseCircleOutlined />;

    case 'info':
      return <InfoCircleOutlined />;

    case 'warning':
      return <WarningOutlined />;

    default:
      return null;
  }
};
