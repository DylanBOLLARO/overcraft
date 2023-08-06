import { useEffect, useState } from "react";
import Layout from "./components/Layout";
import BasicSelect from "./components/BasicSelect";
import ActionAreaCardBuild from "./components/ActionAreaCardBuild";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

function Show() {
	const userLogged = useSelector(
		(state: RootState) => state.userLogged.value
	);

	const [data, setData] = useState([]);

	const [raceBuildDisplayed, setRaceBuildDisplayed] = useState(3);

	useEffect(() => {
		(async () => {
			try {
				const response = await axios.post(
					"http://127.0.0.1:3100/build-order/get-all-build",
					{
						id: "" + userLogged.user.id,
					}
				);
				setData(response.data);
			} catch (error) {
				console.error(error);
			}
		})();
	}, []);

	return (
		<Layout>
			<div className="m-8 flex items-center justify-center gap-5 font-mono text-2xl font-bold text-zinc-300">
				<BasicSelect
					raceBuildDisplayed={raceBuildDisplayed}
					setRaceBuildDisplayed={setRaceBuildDisplayed}
				/>
			</div>
			<div className="m-3 flex flex-wrap justify-center gap-5">
				{data?.length === 0 && (
					<p className="text-2xl text-zinc-300">
						There is no build order
					</p>
				)}

				{data
					?.filter((race: any) => {
						if (raceBuildDisplayed === 3) {
							return true;
						}
						return race.playrace == raceBuildDisplayed;
					})
					.map((build: any, index: number) => (
						<ActionAreaCardBuild key={index} buildData={build} />
					))}
			</div>
		</Layout>
	);
}

export default Show;
