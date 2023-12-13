import { Alert, AlertDescription, AlertTitle } from "./ui/alert";

export function AlertDestructive({ alertData }: any) {
	return (
		<div className="flex w-full bottom-0 absolute p-10 select-none lg:px-[25%]">
			<Alert variant={alertData.type}>
				<AlertTitle>{alertData.title}</AlertTitle>
				<AlertDescription>{alertData.message}</AlertDescription>
			</Alert>
		</div>
	);
}
