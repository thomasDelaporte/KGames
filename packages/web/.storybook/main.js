module.exports = {
	
	core: {
		builder: "storybook-builder-vite"
	},

    stories: [
		"../src/**/*.stories.mdx",
		"../src/**/*.stories.@(js|jsx|ts|tsx)"
    ],

    addons: [
		"@storybook/addon-links",
		"@storybook/addon-essentials"
    ],

    framework: "@storybook/react",

	async viteFinal(config, { configType }) {

		config.optimizeDeps.include.push('@kgames/common');

		return config;
	},
}