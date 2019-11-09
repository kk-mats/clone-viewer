import * as React from "react";
import * as ReactDOM from "react-dom";
import { CssBaseline } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import theme from "./styles/theme";
import CloneViewer from "./components/CloneViewer";

ReactDOM.render(
	<ThemeProvider theme={theme}>
		<CssBaseline />
		<CloneViewer />
	</ThemeProvider>,
	document.getElementById("root")
);
