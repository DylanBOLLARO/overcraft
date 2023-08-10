import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Layout from "./components/Layout";
import { useSelector } from "react-redux";
import { ipcRenderer } from "electron";
import axios from "axios";

function DisplayBuild() {
	const router = useRouter();
	const { query } = useRouter();
	const count = useSelector((state) => state?.counter?.value);

	useEffect(() => {
		(async () => {
			try {
				const response = await axios.post(
					"http://127.0.0.1:3100/build-order/get-all-lines",
					{
						id: "" + query.build,
					}
				);
				setData(response.data);
			} catch (error) {
				console.error(error);
			}
		})();
	}, []);

	useEffect(() => {
		ipcRenderer.on("num5", () => {
			router.push({
				pathname: "/play/ChoseBuild",
				query: {
					racePlayed: query.racePlayed,
					raceOpponent: query.raceOpponent,
					build: query.selectedBuild,
				},
			});
		});

		return () => {
			ipcRenderer.removeAllListeners("num5");
		};
	}, []);
	const [data, setData] = useState([]);

	const formatTemps = (temps) => {
		const minutes = Math.floor(temps / 60);
		const secondes = temps % 60;
		return `${minutes.toString().padStart(2)}:${secondes
			.toString()
			.padStart(2, "0")}`;
	};

	return (
		<Layout title={"path.name"}>
			<div className={`flex flex-col gap-1`}>
				{data
					.slice(
						Math.max(
							data.filter((x) => count > x.timer).length - 2,
							0
						),
						Math.min(
							data.filter((x) => count > x.timer).length + 6,
							data.length
						)
					)
					.map((u, index) => {
						return (
							<div className="rounded bg-black/50">
								{u.details && (
									<div className="flex w-full flex-row px-3 py-1 text-[#a878dd]">
										<p className=" w-full text-center ">
											{u.details}
										</p>
									</div>
								)}
								<div className="flex flex-row gap-1 text-lg">
									<div
										className={`flex w-3/12 flex-row items-center justify-between py-1`}
									>
										<p className="w-1/2 text-center text-[#61afe4]">
											{u.population}
										</p>
										<p className="w-1/2 text-center text-[#e06c75]">
											{formatTemps(u.timer)}
										</p>
									</div>
									<div
										className={`flex w-9/12  items-center justify-between px-3`}
									>
										<p
											className={`text-left text-[#98c379] ${
												index ==
													data
														.slice(
															Math.max(
																data.filter(
																	(step) =>
																		count >
																		step.timer
																).length -
																	Math.min(
																		data.filter(
																			(
																				step
																			) =>
																				count >
																				step.timer
																		)
																			.length,
																		2
																	)
															),
															Math.min(
																data.filter(
																	(step) =>
																		count >
																		step.timer
																).length + 6,
																data.length
															)
														)
														.filter(
															(step) =>
																count >
																step.timer
														).length &&
												"text-[#e5c07b]"
											}`}
										>
											{u.desc}
										</p>
									</div>
								</div>
							</div>
						);
					})}
			</div>
		</Layout>
	);
}

export default DisplayBuild;
