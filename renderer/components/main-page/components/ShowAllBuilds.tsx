import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import { Separator } from "../../ui/separator";
import { Card } from "../../ui/card";
import { Button } from "../../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/custom/avatar";
import { GET_ALL_BUILDS_OF_USER } from "../../../constants/api";
import { fetch } from "../../../services/networking";
import { RefreshCcw } from "lucide-react";
import DialogCreationNewBuild from "./DialogCreationNewBuild";
import { ENUM_VIEW_PAGE } from "../../../constants/main";

const ShowAllBuilds = ({ setView }: any) => {
	const [buildsList, setBuildsList] = useState<any>([]);

	async function fetch_builds_list() {
		const { data }: any = await fetch(GET_ALL_BUILDS_OF_USER, {
			id: "1",
		});
		console.log(data);
		setBuildsList(data);
	}

	useEffect(() => {
		fetch_builds_list();
	}, []);

	return (
		<Tabs
			defaultValue="music"
			className="space-y-6 px-4 py-6 lg:px-8 flex-1"
		>
			<div className="space-between flex items-center">
				<TabsList>
					<TabsTrigger value="music" className="relative">
						My Builds
					</TabsTrigger>

					<TabsTrigger value="live" disabled>
						Draft
					</TabsTrigger>
				</TabsList>
				<div className="flex flex-row ml-auto gap-5">
					<Button variant={"outline"} onClick={fetch_builds_list}>
						<RefreshCcw className=" h-4 w-4" />
					</Button>
					<DialogCreationNewBuild setView={setView} />
				</div>
			</div>
			<TabsContent value="music" className="flex flex-col gap-5 ">
				<h2 className="text-2xl font-semibold tracking-tight ">
					My builds
				</h2>
				<Separator />
				{buildsList && (
					<div className="flex flex-wrap gap-5">
						{buildsList.map((build: any) => {
							return (
								<Card
									onClick={() => {
										console.log(build.id);
										setView(ENUM_VIEW_PAGE.UPDATE);
									}}
									key={build.id}
									className="flex flex-col w-[150px] gap-2 border-2 hover:border-indigo-800 duration-75 cursor-pointer"
								>
									<Avatar>
										<AvatarImage src="https://github.com/shadcn.png" />
										<AvatarFallback>CN</AvatarFallback>
									</Avatar>
									<p className="text-center p-1">
										{build.title}
									</p>
								</Card>
							);
						})}
					</div>
				)}
			</TabsContent>
		</Tabs>
	);
};

export default ShowAllBuilds;
