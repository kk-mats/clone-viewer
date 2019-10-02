import * as path from "path";
// eslint-disable-next-line import/no-extraneous-dependencies
import * as htmlWebpackPlugin from "html-webpack-plugin";
// eslint-disable-next-line import/no-extraneous-dependencies
import { Configuration } from "webpack";

const config: Configuration = {
	mode: "production",
	entry: "./src/client/index.tsx",
	module: {
		rules: [
			{
				enforce: "pre",
				loader: "eslint-loader",
				test: /\.tsx?$/,
				exclude: [/node_modules/],
				options: {
					emitErrors: true
				}
			},
			{
				test: /\.tsx?$/,
				loader: "ts-loader",
				exclude: [/node_modules/],
				options: {
					configFile: "tsconfig.prod.json"
				}
			}
		]
	},
	resolve: {
		modules: ["node_modules", "src"],
		extensions: [".ts", ".tsx", ".js", ".jsx", ".json"]
	},
	output: {
		filename: "static/js/bundle.js",
		path: path.resolve(__dirname, "dist")
	},
	plugins: [
		// eslint-disable-next-line new-cap
		new htmlWebpackPlugin({
			template: "./src/client/index.html",
			filename: "./index.html"
		})
	]
};

export default config;
