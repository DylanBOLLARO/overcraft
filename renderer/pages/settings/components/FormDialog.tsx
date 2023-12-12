import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { refresh } from "../../../features/userLogged/userLoggedSlice";
import { signin, signup } from "../../../actions/actioncreators/buildOrder";

export default function FormDialog() {
	const dispatch = useDispatch();

	const [open, setOpen] = useState(false);
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");

	const [password, setPassword] = useState("");
	const [createAccount, setCreateAccount] = useState(false);

	const handleClickOpen = () => {
		setCreateAccount(false);
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleCreateAccount = () => {
		setCreateAccount(!createAccount);
	};

	const handleSubmite = async () => {
		console.log("submited");
		if (createAccount) {
			signup(email, password, username);
			setOpen(false);
		} else {
			console.log("Log to Account");

			dispatch(refresh(await signin(email, password)));

			setOpen(false);
		}
	};

	return (
		<div>
			<Button variant="outlined" onClick={handleClickOpen}>
				Login
			</Button>
			<Dialog open={open} onClose={handleClose}>
				<DialogTitle>
					{createAccount ? "Create account" : "Login"}
				</DialogTitle>
				<DialogContent>
					{createAccount && (
						<TextField
							margin="dense"
							id="username"
							label="Username"
							fullWidth
							onChange={(e) => {
								setUsername(e.target.value);
							}}
						/>
					)}
					<TextField
						autoFocus
						margin="dense"
						id="email"
						label="Email"
						fullWidth
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
						onChange={(e) => {
							setPassword(e.target.value);
						}}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleCreateAccount}>
						{!createAccount ? "Create account" : "Login"}
					</Button>
					<Button onClick={handleClose}>Cancel</Button>
					<Button onClick={handleSubmite}>
						{createAccount ? "Create" : "Login"}
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}
