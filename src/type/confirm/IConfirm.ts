export interface ConfirmModalProps {
  visible: boolean;
  title: string;
  onConfirm: () => void;
  onCancel: () => void;
  message: string;
}
