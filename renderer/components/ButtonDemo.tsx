import { Button } from "./ui/button";

export function ButtonDemo() {
	return (
		<Button
			onClick={() => {
				console.log("object");
			}}
		>
			Button
		</Button>
	);
}
