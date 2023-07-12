import { ipcRenderer } from "electron";

async function dataToImport() {
  ipcRenderer.send("import-json");
}

export default dataToImport;
