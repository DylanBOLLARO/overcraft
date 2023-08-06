import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function createData(
	name: any,
	calories: any,
	fat: any,
	carbs: any,
	protein: any
) {
	return { name, calories, fat, carbs, protein };
}

interface props {
	data: any;
	local: any;
}

export default function BasicTable({ data, local }: props) {
	return (
		<TableContainer component={Paper}>
			<Table sx={{ minWidth: 650 }} aria-label="simple table">
				<TableHead>
					<TableRow>
						<TableCell sx={{ width: "5%" }} align="left">
							Line
						</TableCell>
						<TableCell align="left">Description</TableCell>
						<TableCell sx={{ width: "5%" }} align="center">
							Population
						</TableCell>
						<TableCell sx={{ width: "5%" }} align="center">
							Timer
						</TableCell>
						<TableCell sx={{ width: "15%" }} align="center">
							Option
						</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{data?.map((line: any, index: number) => (
						<TableRow
							key={line.id}
							sx={{
								"&:last-child td, &:last-child th": {
									border: 0,
								},
							}}
						>
							<TableCell align="left">{index + 1}</TableCell>
							<TableCell align="left">{line?.desc}</TableCell>
							<TableCell align="center">
								{line?.population}
							</TableCell>
							<TableCell align="center">{line?.timer}</TableCell>
							<TableCell align="center">OPTIONS</TableCell>
						</TableRow>
					))}
					<TableRow
						sx={{
							"&:last-child td, &:last-child th": { border: 0 },
						}}
					>
						<TableCell align="left"></TableCell>
						<TableCell align="left">{local?.desc}</TableCell>
						<TableCell align="center">
							{local?.population}
						</TableCell>
						<TableCell align="center">{local?.timer}</TableCell>
						<TableCell align="center"></TableCell>
					</TableRow>
				</TableBody>
			</Table>
		</TableContainer>
	);
}
