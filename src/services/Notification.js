import 'izitoast/dist/css/iziToast.min.css'
import iZitoast from 'izitoast'
const toast = {
  // Success Notification
  success: (
    message,
    position = 'topRight',
    timeout = 5000,
    title = 'Success'
  ) => {
    return iZitoast.success({
      // title: '',
      message: message,
      position: position,
      timeout: timeout
    })
  },
  // End of Success Notification
  // Error Notification
  error: (message, position = 'topRight', timeout = 5000, title = 'Error') => {
    return iZitoast.error({
      // title: '',
      message: message,
      position: position,
      timeout: timeout
    })
  },
  // End of Error Notification
  // Info Notification
  info: (message, position = 'topRight', timeout = 5000, title = 'Info') => {
    return iZitoast.info({
      // title: '',
      message: message,
      position: position,
      timeout: timeout
    })
  },
  // End of Info Notification
  // Warning Notification
  warning: (
    message,
    position = 'topRight',
    timeout = 5000,
    title = 'Warning'
  ) => {
    return iZitoast.warning({
      // title: '',
      message: message,
      position: position,
      timeout: timeout
    })
  }
  // End of Warning Notification
}

export default toast
