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
