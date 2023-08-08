import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";
import { useRouter } from "next/router";

interface props {
	id: number;
	name: number;
}

export default function FormDelete({ id, name }: props) {
	const router = useRouter();

	const [open, setOpen] = React.useState(false);
	const [textInput, setTextInput] = React.useState("");

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	async function validationDelete(idOfBuild: any, title: any) {
		if (title === textInput) {
			await deleteBuild(idOfBuild);
			handleClose();
		}
	}

	async function deleteBuild(idOfBuild: any) {
		try {
			await axios.post("http://127.0.0.1:3100/build-order/delete-build", {
				id: "" + idOfBuild,
			});
		} catch (error) {
			console.error(error);
		}

		router.push({
			pathname: "/settings/Show",
		});
	}

	return (
		<div>
			<Button variant="outlined" color="error" onClick={handleClickOpen}>
				DELETE
			</Button>
			<Dialog open={open} onClose={handleClose}>
				<DialogTitle>Are you sure to this action ?</DialogTitle>
				<DialogContent>
					<DialogContentText>
						<p>
							Please type
							<span className="text-cyan-200 font-bold">
								{" "}
								{name}{" "}
							</span>
							to confirm this action
						</p>
					</DialogContentText>
					<TextField
						autoFocus
						margin="dense"
						fullWidth
						onChange={(e) => {
							setTextInput(e.target.value);
						}}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Cancel</Button>
					<Button
						onClick={() => {
							validationDelete(id, name);
						}}
					>
						Delete
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}
