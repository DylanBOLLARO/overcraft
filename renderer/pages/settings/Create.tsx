import { useState, useEffect } from "react";
import Layout from "../settings/components/Layout";
import { Box, Button, TextField } from "@mui/material";
import ToggleButtons from "../settings/components/ToggleButtons";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useRouter } from "next/router";
import { newBuild } from "../../actions/actioncreators/buildOrder";

const CreateNewBuildOrder = () => {
	const router = useRouter();

	const userLogged = useSelector(
		(state: RootState) => state.userLogged.value
	);

	const [racePlay, setRacePlay] = useState("");
	const [raceVersus, setRaceVersus] = useState("");
	const [localBuild, setLocalBuild] = useState({
		title: "",
		playrace: "",
		versusrace: "",
	});

	const checkingFieldsOfBuild = (localBuild: any) => {
		if (localBuild.title === "" || localBuild.category === "") {
			return false;
		} else {
			return true;
		}
	};

	useEffect(() => {
		console.log(localBuild);
	}, [localBuild]);

	const handleRacePlay = (event: any, newAlignment: any) => {
		setRacePlay(newAlignment);
		updateLocalBuild("playrace", newAlignment);
	};

	const handleRaceVersus = (event: any, newAlignment: any) => {
		setRaceVersus(newAlignment);
		updateLocalBuild("versusrace", newAlignment);
	};

	const updateLocalBuild = (field: any, value: any) => {
		setLocalBuild((prevState) => ({
			...prevState,
			[field]: value,
		}));
	};

	function handleFormSubmit(params: any) {
		if (checkingFieldsOfBuild(params)) {
			(async () => {
				await newBuild(
					params.title,
					params.playrace,
					params.versusrace,
					userLogged.user.id
				);
				router.push({
					pathname: "/settings/Show",
					query: {},
				});
			})();
		}
	}

	return (
		<Layout title={"Create new build order"}>
			<div className="flex w-full flex-col items-center gap-5 px-10 py-5 text-xl">
				<div className="flex flex-row items-center gap-5 text-zinc-300">
					<Box component="div" sx={{ fontSize: 32, width: "250px" }}>
						Race play :
					</Box>
					<ToggleButtons
						handleAlignment={handleRacePlay}
						value={racePlay}
					/>
				</div>
				<div className="flex flex-row items-center gap-5 text-zinc-300">
					<Box component="div" sx={{ fontSize: 32, width: "250px" }}>
						Race versus :
					</Box>
					<ToggleButtons
						handleAlignment={handleRaceVersus}
						value={raceVersus}
					/>
				</div>
				<div className="flex w-full justify-between gap-5">
					<TextField
						sx={{ width: "70%" }}
						id="outlined-basic"
						label="Name of your build order"
						variant="outlined"
						onChange={(e) =>
							updateLocalBuild("title", e.target.value)
						}
						value={localBuild.title}
					/>
					<Button
						variant="outlined"
						onClick={() => handleFormSubmit(localBuild)}
						sx={{ width: "30%" }}
					>
						Insert build
					</Button>
				</div>
			</div>
		</Layout>
	);
};

export default CreateNewBuildOrder;
