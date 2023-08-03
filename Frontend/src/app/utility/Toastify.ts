import Swal from "sweetalert2";

class Toastify {
  public static success(msj?:string): void {
    Swal.mixin({
      toast: true,
      position: "bottom-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    }).fire(msj || "Əməliyyat uğurla başa çatdı!");
  }

  public static error(msj?: string): void {
    Swal.fire({
      icon: "error",
      title: "Xəta baş verdi!",
      text: msj || "Əməliyyat uğursuz oldu!",
    });
  }

  public static warning(action: (result: any) => void, msj?: string): void {
    Swal.fire({
      icon: "warning",
      title: "Diqqət!",
      text: msj || "Bu əməliyyatı yerinə yetirmək istədiyinizə əminsiniz?",
      showDenyButton: true,
      confirmButtonText: "Bəli",
      denyButtonText: `Xeyr`,
    }).then((result) => {
      action(result);
    });
  }
}

export default Toastify;
