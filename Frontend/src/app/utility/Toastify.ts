import Swal, { SweetAlertPosition } from "sweetalert2";

class Toastify {
  private _swall: typeof Swal;

  constructor(position?: SweetAlertPosition) {
    this._swall = Swal.mixin({
      toast: true,
      position: position || "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", this._swall.stopTimer);
        toast.addEventListener("mouseleave", this._swall.resumeTimer);
      },
    });
  }

  success(msj?: string, action?: () => void) {
    const successOptions: any = {
      title: msj || "Əməliyyat uğurla başa çatdı!",
      icon: "success",
    };

    if (action) {
      this._swall.fire(successOptions).then(() => action());
    } else {
      this._swall.fire(successOptions);
    }
  }

  error(msj?: string, action?: (result: any) => void) {
    const errorOptions: any = {
      icon: "error",
      title: msj || "Əməliyyat uğursuz oldu!",
    };

    if (action) {
      this._swall.fire(errorOptions).then((result) => action(result));
    } else {
      this._swall.fire(errorOptions);
    }
  }

  info(msj?: string) {
    Swal.fire({
      title: "Diqqət!",
      text: msj || "Dəyişiklik baş tutmadı",
      icon: "info",
    });
  }

  warning(action: (result: any) => void, msj?: string) {
    Swal.fire({
      icon: "warning",
      title: "Diqqət!",
      text: msj || "Bu əməliyyatı yerinə yetirmək istədiyinizə əminsiniz?",
      showDenyButton: true,
      confirmButtonText: "Bəli",
      denyButtonText: `Xeyr`,
    }).then(async (result) => {
      await action(result);
    });
  }
}

export default Toastify;
