import * as path from "path";
// eslint-disable-next-line import/no-extraneous-dependencies
import * as htmlWebpackPlugin from "html-webpack-plugin";
// eslint-disable-next-line import/no-extraneous-dependencies
import { Configuration } from "webpack";

const config: Configuration = {
	mode: "development",
	entry: "./src/client/index.tsx",
	devtool: "inline-source-map",
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
				loader: "ts-loader",
				test: /\.tsx?$/,
				exclude: [/node_modules/],
				options: {
					configFile: "tsconfig.dev.json"
				}
			}
		]
	},
	devServer: {
		historyApiFallback: true,
		inline: true,
		open: true,
		host: "localhost",
		port: 8080,
		proxy: {
			"/api": {
				target: "http://localhost:3000",
				pathRewrite: {'^/api' : ''},
				secure: false,
				logLevel: "debug"
			}
		}
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
