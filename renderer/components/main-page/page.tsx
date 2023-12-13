import { Menu } from "./components/menu";
import { Sidebar } from "./components/sidebar";
import { useState } from "react";
import DashBoard from "./views/DashBoard";
import TopBuilds from "./views/TopBuilds";
import ShowBuild from "./components/ShowBuild";

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
			<div className="flex flex-row">
				<Sidebar setView={setView} view={view} />
				<ShowBuild />
			</div>
		</>
	);
}
