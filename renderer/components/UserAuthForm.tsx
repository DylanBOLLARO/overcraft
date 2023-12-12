"use client";

import * as React from "react";

import { cn } from "../lib/utils";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { signin, signup } from "../actions/actioncreators/buildOrder";
import { useDispatch } from "react-redux";
import { refresh } from "../features/userLogged/userLoggedSlice";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
	const dispatch = useDispatch();

	const [isLoading, setIsLoading] = React.useState<boolean>(false);
	const [createAccount, setCreateAccount] = React.useState<boolean>(false);

	const username = React.useRef<HTMLInputElement>(null);
	const email = React.useRef<HTMLInputElement>(null);
	const password = React.useRef<HTMLInputElement>(null);

	const handleSubmit = async (e: any) => {
		e.preventDefault();
		setIsLoading(true);

		if (createAccount) {
			await signup(
				email.current?.value || "",
				password.current?.value || "",
				username.current?.value || "",
			);
		} else {
			dispatch(
				refresh(
					await signin(
						email.current?.value || "",
						password.current?.value || "",
					),
				),
			);
		}
		setIsLoading(false);
	};

	return (
		<>
			<div className="flex flex-col space-y-2 text-center">
				<h1 className="text-2xl font-semibold tracking-tight">
					{createAccount
						? `Become a member ! Sign up !`
						: `Already a member ? Sign in !`}
				</h1>
				<p className="text-sm text-muted-foreground">
					{createAccount
						? `Fill in the fields below to create your account.`
						: `Enter your email and password to log in.`}
				</p>
			</div>

			<div className={cn("grid gap-6", className)} {...props}>
				<form onSubmit={handleSubmit}>
					<div className="grid gap-5">
						{createAccount && (
							<div className="grid gap-1">
								<Label className="mb-2" htmlFor="email">
									Username
								</Label>
								<Input
									id="username"
									placeholder="Skywalker"
									type="text"
									autoCapitalize="none"
									autoCorrect="off"
									disabled={isLoading}
									ref={username}
								/>
							</div>
						)}

						<div className="grid gap-1">
							<Label className="mb-2" htmlFor="email">
								Email
							</Label>
							<Input
								id="email"
								placeholder="skywalker@gmail.com"
								type="email"
								autoCapitalize="none"
								autoComplete="email"
								autoCorrect="off"
								disabled={isLoading}
								ref={email}
							/>
						</div>
						<div className="grid gap-1">
							<Label className="mb-2" htmlFor="email">
								Password
							</Label>
							<Input
								id="password"
								placeholder="*******"
								type="password"
								autoCapitalize="none"
								disabled={isLoading}
								ref={password}
							/>
						</div>
						<Button disabled={isLoading}>Sign In</Button>
					</div>
				</form>
				<div className="relative">
					<div className="absolute inset-0 flex items-center">
						<span className="w-full border-t" />
					</div>
					<div className="relative flex justify-center text-xs uppercase">
						<span className="bg-background px-2 text-muted-foreground">
							{createAccount
								? `Or Sign in`
								: `Or Create Your Account`}
						</span>
					</div>
				</div>
				<Button
					variant="outline"
					type="button"
					disabled={isLoading}
					onClick={() => setCreateAccount(!createAccount)}
				>
					{createAccount
						? "Sign in to your account"
						: "Create My Account"}
				</Button>
			</div>
		</>
	);
}
