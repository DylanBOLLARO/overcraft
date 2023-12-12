import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import { Separator } from "../../ui/separator";
import { ScrollArea, ScrollBar } from "../../ui/scroll-area";
import { AlbumArtwork } from "../components/album-artwork";
import { listenNowAlbums, madeForYouAlbums } from "../data/albums";

const TopBuilds = () => {
	return (
		<div className="col-span-3 lg:col-span-4 lg:border-l">
			<div className="h-full px-4 py-6 lg:px-8">
				<Tabs defaultValue="music" className="h-full space-y-6">
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
					<TabsContent
						value="music"
						className="border-none p-0 outline-none"
					>
						<div className="flex items-center justify-between">
							<div className="space-y-1">
								<h2 className="text-2xl font-semibold tracking-tight">
									The best builds of the moment
								</h2>
							</div>
						</div>
						<Separator className="my-4" />
						<div className="relative">
							<ScrollArea>
								<div className="flex space-x-4 pb-4">
									{listenNowAlbums.map((album) => (
										<AlbumArtwork
											key={album.name}
											album={album}
											className="w-[250px]"
											aspectRatio="portrait"
											width={250}
											height={330}
										/>
									))}
								</div>
								<ScrollBar orientation="horizontal" />
							</ScrollArea>
						</div>
					</TabsContent>
				</Tabs>
			</div>
		</div>
	);
};

export default TopBuilds;
