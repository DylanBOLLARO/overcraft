import { cn } from "../../../lib/utils";
import { Button } from "../../ui/button";
import { ScrollArea } from "../../ui/scroll-area";

import { Playlist } from "../data/playlists";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
	setView: any;
	view: any;
}

export function Sidebar({ className, setView, view }: SidebarProps) {
	return (
		<div
			className={cn(
				"pb-12 min-w-[200px] m-2 rounded-lg border-2 border-primary-foreground min-h-[calc(100vh-72px)]",
				className,
			)}
		>
			<div className=" space-y-4 py-4 px-3">
				<h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
					Discover
				</h2>
				<div className="space-y-1">
					<Button
						variant="ghost"
						className={`w-full justify-start ${
							view === "topbuilds" && "bg-secondary"
						}`}
						onClick={() => {
							setView("topbuilds");
						}}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
							className="mr-2 h-4 w-4"
						>
							<rect width="7" height="7" x="3" y="3" rx="1" />
							<rect width="7" height="7" x="14" y="3" rx="1" />
							<rect width="7" height="7" x="14" y="14" rx="1" />
							<rect width="7" height="7" x="3" y="14" rx="1" />
						</svg>
						Top builds
					</Button>
					<Button
						variant="ghost"
						className={`w-full justify-start ${
							view === "dashboard" && "bg-secondary"
						}`}
						onClick={() => {
							setView("dashboard");
						}}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
							className="mr-2 h-4 w-4"
						>
							<rect width="7" height="7" x="3" y="3" rx="1" />
							<rect width="7" height="7" x="14" y="3" rx="1" />
							<rect width="7" height="7" x="14" y="14" rx="1" />
							<rect width="7" height="7" x="3" y="14" rx="1" />
						</svg>
						Dashboard
					</Button>
				</div>
			</div>
		</div>
	);
}
