import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Layout from "../settings/components/Layout";
import BasicTable from "./components/BasicTable";
import { Button, TextField } from "@mui/material";
import axios from "axios";
import FormDelete from "./components/FormDelete";
import { addLine, getAllLines } from "../../actions/actioncreators/buildOrder";

interface interfaceLocalBuildOrder {
	timer: number | null;
	population: number | null;
	description: string | null;
	build_order_id: any;
}

function Modify() {
	const router = useRouter();
	const { query } = useRouter();

	const [refreshLines, setRefreshLines] = useState(false);
	const [timer, setTimer] = useState({
		minutes: 0,
		seconds: 0,
	});

	const handleMinutesChange = (e: any) => {
		setTimer((prevTimer) => ({
			...prevTimer,
			minutes: parseInt(e.target.value),
		}));
	};

	const handleSecondsChange = (e: any) => {
		setTimer((prevTimer) => ({
			...prevTimer,
			seconds: parseInt(e.target.value),
		}));
	};

	const convertToSeconds = () => {
		return timer.minutes * 60 + timer.seconds;
	};

	useEffect(() => {
		if (refreshLines) {
			getAllLinesLocal();
			setRefreshLines(false);
		}
	}, [refreshLines]);

	useEffect(() => {
		updateLocalBuild("timer", convertToSeconds());
	}, [timer]);

	async function getAllLinesLocal() {
		setData(await getAllLines(query.idBuild));
	}

	useEffect(() => {
		getAllLinesLocal();
	}, []);

	const [data, setData] = useState([]);
	const [localBuildOrder, setLocalBuildOrder] =
		useState<interfaceLocalBuildOrder>({
			timer: convertToSeconds(),
			population: null,
			description: null,
			build_order_id: query.idBuild,
		});

	const updateLocalBuild = (field: any, value: any) => {
		setLocalBuildOrder((prevState) => ({
			...prevState,
			[field]: value,
		}));
	};

	return (
		<div className="m-0 p-0">
			<Layout>
				<div className="m-5 flex flex-col gap-5">
					<div className="flex flex-row justify-between">
						<Button
							sx={{ width: "200px" }}
							variant="outlined"
							onClick={() => {
								router.push({
									pathname: "/settings/Show",
								});
							}}
						>
							Back
						</Button>
						<div className="flex gap-5">
							<FormDelete id={query.idBuild} name={query.name} />
							<Button
								sx={{ width: "200px" }}
								variant="outlined"
								color="success"
								onClick={() => {}}
							>
								Export
							</Button>
						</div>
					</div>
					<BasicTable
						data={data}
						local={localBuildOrder}
						setRefreshLines={setRefreshLines}
						buildId={query.idBuild}
					/>
					<div className="flex flex-row justify-between">
						<TextField
							id="Description-basic"
							label="Description"
							variant="outlined"
							onChange={(e) => {
								updateLocalBuild("description", e.target.value);
							}}
						/>
						<TextField
							id="Population-basic"
							label="Population"
							variant="outlined"
							onChange={(e) => {
								updateLocalBuild("population", e.target.value);
							}}
						/>
						<div className="flex flex-row justify-center text-zinc-300 gap-5">
							<p>Timer : </p>
							<TextField
								id="Timer-basic-m"
								label="Minutes"
								variant="outlined"
								onChange={(e) => handleMinutesChange(e)}
							/>
							<TextField
								id="Timer-basic-s"
								label="Secondes"
								variant="outlined"
								onChange={(e) => handleSecondsChange(e)}
							/>
						</div>

						<Button
							variant="outlined"
							color="secondary"
							onClick={async () => {
								await addLine(
									localBuildOrder.description,
									localBuildOrder.population,
									localBuildOrder.timer,
									localBuildOrder.build_order_id
								);

								getAllLinesLocal();
							}}
						>
							Save line
						</Button>
					</div>
				</div>
			</Layout>
		</div>
	);
}

export default Modify;
