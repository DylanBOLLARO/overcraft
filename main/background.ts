import { BrowserWindow, app, dialog, ipcMain } from "electron";
import serve from "electron-serve";
import { createWindow } from "./helpers";
import * as fs from "fs";
import * as sqlite3 from "sqlite3";
import { databaseCreation } from "./functions/databaseCreation";
import {
  PATH_DB_FOLDER,
  PATH_DB_FILE,
  SETTINGS_OF_MAIN_WINDOW,
  SETTINGS_OF_SETTINGS_WINDOW,
} from "./constants";

const isProd: boolean = process.env.NODE_ENV === "production";
const port = process.argv[2];

let mainWindow: BrowserWindow,
  settingsWindow: BrowserWindow,
  settingsPageIsOpen: boolean = false,
  db: any = null;

(async () => {
  if (!fs.existsSync(PATH_DB_FOLDER)) {
    await fs.promises.mkdir(PATH_DB_FOLDER, { recursive: true });
  }
})();

if (isProd) {
  serve({ directory: "app" });
} else {
  app.setPath("userData", `${app.getPath("userData")} (development)`);
}

const createSecondWindow = async () => {
  if (!settingsPageIsOpen) {
    try {
      settingsWindow = createWindow("settings", {
        ...SETTINGS_OF_SETTINGS_WINDOW,
        ...{
          parent: mainWindow,
        },
      });

      if (isProd) {
        await settingsWindow.loadURL("app://./settings/settings.html");
      } else {
        await settingsWindow.loadURL(
          `http://localhost:${port}/settings/settings`
        );
        settingsWindow.webContents.openDevTools();
      }

      settingsWindow.on("close", (event) => {
        event.preventDefault();

        const options = {
          type: "question",
          buttons: ["Fermer", "Annuler"],
          defaultId: 0,
          title: "Confirmation",
          message: "Voulez-vous vraiment fermer la fenêtre ?",
          cancelId: 1,
        };

        dialog.showMessageBox(settingsWindow, options).then((response) => {
          const { response: buttonIndex } = response;

          if (buttonIndex === 0) {
            settingsWindow.destroy();
            settingsPageIsOpen = false;
          }
        });
      });

      // db.all("SELECT * FROM etapes", (err, rows) => {
      //   if (err) {
      //     console.error("Erreur lors de l'exécution de la requête :", err);
      //     return;
      //   }

      //   console.log("Résultats de la requête :", rows);
      // });

      settingsPageIsOpen = true;
    } catch (error) {
      console.log(JSON.stringify(error));
    }
  }
};

(async () => {
  await app.whenReady();

  mainWindow = createWindow("main", SETTINGS_OF_MAIN_WINDOW);

  if (isProd) {
    await mainWindow.loadURL("app://./overlay/overlay.html");
  } else {
    await mainWindow.loadURL(`http://localhost:${port}/overlay/overlay`);
    mainWindow.webContents.openDevTools();
  }

  db = new sqlite3.Database(PATH_DB_FILE);
  databaseCreation(db);
})();

app.on("ready", () => {
  ipcMain.handle("create-settings-page", async (event) => {
    createSecondWindow();
  });
});

app.on("window-all-closed", () => {
  app.quit();
});

ipcMain.handle("db-query", async (event, sqlQuery) => {
  return new Promise((resolve, reject) => {
    db.all(sqlQuery, (err: any, rows: any) => {
      if (err) {
        reject(err.message);
      } else {
        resolve(rows);
      }
    });
  });
});
