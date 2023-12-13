import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import { Separator } from "../../ui/separator";
import { PodcastEmptyPlaceholder } from "../components/podcast-empty-placeholder";
import { ScrollArea, ScrollBar } from "../../ui/scroll-area";
import { AlbumArtwork } from "../components/album-artwork";
import { listenNowAlbums, madeForYouAlbums } from "../data/albums";
import { Button } from "../../ui/button";
import { PlusCircledIcon } from "@radix-ui/react-icons";

const DashBoard = () => {
	return (
		<div className=" px-4 py-6 lg:px-8">
			<Tabs defaultValue="music" className=" space-y-6">
				<div className="space-between flex items-center">
					<TabsList>
						<TabsTrigger value="music" className="relative">
							My Builds
						</TabsTrigger>

						<TabsTrigger value="live" disabled>
							disabled
						</TabsTrigger>
					</TabsList>
					<div className="ml-auto mr-4">
						<Button disabled>
							<PlusCircledIcon className="mr-2 h-4 w-4" />
							Add build order
						</Button>
					</div>
				</div>
				<TabsContent
					value="music"
					className="border-none p-0 outline-none"
				>
					<div className="mt-6 space-y-1">
						<h2 className="text-2xl font-semibold tracking-tight">
							Your builds orders
						</h2>
					</div>
					<Separator className="my-4" />
					<div className="relative">
						<ScrollArea>
							<div className="flex space-x-4 pb-4">
								{madeForYouAlbums.map((album) => (
									<AlbumArtwork
										key={album.name}
										album={album}
										className="w-[150px]"
										aspectRatio="square"
										width={150}
										height={150}
									/>
								))}
							</div>
							<ScrollBar orientation="horizontal" />
						</ScrollArea>
					</div>
				</TabsContent>
				<TabsContent
					value="podcasts"
					className="h-full flex-col border-none p-0 data-[state=active]:flex"
				>
					<div className="flex items-center justify-between">
						<div className="space-y-1">
							<h2 className="text-2xl font-semibold tracking-tight">
								New Episodes
							</h2>
							<p className="text-sm text-muted-foreground">
								Your favorite podcasts. Updated daily.
							</p>
						</div>
					</div>
					<Separator className="my-4" />
					<PodcastEmptyPlaceholder />
				</TabsContent>
			</Tabs>
		</div>
	);
};

export default DashBoard;
