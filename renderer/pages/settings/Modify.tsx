import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Layout from "../settings/components/Layout";
import BasicTable from "./components/BasicTable";
import { Button, TextField } from "@mui/material";
import axios from "axios";

function Modify() {
	const router = useRouter();
	const { query } = useRouter();

	useEffect(() => {
		(async () => {
			try {
				const response = await axios.post(
					"http://127.0.0.1:3100/build-order/get-all-lines",
					{
						id: query.idBuild,
					}
				);
				console.error(response.data);
				setData(response.data);
			} catch (error) {
				console.error(error);
			}
		})();
	}, []);

	interface interfaceLocalBuildOrder {
		timer: number | null;
		population: number | null;
		description: string | null;
		build_order_id: any;
	}

	const [data, setData] = useState([]);
	const [localBuildOrder, setLocalBuildOrder] =
		useState<interfaceLocalBuildOrder>({
			timer: null,
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
							<Button
								sx={{ width: "200px" }}
								color="error"
								variant="outlined"
								onClick={async () => {
									try {
										await axios.post(
											"http://127.0.0.1:3100/build-order/delete-build",
											{
												id: "" + query.idBuild,
											}
										);
									} catch (error) {
										console.error(error);
									}

									router.push({
										pathname: "/settings/Show",
									});
								}}
							>
								Delete
							</Button>
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
					<BasicTable data={data} local={localBuildOrder} />
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
						<TextField
							id="Timer-basic"
							label="Timer"
							variant="outlined"
							onChange={(e) => {
								updateLocalBuild("timer", e.target.value);
							}}
						/>

						<Button
							variant="outlined"
							color="secondary"
							onClick={async () => {
								try {
									await axios.post(
										"http://127.0.0.1:3100/build-order/add-line",
										{
											desc: localBuildOrder.description,
											population:
												"" + localBuildOrder.population,
											timer: "" + localBuildOrder.timer,
											buildName_id:
												"" +
												localBuildOrder.build_order_id,
										}
									);
								} catch (error) {
									console.error(error);
								}

								(async () => {
									try {
										const response = await axios.post(
											"http://127.0.0.1:3100/build-order/get-all-lines",
											{
												id: query.idBuild,
											}
										);
										console.error(response.data);
										setData(response.data);
									} catch (error) {
										console.error(error);
									}
								})();
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
