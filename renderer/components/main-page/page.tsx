import { Menu } from "./components/menu";
import { Sidebar } from "./components/sidebar";
import { useState } from "react";
import ShowAllBuilds from "./components/ShowAllBuilds";
import UpdateBuild from "./components/UpdateBuild";
import { ENUM_VIEW_PAGE } from "../../constants/main";

export default function MusicPage() {
	const [view, setView] = useState(ENUM_VIEW_PAGE.SHOW);

	const renderView = () => {
		switch (view) {
			case ENUM_VIEW_PAGE.SHOW:
				return <ShowAllBuilds setView={setView} />;

			case ENUM_VIEW_PAGE.UPDATE:
				return <UpdateBuild setView={setView} />;

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
				{renderView()}
			</div>
		</>
	);
}
