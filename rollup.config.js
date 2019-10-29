import svelte from 'rollup-plugin-svelte';
import resolve from 'rollup-plugin-node-resolve';
import pkg from './package.json';
import { terser } from "rollup-plugin-terser";

const name = pkg.name
	.replace(/^(@\S+\/)?(svelte-)?(\S+)/, '$3')
	.replace(/^\w/, m => m.toUpperCase())
	.replace(/-\w/g, m => m[1].toUpperCase());

const dev = process.env.BUILD === 'development';

export default {
	input: 'src/index.js',
	output: [
		{ file: `build/${pkg.module}`, 'format': 'es' },
		{ file: `build/${pkg.main}`, 'format': 'umd', name }
	],
	plugins: [
		svelte({customElement: true, dev}),
		resolve(),
		!dev && terser()
	]
};
