import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
	palette: {
		primary: {
			light: "#ffffff",
			main: "#cfd8dc",
			dark: "#9ea7aa",
			contrastText: "#000000"
		},
		secondary: {
			light: "#58a5f0",
			main: "#0277bd",
			dark: "#004c8c",
			contrastText: "#ffffff"
		}
	}
});

export default theme;
