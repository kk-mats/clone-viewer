import * as path from "path";
import * as htmlWebpackPlugin from "html-webpack-plugin";
import { Configuration, DefinePlugin } from "webpack";

const ASSET_PATH = process.env.ASSET_PATH || "/";

export default {
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
		publicPath: ASSET_PATH,
		filename: "static/js/bundle.js",
		path: path.resolve(__dirname, "dist")
	},
	plugins: [
		new DefinePlugin({
			"process.env.ASSET_PATH": JSON.stringify(ASSET_PATH)
		}),
		new htmlWebpackPlugin({
			template: "./src/client/index.html",
			filename: "./index.html"
		})
	]
} as Configuration;
