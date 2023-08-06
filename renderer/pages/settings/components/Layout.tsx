import Head from "next/head";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Header from "./Header";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import CustomizedSnackbars from "./CustomizedSnackbars";
import { useEffect, useState } from "react";

interface LayoutProps {
	children: React.ReactNode;
	title?: string;
}

export default function Layout({ children, title }: LayoutProps) {
	const userLogged = useSelector(
		(state: RootState) => state.userLogged.value
	);

	const [open, setOpen] = useState(true);
	const [message, setMessage] = useState("");
	const [typeColors, setTypeColors] = useState("");

	useEffect(() => {
		if (userLogged) {
			setOpen(true);
			setMessage("Logged in successfully");
			setTypeColors("success");
		} else {
			setOpen(true);
			setMessage("Logout successfully");
			setTypeColors("error");
		}
	}, [userLogged]);

	const darkTheme = createTheme({
		palette: {
			mode: "dark",
		},
	});

	return (
		<>
			<Head>
				<title>sc2-build-order-ts-settings</title>
			</Head>
			<ThemeProvider theme={darkTheme}>
				<Header title={title || ""} />
				<CustomizedSnackbars
					open={open}
					setOpen={setOpen}
					message={message}
					type={typeColors}
				/>
				;
				{userLogged ? (
					<main className="mt-24">{children}</main>
				) : (
					<main className="flex flex-col m-24 gap-5">
						<p className="text-lg text-zinc-300">
							Afin de pouvoir utiliser l'application, merci de
							vous connecter !
						</p>
					</main>
				)}
			</ThemeProvider>
		</>
	);
}
