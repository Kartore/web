import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
	stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
	addons: [
		'@storybook/addon-links',
		'@storybook/addon-essentials',
		'@storybook/addon-interactions',
		'@storybook/addon-themes',
		'@chromatic-com/storybook',
	],
	build: {
		test: {
			disabledAddons: [
				'@storybook/addon-docs',
				'@storybook/addon-essentials/docs',
			],
		},
	},
	framework: {
		name: '@storybook/react-vite',
		options: {},
	},
	docs: {},
};

export default config;
