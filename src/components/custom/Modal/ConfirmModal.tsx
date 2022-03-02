import React from 'react';
import { noop } from '@utillib';
import { Modal } from './Modal';

export interface ConfirmModalProps extends StyledProps {
  visible: boolean;
  title?: string;
  content?: string | React.ReactNode;
  children?: string | React.ReactNode;
  onCancel?: any;
  onConfirm?: any;
  confirmText?: string;
  confirmColor?: string;
  cancelText?: string;
  cancelColor?: string;
  maskClosable?: boolean;
  btnFootClass?: string;
  onClose?: () => any;
}

export function ConfirmModal({
  visible,
  title,
  content,
  onCancel = noop,
  onConfirm = noop,
  confirmText = '确定',
  confirmColor = '#0066ff',
  cancelText = '取消',
  cancelColor = '#6C7078',
  maskClosable = true,
  className,
  style,
  btnFootClass,
  children,
  onClose
}: ConfirmModalProps) {
  return (
    <Modal
      visible={visible}
      title={title}
      maskClosable={maskClosable}
      className={className}
      onClose={onClose}
      style={style}
    >
      {(!!children || !!content) && <Modal.Body>{children || content}</Modal.Body>}
      <Modal.Footer>
        <Modal.FooterConfirmBtnGroup
          {...{
            onCancel: onClose,
            onConfirm,
            confirmText,
            confirmColor,
            cancelText,
            cancelColor,
            btnFootClass
          }}
        />
      </Modal.Footer>
    </Modal>
  );
}
