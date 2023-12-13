import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import { Separator } from "../../ui/separator";
import { AlbumArtwork } from "./album-artwork";
import { listenNowAlbums } from "../data/albums";

const ShowBuild = ({ build_list }: any) => {
	console.log(build_list);
	return (
		<Tabs defaultValue="music" className="space-y-6 px-4 py-6 lg:px-8">
			<div className="space-between flex items-center">
				<TabsList>
					<TabsTrigger value="music" className="relative">
						All
					</TabsTrigger>
					<TabsTrigger value="podcasts" disabled>
						Terran
					</TabsTrigger>
					<TabsTrigger value="live" disabled>
						Zerg
					</TabsTrigger>
					<TabsTrigger value="live" disabled>
						Protoss
					</TabsTrigger>
				</TabsList>
			</div>
			<TabsContent value="music" className="flex flex-col gap-5 ">
				<h2 className="text-2xl font-semibold tracking-tight ">
					The best builds of the moment
				</h2>
				<Separator />
				<div className="flex flex-wrap gap-5">
					{listenNowAlbums.map((album) => (
						<AlbumArtwork
							key={album.name}
							album={album}
							aspectRatio="portrait"
							width={150}
							height={150}
						/>
					))}
				</div>
			</TabsContent>
		</Tabs>
	);
};

export default ShowBuild;
