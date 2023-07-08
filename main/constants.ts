import * as path from "path";
import { app } from "electron";

export const PATH_MAIN_FOLDER: string = path.join(app.getAppPath(), "main");
export const PATH_DB_FOLDER: string = PATH_MAIN_FOLDER + "/db";
export const PATH_DB_FILE: string = path.join(PATH_DB_FOLDER, "database");
