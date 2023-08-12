import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
	BsFillArrowUpSquareFill,
	BsFillArrowDownSquareFill,
	BsFillTrashFill,
} from "react-icons/bs";

import { AiFillEdit } from "react-icons/ai";
import axios from "axios";
import {
	deleteLine,
	swapLineDown,
	swapLineUp,
} from "../../../actions/actioncreators/buildOrder";

interface props {
	data: any;
	local: any;
	setRefreshLines: any;
	buildId: any;
}

const formatTemps = (temps: number) => {
	const minutes = Math.floor(temps / 60);
	const secondes = temps % 60;
	return `${minutes.toString().padStart(2, "0")}:${secondes
		.toString()
		.padStart(2, "0")}`;
};

export default function BasicTable({
	data,
	local,
	setRefreshLines,
	buildId,
}: props) {
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
					{data
						?.sort((a: any, b: any) => a.id - b.id)
						?.map((line: any, index: number) => (
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
								<TableCell align="center">
									{formatTemps(line?.timer)}
								</TableCell>
								<TableCell align="center">
									<div className="flex flex-row justify-center gap-4 text-lg">
										<button
											className="hover:scale-110 duration-75"
											onClick={async () => {}}
										>
											<AiFillEdit color="green" />{" "}
										</button>
										<button
											className="hover:scale-110 duration-75"
											onClick={async () => {
												await swapLineUp(
													line.id,
													buildId
												);
												setRefreshLines(true);
											}}
										>
											<BsFillArrowUpSquareFill color="#3a94ef" />
										</button>
										<button
											className="hover:scale-110 duration-75"
											onClick={async () => {
												await swapLineDown(
													line.id,
													buildId
												);
												setRefreshLines(true);
											}}
										>
											<BsFillArrowDownSquareFill color="#e5c07b" />{" "}
										</button>

										<button
											className="hover:scale-110 duration-75"
											onClick={async () => {
												await deleteLine(line.id);
												setRefreshLines(true);
											}}
										>
											<BsFillTrashFill color="red" />{" "}
										</button>
									</div>
								</TableCell>
							</TableRow>
						))}
					<TableRow
						sx={{
							"&:last-child td, &:last-child th": { border: 0 },
						}}
					>
						<TableCell align="left"></TableCell>
						<TableCell align="left">{local?.description}</TableCell>
						<TableCell align="center">
							{local?.population}
						</TableCell>
						<TableCell align="center">
							{formatTemps(local?.timer)}
						</TableCell>
						<TableCell align="center"></TableCell>
					</TableRow>
				</TableBody>
			</Table>
		</TableContainer>
	);
}
