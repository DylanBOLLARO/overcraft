import { BrowserWindow, app, dialog, ipcMain } from "electron";
import serve from "electron-serve";
import * as fs from "fs";
import { createWindow } from "./helpers";
import {
	SETTINGS_OF_MAIN_WINDOW,
	SETTINGS_OF_SETTINGS_WINDOW,
} from "./constants";

const isProd: boolean = process.env.NODE_ENV === "production";
const port = process.argv[2];

let mainWindow: BrowserWindow,
	settingsWindow: BrowserWindow,
	settingsPageIsOpen: boolean = false,
	db: any = null;

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

				dialog
					.showMessageBox(settingsWindow, options)
					.then((response) => {
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

	mainWindow = createWindow("main", SETTINGS_OF_MAIN_WINDOW);

	if (isProd) {
		await mainWindow.loadURL("app://./overlay/overlay.html");
	} else {
		await mainWindow.loadURL(`http://localhost:${port}/overlay/overlay`);
		mainWindow.webContents.openDevTools();
	}
})();

app.on("ready", () => {
	ipcMain.handle("create-settings-page", async (event) => {
		createSecondWindow();
	});
});

app.on("window-all-closed", () => {
	app.quit();
});

// ipcMain.handle("db-query", async (event, sqlQuery) => {
// 	return new Promise((resolve, reject) => {
// 		db.all(sqlQuery, (err: any, rows: any) => {
// 			if (err) {
// 				reject(err.message);
// 			} else {
// 				resolve(rows);
// 			}
// 		});
// 	});
// });

// ipcMain.handle("add-data-to-db", async (event, data: any) => {
// 	return new Promise((resolve, reject) => {
// 		const { title, playrace, versusrace } = data;
// 		db.run(
// 			"INSERT INTO build_order (title, playrace, versusrace ) VALUES (?, ?, ?);",
// 			[title, playrace, versusrace],
// 			function (err: any) {
// 				if (err) {
// 					reject(err.message);
// 				} else {
// 					console.log(
// 						"title : " + title,
// 						playrace + " vs " + versusrace
// 					);
// 					settingsWindow.webContents.send("data-added");
// 					resolve({
// 						success: true,
// 						message: "Data added successfully",
// 					});
// 				}
// 			}
// 		);
// 	});
// });

// ipcMain.handle("add-line-build-order-to-db", async (event, data: any) => {
// 	return new Promise((resolve, reject) => {
// 		const { timer, population, content, build_order_id } = data;
// 		db.run(
// 			"INSERT INTO etapes (timer, population,content,build_order_id  ) VALUES (?, ?,?,?);",
// 			[timer, population, content, build_order_id],
// 			function (err: any) {
// 				if (err) {
// 					console.log("fail");
// 					reject(err.message);
// 				} else {
// 					console.log("succes");
// 					settingsWindow.webContents.send("data-line-added");
// 					resolve({
// 						success: true,
// 						message: "Data added successfully",
// 					});
// 				}
// 			}
// 		);
// 	});
// });
