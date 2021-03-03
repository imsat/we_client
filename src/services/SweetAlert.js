import Swal from 'sweetalert2'

const swal = {
  alert(options) {
    Swal.fire(options)
  },
  alertSuccess({
   title = "Success!", text = "That's all done!", timer = 1000, showConfirmationButton = false
 } = {}) {
    this.alert({
      title: title,
      text: text,
      timer: timer,
      showConfirmButton: showConfirmationButton,
      type: 'success'
    });
  },
  alertError({
     title = "Error!", text = "Oops...Something went wrong"
   } = {}) {
    this.alert({
      title: title,
      text: text,
      type: 'error'
    });
  },
  confirm(callback, options) {
    options = Object.assign({
      title: 'Are you sure?',
      text: 'You will not be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancel',
      confirmButtonText: 'Delete',
    }, options);

    Swal.fire(options).then(callback)
  },
  changeConfirm(callback, options) {
    options = Object.assign({
      title: 'Are you sure to change!!',
        icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancel',
      confirmButtonText: 'Ok',
    }, options);

    Swal.fire(options).then(callback)
  }
}

export default swal
