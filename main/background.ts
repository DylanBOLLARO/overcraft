import { BrowserWindow, app, dialog, ipcMain } from "electron";
import serve from "electron-serve";
import { createWindow } from "./helpers";
import * as fs from "fs";
import * as sqlite3 from "sqlite3";
import { PATH_DB_FOLDER, PATH_DB_FILE } from "./constants.js";

const isProd: boolean = process.env.NODE_ENV === "production";
const port = process.argv[2];

let mainWindow: BrowserWindow,
  settingsWindow: BrowserWindow,
  settingsPageIsOpen: boolean = false;

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
        width: 800,
        height: 600,
        parent: mainWindow,
        modal: true,
        webPreferences: {
          nodeIntegration: true,
        },
      });

      if (isProd) {
        await settingsWindow.loadURL("app://./settings/settings.html");
      } else {
        await settingsWindow.loadURL(
          `http://localhost:${port}/settings/settings`
          // settingsWindow.webContents.openDevTools();
        );
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

      settingsPageIsOpen = true;
    } catch (error) {
      console.log(JSON.stringify(error));
    }
  }
};

(async () => {
  await app.whenReady();

  mainWindow = createWindow("main", {
    width: 1000,
    height: 600,
    show: true,
  });

  if (isProd) {
    await mainWindow.loadURL("app://./overlay/overlay.html");
  } else {
    await mainWindow.loadURL(`http://localhost:${port}/overlay/overlay`);
    // mainWindow.webContents.openDevTools();
  }
  const db = new sqlite3.Database(PATH_DB_FILE, (err) => {
    if (err) {
      console.error(err.message);
      process.exit(1);
    }
    console.log("Connected to the SQLite database");
  });
})();

app.on("ready", () => {
  ipcMain.handle("create-settings-page", async (event) => {
    createSecondWindow();
  });
});

app.on("window-all-closed", () => {
  app.quit();
});
