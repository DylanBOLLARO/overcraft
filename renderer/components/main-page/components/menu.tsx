import { ipcRenderer } from "electron";
import {
	Menubar,
	MenubarCheckboxItem,
	MenubarContent,
	MenubarItem,
	MenubarLabel,
	MenubarMenu,
	MenubarRadioGroup,
	MenubarRadioItem,
	MenubarSeparator,
	MenubarShortcut,
	MenubarSub,
	MenubarSubContent,
	MenubarSubTrigger,
	MenubarTrigger,
} from "../../ui/menubar";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { refresh } from "../../../features/userLogged/userLoggedSlice";
import { RootState } from "../../../store";

export function Menu() {
	const dispatch = useDispatch();
	const userLogged = useSelector(
		(state: RootState) => state.userLogged.value,
	);
	const handleQuitClick = () => {
		// Send a message to the main process when the item is clicked
		ipcRenderer.send("quit-app");
	};
	console.log(userLogged);
	return (
		<Menubar className="m-2 rounded-lg border-2 border-primary-foreground justify-between">
			<MenubarMenu>
				<MenubarLabel>
					Welcome {userLogged && userLogged.user.username} !
				</MenubarLabel>
			</MenubarMenu>
			<MenubarMenu>
				<MenubarTrigger className="font-bold cursor-pointer px-5">
					OverCraft
				</MenubarTrigger>
				<MenubarContent align="end">
					<MenubarLabel>
						{userLogged && userLogged.user.email}
					</MenubarLabel>
					<MenubarSeparator />

					<MenubarItem
						onClick={() => {
							dispatch(refresh(null));
						}}
					>
						Sign out
					</MenubarItem>
					<MenubarSeparator />
					<MenubarItem
						className="text-destructive"
						onClick={handleQuitClick}
					>
						Quit OverCraft
					</MenubarItem>
				</MenubarContent>
			</MenubarMenu>
		</Menubar>
	);
}
