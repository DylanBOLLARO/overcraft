import { ipcRenderer } from "electron";

async function dataToExport(
  title: any,
  data: any,
  playrace: any,
  versusrace: any
) {
  const jsonData = {
    buildOrder: data,
    playrace,
    versusrace,
    title: title,
  };

  ipcRenderer.send("export-json", jsonData);

  ipcRenderer.on("export-json-reply", (event, data) => {
    if (data.success) {
      alert("Le fichier JSON a été exporté avec succès !");
    } else {
      alert("Erreur lors de l'exportation du fichier JSON.");
    }
  });
}

export default dataToExport;
