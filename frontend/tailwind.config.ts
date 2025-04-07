import { join } from 'path';
import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';

const config = {
	darkMode: 'class',
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		// 3. Append the path to the Skeleton package
		join(require.resolve('@skeletonlabs/skeleton'), '../**/*.{html,js,svelte,ts}')
	],
	theme: {
		extend: {}
	},

	plugins: [
		require('@tailwindcss/typography'),
		require('@tailwindcss/forms'),
		// Courtesy of bholmesdev: https://gist.github.com/bholmesdev/f326094e2097068c5de8f818f9aa8713
		plugin(function spicyGradients({ addUtilities }) {
			addUtilities({
				'.bg-none': { 'background-image': 'none' },
				'.bg-gradient-to-t': {
					'background-image': 'linear-gradient(to top, var(--tw-gradient-stops))',
					'@supports (background: linear-gradient(in oklch to top, black, white))': {
						'background-image': 'linear-gradient(in oklch to top, var(--tw-gradient-stops))'
					}
				},
				'.bg-gradient-to-b': {
					'background-image': 'linear-gradient(to bottom, var(--tw-gradient-stops))',
					'@supports (background: linear-gradient(in oklch to bottom, black, white))': {
						'background-image': 'linear-gradient(in oklch to bottom, var(--tw-gradient-stops))'
					}
				},
				'.bg-gradient-to-l': {
					'background-image': 'linear-gradient(to left, var(--tw-gradient-stops))',
					'@supports (background: linear-gradient(in oklch to left, black, white))': {
						'background-image': 'linear-gradient(in oklch to left, var(--tw-gradient-stops))'
					}
				},
				'.bg-gradient-to-r': {
					'background-image': 'linear-gradient(to right, var(--tw-gradient-stops))',
					'@supports (background: linear-gradient(in oklch to right, black, white))': {
						'background-image': 'linear-gradient(in oklch to right, var(--tw-gradient-stops))'
					}
				},
				'.bg-gradient-to-tl': {
					'background-image': 'linear-gradient(to top left, var(--tw-gradient-stops))',
					'@supports (background: linear-gradient(in oklch to top left, black, white))': {
						'background-image': 'linear-gradient(in oklch to top left, var(--tw-gradient-stops))'
					}
				},
				'.bg-gradient-to-tr': {
					'background-image': 'linear-gradient(to top right, var(--tw-gradient-stops))',
					'@supports (background: linear-gradient(in oklch to top right, black, white))': {
						'background-image': 'linear-gradient(in oklch to top right, var(--tw-gradient-stops))'
					}
				},
				'.bg-gradient-to-bl': {
					'background-image': 'linear-gradient(to bottom left, var(--tw-gradient-stops))',
					'@supports (background: linear-gradient(in oklch to bottom left, black, white))': {
						'background-image': 'linear-gradient(in oklch to bottom left, var(--tw-gradient-stops))'
					}
				},
				'.bg-gradient-to-br': {
					'background-image': 'linear-gradient(to bottom right, var(--tw-gradient-stops))',
					'@supports (background: linear-gradient(in oklch to bottom right, black, white))': {
						'background-image':
							'linear-gradient(in oklch to bottom right, var(--tw-gradient-stops))'
					}
				}
			});
		})
	]
} satisfies Config;

export default config;
