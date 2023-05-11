function showPopup(title, icon, confirmButtonColor, customClass, allowOutsideClick) {
    Swal.fire({
        title: title,
        icon: icon,
        confirmButtonColor: confirmButtonColor,
        customClass: customClass,
        allowOutsideClick: allowOutsideClick,
    })
}
