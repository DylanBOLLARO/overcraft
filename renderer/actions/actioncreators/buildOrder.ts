import axios from "axios";

async function getAllBuild(id: number) {
	try {
		const response = await axios.post(
			`http://${process.env.SUPERYETI_API}/build-order/get-all-build`,
			{
				id: "" + id,
			}
		);
		return response.data;
	} catch (error) {
		console.error(error);
	}
}

async function signup(username: string, email: string, password: string) {
	try {
		const response = await axios.post(`http://${process.env.SUPERYETI_API}/auth/signup`, {
			username,
			email,
			password,
		});
		return response;
	} catch (error) {
		console.error(error);
		return null;
	}
}

async function signin(email: string, password: string) {
	try {
		const response = await axios.post(
			`http://${process.env.SUPERYETI_API}/auth/signin`,
			{
				email,
				password,
			}
		);
		return response;
	} catch (error) {
		console.error(error);
		return null;
	}
}

async function newBuild(
	title: string,
	playrace: string,
	versusrace: string,
	id: number
) {
	console.log({
		title: "" + title,
		desc: "desc",
		playrace: "" + playrace,
		versusrace: "" + versusrace,
		User_id: "" + id,
	});

	try {
		await axios.post(
			`http://${process.env.SUPERYETI_API}/build-order/new-build`,
			{
				title: "" + title,
				desc: "desc",
				playrace: "" + playrace,
				versusrace: "" + versusrace,
				User_id: "" + id,
			}
		);
	} catch (error) {
		console.error(error);
	}
}

async function addLine(
	description: string | null,
	population: number | null,
	timer: number | null,
	build_order_id: number | null
) {
	try {
		console.log({
			desc: description,
			population: "" + population,
			timer: "" + timer,
			buildName_id: "" + build_order_id,
		});
		console.log(process.env.SUPERYETI_API);

		await axios.post(
			`http://${process.env.SUPERYETI_API}/build-order/add-line`,
			{
				desc: description,
				population: "" + population,
				timer: "" + timer,
				buildName_id: "" + build_order_id,
			}
		);
	} catch (error) {
		console.error(error);
	}
}

async function getAllLines(id: any) {
	try {
		const response = await axios.post(
			`http://${process.env.SUPERYETI_API}/build-order/get-all-lines`,
			{
				id,
			}
		);
		console.error(response.data);
		return response.data.sort((a: any, b: any) => a.timer - b.timer);
	} catch (error) {
		console.error(error);
	}
}

async function deleteLine(id: number) {
	try {
		await axios.post(
			`http://${process.env.SUPERYETI_API}/build-order/delete-line`,
			{
				id: "" + id,
			}
		);
	} catch (error) {
		console.error(error);
	}
}

async function swapLineUp(id: number, buildId: number) {
	try {
		await axios.post(
			`http://${process.env.SUPERYETI_API}/build-order/swap-line-up`,
			{
				table: "buildStep",
				id: "" + id,
				buildId,
			}
		);
	} catch (error) {
		console.error(error);
	}
}

async function swapLineDown(id: number, buildId: number) {
	try {
		await axios.post(
			`http://${process.env.SUPERYETI_API}/build-order/swap-line-down`,
			{
				table: "buildStep",
				id: "" + id,
				buildId,
			}
		);
	} catch (error) {
		console.error(error);
	}
}

async function deleteBuild(idOfBuild: any) {
	try {
		await axios.post(
			`http://${process.env.SUPERYETI_API}/build-order/delete-build`,
			{
				id: "" + idOfBuild,
			}
		);
	} catch (error) {
		console.error(error);
	}
}

export {
	getAllBuild,
	signup,
	signin,
	newBuild,
	addLine,
	getAllLines,
	deleteLine,
	swapLineUp,
	swapLineDown,
	deleteBuild,
};
