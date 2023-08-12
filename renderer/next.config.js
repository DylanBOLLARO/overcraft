module.exports = {
	images: {
		unoptimized: true,
	},
	env: {
		SUPERYETI_API: process.env.SUPERYETI_API,
	},
	webpack: (config, { isServer }) => {
		if (!isServer) {
			config.target = "electron-renderer";
		}

		return config;
	},
};
