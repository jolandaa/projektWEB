export const enum ToastIcon {
    DONE = 'circle-done',
    ERROR = 'circle-error',
    CLOSE = 'circle-close'
}

export const enum ToastStatus {
    SUCCESS = 'success',
    CALLCENTER_SUCCESS = 'success callcenter',
    ERROR = 'error'
}

export interface ToastData {
    icon: ToastIcon.DONE | ToastIcon.ERROR | ToastIcon.CLOSE;
    message: string;
    status: ToastStatus;
}

export const DEFAULT_SUCCESS_TOAST: ToastData = {
  icon: ToastIcon.DONE,
  message: 'Changes saved!',
  status: ToastStatus.SUCCESS
}

export const DEFAULT_ERROR_TOAST: ToastData = {
    icon: ToastIcon.ERROR,
    message: 'Changes have not been saved.',
    status: ToastStatus.ERROR
}

export const DEFAULT_CLOSE_TOAST: ToastData = {
    icon: ToastIcon.CLOSE,
    message: 'You cannot remove this group. It’s used on another flow.',
    status: ToastStatus.ERROR
}
