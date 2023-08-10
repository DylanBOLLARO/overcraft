import { BrowserWindow, app, dialog, globalShortcut, ipcMain } from "electron";
import serve from "electron-serve";
import { createWindow } from "./helpers";
import {
	SETTINGS_OF_SETTINGS_WINDOW,
	SETTINGS_OF_PLAY_WINDOW,
} from "./constants";

const isProd: boolean = process.env.NODE_ENV === "production";
const port = process.argv[2];

let mainWindow: BrowserWindow,
	playWindow: BrowserWindow,
	playWindowIsOpen: boolean = false;

if (isProd) {
	serve({ directory: "app" });
} else {
	app.setPath("userData", `${app.getPath("userData")} (development)`);
}

const createSecondWindow = async () => {
	if (!playWindowIsOpen) {
		try {
			playWindow = createWindow("play", {
				...SETTINGS_OF_PLAY_WINDOW,
			});

			playWindow.setAlwaysOnTop(true);
			// playWindow.setIgnoreMouseEvents(true);
			if (isProd) {
				await playWindow.loadURL("app://./play/play.html");
			} else {
				await playWindow.loadURL(`http://localhost:${port}/play/play`);
				playWindow.webContents.openDevTools();
			}

			playWindowIsOpen = true;
		} catch (error) {
			console.log(JSON.stringify(error));
		}
	}

	globalShortcut.register("num7", () => {
		playWindow.webContents.send("num7", "Touche num7");
	});

	globalShortcut.register("num8", () => {
		playWindow.webContents.send("num8", "Touche num8");
	});

	globalShortcut.register("num9", () => {
		playWindow.webContents.send("num9", "Touche num9");
	});

	globalShortcut.register("num5", () => {
		playWindow.webContents.send("num5", "Touche num5");
	});

	globalShortcut.register("num6", () => {
		playWindow.webContents.send("num6", "Touche num6");
	});
};

(async () => {
	await app.whenReady();

	mainWindow = createWindow("main", SETTINGS_OF_SETTINGS_WINDOW);

	if (isProd) {
		await mainWindow.loadURL("app://./settings/settings.html");
	} else {
		await mainWindow.loadURL(`http://localhost:${port}/settings/settings`);
		// mainWindow.webContents.openDevTools();
	}
})();

app.on("ready", () => {
	ipcMain.handle("create-settings-page", async (event) => {
		createSecondWindow();
	});

	ipcMain.on("send-variable-to-main", (event, variableValue) => {
		console.log(
			"Valeur de la variable reçue dans le processus principal:",
			variableValue
		);
		mainWindow.webContents.send("variable-value-from-main", variableValue);
	});

	ipcMain.on("send-variable-to-play", (event, variableValue) => {
		console.log(
			"Valeur de la variable reçue dans le processus principal:",
			variableValue
		);
		playWindow.webContents.send("variable-value-from-main", variableValue);
	});
});

app.on("window-all-closed", () => {
	app.quit();
});
