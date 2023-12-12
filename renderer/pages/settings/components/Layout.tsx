import Head from "next/head";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { useEffect, useState } from "react";
import { ipcRenderer } from "electron";
import AuthenticationPage from "../../../components/AuthenticationPage";
import { ThemeProvider } from "next-themes";
import { Label } from "../../../components/ui/label";
import Header from "./Header";
import MusicPage from "../../../components/main-page/page";
import { AlertDestructive } from "../../../components/AlertDestructive";

interface LayoutProps {
	children: React.ReactNode;
	title?: string;
}

export default function Layout({ children, title }: LayoutProps) {
	const userLogged = useSelector(
		(state: RootState) => state.userLogged.value,
	);

	useEffect(() => {
		ipcRenderer.send("get-variable-value");

		ipcRenderer.on("variable-value-from-main", (event, variableValue) => {
			console.log(userLogged);

			ipcRenderer.send(
				"send-variable-to-play",
				userLogged && userLogged.user.id,
			);
		});
	}, [userLogged]);

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

	return (
		<>
			<Head>
				<title>OverCraft</title>
			</Head>

			<ThemeProvider
				attribute="class"
				defaultTheme="dark"
				enableSystem
				disableTransitionOnChange
			>
				{userLogged ? (
					<>
						{/* <Header title={title || ""} /> */}
						<MusicPage />
						{/* <main className="mt-24">{children}</main> */}
					</>
				) : (
					<>
						{/* <AlertDestructive /> */}

						<div className="flex flex-col pt-10 items-center gap-10 select-none">
							<p className="font-mono font-bold text-5xl  text-center">
								OverCraft
							</p>
							<AuthenticationPage />
						</div>
					</>
				)}
			</ThemeProvider>
		</>
	);
}
