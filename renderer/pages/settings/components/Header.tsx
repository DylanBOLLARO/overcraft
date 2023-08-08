import React, { useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { CgMenuGridR } from "react-icons/cg";
import { useRouter } from "next/router";
import FormDialog from "./FormDialog";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { refresh } from "../../../features/userLogged/userLoggedSlice";
import BackgroundLetterAvatars from "./BackgroundLetterAvatars";
import { ipcRenderer } from "electron";

interface props {
	title: string;
}

export default function Header({ title }: props) {
	const dispatch = useDispatch();

	const userLogged = useSelector(
		(state: RootState) => state.userLogged.value
	);

	const router = useRouter();

	return (
		<Box
			sx={{
				flexGrow: 1,
				position: "fixed",
				top: 0,
				left: 0,
				width: "100%",
				zIndex: "100",
			}}
		>
			<AppBar
				position="static"
				sx={{
					display: "flex",
					flexDirection: "row",
					backgroundColor: "#18181b",
				}}
			>
				<Toolbar
					sx={{
						width: "100%",
						justifyContent: "space-between",
						gap: "20px",
					}}
				>
					<IconButton
						size="large"
						edge="start"
						color="inherit"
						aria-label="menu"
						sx={{ mr: 2 }}
						onClick={() => {
							router.push("/settings/settings");
						}}
					>
						<CgMenuGridR />
					</IconButton>
					{userLogged && (
						<BackgroundLetterAvatars
							pseudo={userLogged.user.username}
						/>
					)}
					<Typography
						variant="h6"
						component="div"
						sx={{ flexGrow: 1 }}
					>
						{userLogged
							? "Bienvenue " + userLogged.user.username
							: "Sc2-Build-Order-Ts"}
					</Typography>

					{title && (
						<Typography
							variant="h6"
							component="div"
							sx={{ flexGrow: 1 }}
						>
							Name of build order : {title}
						</Typography>
					)}
					{userLogged && (
						<button
							className="p-3 rounded-lg"
							onClick={() => {
								ipcRenderer.invoke("create-settings-page");
							}}
						>
							PLAY
						</button>
					)}
					{userLogged ? (
						<Button
							variant="outlined"
							color="error"
							onClick={() => {
								dispatch(refresh(null));
								router.push("/settings/settings");
							}}
						>
							Logout
						</Button>
					) : (
						<FormDialog />
					)}
				</Toolbar>
			</AppBar>
		</Box>
	);
}
