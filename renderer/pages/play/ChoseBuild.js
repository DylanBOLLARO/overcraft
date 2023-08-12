import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { ipcRenderer } from "electron";
import Layout from "./components/Layout";
import { TbSquareRounded, TbSquareRoundedFilled } from "react-icons/tb";
import { getAllBuild } from "../../actions/actioncreators/buildOrder";

export default function ProductScreen() {
	const { query } = useRouter();
	const router = useRouter();

	const [selectedBuild, setSelectedBuild] = useState(0);
	const [data, setData] = useState([]);
	const [first, setfirst] = useState("");
	const [buildStep, setBuildStep] = useState(null);

	const incCounter = () => {
		setSelectedBuild((prevCounter) => prevCounter + 1);
	};

	const decCounter = () => {
		setSelectedBuild((prevCounter) => prevCounter - 1);
	};

	useEffect(() => {
		ipcRenderer.send("send-variable-to-main", 156328);

		ipcRenderer.on("variable-value-from-main", (event, variableValue) => {
			setfirst(variableValue);
		});
	}, [first]);

	useEffect(() => {
		(async () => {
			setData(await getAllBuild(first));
		})();
	}, [first]);

	useEffect(() => {
		ipcRenderer.on("num7", () => {
			decCounter();
		});

		ipcRenderer.on("num8", async () => {
			console.log("first : " + first);
			console.log("data[selectedBuild].id : " + data[selectedBuild].id);

			if (data) {
				router.push({
					pathname: "/play/DisplayBuild",
					query: {
						build: data[selectedBuild]?.id,
					},
				});
			}
		});

		ipcRenderer.on("num9", () => {
			incCounter();
		});

		ipcRenderer.on("num5", async () => {
			router.push({
				pathname: "/play/OpponentRace",
				query: { racePlayed: query.racePlayed },
			});
		});

		return () => {
			ipcRenderer.removeAllListeners("num7");
			ipcRenderer.removeAllListeners("num8");
			ipcRenderer.removeAllListeners("num9");
			ipcRenderer.removeAllListeners("num5");
		};
	}, [selectedBuild, first, data]);

	return (
		<Layout title={`Select your build order`}>
			<div className="flex flex-col justify-between gap-2 overflow-hidden">
				{data &&
					data.map((race, index) => (
						<div
							key={race.name}
							className="flex w-full flex-row items-center justify-between bg-black/50 px-3 py-1 text-zinc-300"
						>
							<p className={`text-lg`}>{race.title}</p>

							{index === selectedBuild ? (
								<p className={`text-lg text-zinc-500`}>
									<div className="relative">
										<TbSquareRounded size={32} />
										<div className="absolute -translate-y-6 translate-x-2 text-[#98c379]">
											<TbSquareRoundedFilled size={16} />
										</div>
									</div>
								</p>
							) : (
								<p className={`text-lg text-zinc-500`}>
									<TbSquareRounded size={32} />
								</p>
							)}
						</div>
					))}
			</div>
		</Layout>
	);
	4;
}
