import { useEffect, useState } from "react";
import Layout from "./components/Layout";
import BasicSelect from "./components/BasicSelect";
import ActionAreaCardBuild from "./components/ActionAreaCardBuild";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { getAllBuild } from "../../actions/actioncreators/buildOrder";

function Show() {
	const userLogged = useSelector(
		(state: RootState) => state.userLogged.value
	);

	const [data, setData] = useState([]);
	const [raceBuildDisplayed, setRaceBuildDisplayed] = useState(3);

	useEffect(() => {
		(async () => {
			console.log(await getAllBuild(userLogged.user.id));

			setData(await getAllBuild(userLogged.user.id));
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
				{data?.filter((race: any) => {
					if (raceBuildDisplayed === 3) {
						return true;
					}
					return race.playrace == raceBuildDisplayed;
				})?.length === 0 && (
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
