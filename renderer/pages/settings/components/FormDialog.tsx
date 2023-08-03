import React from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";

export default function FormDialog() {
	const [open, setOpen] = React.useState(false);

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const login = () => {
		console.log(email + password);

		async function getUser() {
			try {
				const response = await axios.post(
					"http://127.0.0.1:3100/auth/signin",
					{
						email,
						password,
					}
				);
				console.log(response);
			} catch (error) {
				console.error(error);
			}
		}

		getUser();
		setOpen(false);
	};

	return (
		<div>
			<Button variant="outlined" onClick={handleClickOpen}>
				Login
			</Button>
			<Dialog open={open} onClose={handleClose}>
				<DialogTitle>Login</DialogTitle>
				<DialogContent>
					<TextField
						autoFocus
						margin="dense"
						id="email"
						label="Email"
						type="email"
						fullWidth
						variant="standard"
						onChange={(e) => {
							setEmail(e.target.value);
						}}
					/>
					<TextField
						margin="dense"
						id="password"
						label="Password"
						type="password"
						fullWidth
						variant="standard"
						onChange={(e) => {
							setPassword(e.target.value);
						}}
					/>
				</DialogContent>
				<DialogActions>
					<Button disabled onClick={handleClose}>
						Create account
					</Button>
					<Button onClick={handleClose}>Cancel</Button>
					<Button onClick={login}>Login</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}
