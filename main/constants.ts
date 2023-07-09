import * as path from "path";
import { app } from "electron";

export const PATH_MAIN_FOLDER: string = path.join(app.getAppPath(), "main");
export const PATH_DB_FOLDER: string = PATH_MAIN_FOLDER + "/db";
export const PATH_DB_FILE: string = path.join(PATH_DB_FOLDER, "db.sqlite");

const SETTINGS_COMMUN_OF_BOTH_WINDOW = {
  autoHideMenuBar: true,
  backgroundColor: "#27272a",
};

export const SETTINGS_OF_MAIN_WINDOW: object = {
  ...SETTINGS_COMMUN_OF_BOTH_WINDOW,
  width: 1000,
  height: 600,
  show: true,
  minHeight: 500,
  minWidth: 500,
};
export const SETTINGS_OF_SETTINGS_WINDOW: object = {
  ...SETTINGS_COMMUN_OF_BOTH_WINDOW,
  width: 1200,
  height: 800,
  modal: true,
  minHeight: 600,
  minWidth: 800,
  webPreferences: {
    nodeIntegration: true,
  },
};
