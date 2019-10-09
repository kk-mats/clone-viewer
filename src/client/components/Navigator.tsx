import * as React from "react";
import {
	Drawer,
	Divider,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Hidden,
	useTheme
} from "@material-ui/core";
import { Home, Subject } from "@material-ui/icons";
import useStyles from "../styles/styles";

const Navigator: React.FunctionComponent = () => {
	const theme = useTheme();
	const classes = useStyles(theme);
	const [mobileOpen, setMobileOpen] = React.useState(false);

	const toggleHandler = (): void => {
		setMobileOpen(!mobileOpen);
	};

	const drawer = (
		<div>
			<Divider />
			<List>
				{[
					{ text: "Project", icon: <Home /> },
					{ text: "Result", icon: <Subject /> }
				].map(value => {
					return (
						<ListItem button key={value.text}>
							<ListItemIcon>{value.icon}</ListItemIcon>
							<ListItemText primary={value.text} />
						</ListItem>
					);
				})}
			</List>
		</div>
	);

	return (
		<nav className={classes.drawer}>
			<Hidden smUp implementation="css">
				<Drawer
					open={mobileOpen}
					onClose={toggleHandler}
					ModalProps={{ keepMounted: true }}
					classes={{ paper: classes.drawerPaper }}
				>
					{drawer}
				</Drawer>
			</Hidden>
			<Hidden xsDown implementation="css">
				<Drawer
					classes={{
						paper: classes.drawerPaper
					}}
					variant="permanent"
					open
				>
					{drawer}
				</Drawer>
			</Hidden>
		</nav>
	);
};

export default Navigator;
