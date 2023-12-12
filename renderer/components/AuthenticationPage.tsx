import { UserAuthForm } from "./UserAuthForm";

export default function AuthenticationPage() {
	return (
		<>
			<div className="p-8">
				<div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
					<UserAuthForm />
				</div>
			</div>
		</>
	);
}
