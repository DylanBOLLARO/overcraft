import Image from "next/image";
import { PlusCircledIcon } from "@radix-ui/react-icons";

import { Button } from "../ui/button";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { Separator } from "../ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

import { AlbumArtwork } from "./components/album-artwork";
import { Menu } from "./components/menu";
import { PodcastEmptyPlaceholder } from "./components/podcast-empty-placeholder";
import { Sidebar } from "./components/sidebar";
import { listenNowAlbums, madeForYouAlbums } from "./data/albums";
import { playlists } from "./data/playlists";
import { useState } from "react";
import DashBoard from "./views/DashBoard";
import TopBuilds from "./views/TopBuilds";

export default function MusicPage() {
	const [view, setView] = useState("topbuilds");

	const renderComponent = () => {
		switch (view) {
			case "topbuilds":
				return <TopBuilds />;

			case "dashboard":
				return <DashBoard />;

			default:
				break;
		}
		return null;
	};

	return (
		<>
			<Menu />
			<div className="border-t">
				<div className="bg-background">
					<div className="flex flex-row">
						<Sidebar
							playlists={playlists}
							setView={setView}
							view={view}
						/>
						{renderComponent()}
					</div>
				</div>
			</div>
		</>
	);
}
