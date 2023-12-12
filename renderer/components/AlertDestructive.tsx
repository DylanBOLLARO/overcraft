import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";

export function AlertDestructive() {
	return (
		<div className="flex w-full bottom-0 absolute p-10 select-none lg:px-[25%]">
			<Alert variant="destructive">
				<AlertCircle className="h-4 w-4" />
				<AlertTitle>Error</AlertTitle>
				<AlertDescription>
					Your session has expired. Please log in again.
				</AlertDescription>
			</Alert>
		</div>
	);
}
