import { WorkBook, WorkSheet, utils, writeFile } from "xlsx";

class Excel {
  private static s2ab(s: string): ArrayBuffer {
    const buf = new ArrayBuffer(s.length);
    const view = new Uint8Array(buf);
    for (let i = 0; i !== s.length; ++i) view[i] = s.charCodeAt(i) & 0xff;
    return buf;
  }

  public static exportAsExcelFile(elementId: string): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        const table = document.getElementById(elementId)!;
        const ws: WorkSheet = utils.table_to_sheet(table);
        const wb: WorkBook = utils.book_new();
        utils.book_append_sheet(wb, ws, "Sheet1");

        const wbout = writeFile(wb, "data_export.xlsx");

        const fileName = "data_export.xlsx";
        const blob = new Blob([Excel.s2ab(wbout)], {
          type: "application/octet-stream",
        });

        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        setTimeout(() => {
          window.URL.revokeObjectURL(url);
          document.body.removeChild(a);
          resolve(); // Resolve the Promise when the export is successful
        }, 0);
      } catch (error) {
        reject(error); // Reject the Promise if any error occurs
      }
    });
  }
}

export default Excel;
