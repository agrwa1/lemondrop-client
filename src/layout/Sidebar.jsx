import * as React from 'react';

import { Box } from '@mui/material'
import { styled, useTheme, Button, Card, CardContent, CardActions, CssBaseline, Drawer as MuiDrawer, AppBar as MuiAppBar, Toolbar, List, Typography, Divider, IconButton, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import CasinoOutlinedIcon from '@mui/icons-material/CasinoOutlined';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faGamepad, faChessBoard, faChartLine, faFootball, faBasketball, faBaseballBatBall, faHockeyPuck } from '@fortawesome/free-solid-svg-icons'

import { Link } from 'react-router-dom'
import { useNavigate, Navigate } from 'react-router-dom'


const drawerWidth = 240;

const openedMixin = (theme) => ({
	width: drawerWidth,
	transition: theme.transitions.create('width', {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.enteringScreen,
	}),
	overflowX: 'hidden',
});

const closedMixin = (theme) => ({
	transition: theme.transitions.create('width', {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	overflowX: 'hidden',
	width: `calc(${theme.spacing(7)} + 1px)`,
	[theme.breakpoints.up('sm')]: {
		width: `calc(${theme.spacing(8)} + 1px)`,
	},
});

const DrawerHeader = styled('div')(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'flex-end',
	padding: theme.spacing(0, 1),
	// necessary for content to be below app bar
	...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
	shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
	zIndex: theme.zIndex.drawer + 1,
	transition: theme.transitions.create(['width', 'margin'], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	...(open && {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	}),
}));




const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
	({ theme, open }) => ({
		width: drawerWidth,
		flexShrink: 0,
		whiteSpace: 'nowrap',
		boxSizing: 'border-box',
		...(open && {
			...openedMixin(theme),
			'& .MuiDrawer-paper': openedMixin(theme),
		}),
		...(!open && {
			...closedMixin(theme),
			'& .MuiDrawer-paper': closedMixin(theme),
		}),
	}),
);

export default function MiniDrawer({ children }) {
	const theme = useTheme();
	const [open, setOpen] = React.useState(false);

	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};

	return (

		<Box sx={{ display: 'flex', marginTop: '3em' }}>
			<AppBar open={open}>
				<Toolbar sx={{ backgroundColor: 'primary.main' }} >
					<IconButton
						color="inherit"
						aria-label="open drawer"
						onClick={handleDrawerOpen}
						edge="start"
						sx={{
							marginRight: 5,
							...(open && { display: 'none' }),
						}}
					>
						<MenuIcon />
					</IconButton>
					<Typography variant="h6" noWrap component="div" sx={{ fontFamily: "Lobster", fontWeight: 'bold', fontSize: '2em' }} >
						LemonDrop
					</Typography>
				</Toolbar>
			</AppBar>
			<CssBaseline />


			<Drawer variant="permanent" open={open} PaperProps={{
				sx: {
					backgroundColor: "primary.main",
					color: 'white'
				}
			}}>
				<DrawerHeader>
					<IconButton onClick={handleDrawerClose} sx={{ color: "white" }} >
						{theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
					</IconButton>
				</DrawerHeader>
				<Divider />

				<List>
					<DrawerIcon text="Dashboard" disableUnderline icon={faChartLine} open={open} link="/dashboard" />
					<DrawerIcon text="Profile" icon={faUser} open={open} link="/profile" />
				</List>

				<Divider />
				<List>
					<DrawerIcon text="Football" icon={faFootball} open={open} link="/games/nfl" />
					<DrawerIcon text="Basketball" icon={faBasketball} open={open} link="/games/nba" />
					<DrawerIcon text="Baseball" icon={faBaseballBatBall} open={open} link="/games/mlb" />
					<DrawerIcon text="Hockey" icon={faHockeyPuck} open={open} link="/games/nhl" />
				</List>

				{/* <List>
					<Button onClick={signOut}>
						<DrawerIcon text="Sign Out" icon={faUser} open={open} />
					</Button>
				</List> */}
			</Drawer>
			<Box component="main" sx={{ flexGrow: 1, p: 3 }}>
				<DrawerHeader />
				{children}
			</Box>
		</Box>


	);
}

const DrawerIcon = ({ text, icon, open, link }) => {

	return (

		<ListItem key={text} alignItems="flex-start" disablePadding sx={{ display: 'block' }}>
			<Link to={link} style={{ textDecoration: 'none' }} >
				<ListItemButton
					sx={{
						minHeight: 48,
						justifyContent: open ? 'initial' : 'center',
						px: 2.5,

					}}
				>
					<ListItemIcon
						sx={{
							minWidth: 0,
							mr: open ? 3 : 'auto',
							justifyContent: 'center',
							color: 'white',
						}}
					>
						<FontAwesomeIcon icon={icon} aria-hidden={true} className="fa-fw" />
					</ListItemIcon>

					<ListItemText primary={text} sx={{
						opacity: open ? 1 : 0,
						color: 'white',
						fontWeight: 'bold',
						textDecoration: 'none'
					}} />
				</ListItemButton>



			</Link>
		</ListItem>


	)
}


/*


*/