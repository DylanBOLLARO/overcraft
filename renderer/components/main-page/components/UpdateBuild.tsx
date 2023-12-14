import React, { useEffect, useState } from "react";
import { Button } from "../../ui/button";
import { Tabs } from "../../ui/tabs";
import { ENUM_VIEW_PAGE } from "../../../constants/main";

const UpdateBuild = ({ setView }: any) => {
	return (
		<Tabs
			defaultValue="music"
			className="space-y-6 px-4 py-6 lg:px-8 flex-1"
		>
			<div className="space-between flex items-center">
				<div className="flex flex-row ml-auto gap-5">
					<Button
						variant={"outline"}
						onClick={() => {
							setView(ENUM_VIEW_PAGE.SHOW);
						}}
					>
						back
					</Button>
				</div>
			</div>
		</Tabs>
	);
};

export default UpdateBuild;
