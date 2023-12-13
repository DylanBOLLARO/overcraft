import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { useDispatch } from "react-redux";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "./ui/form";
import { refresh } from "../features/userLogged/userLoggedSlice";
import { SIGNIN, SIGNUP } from "../constants/api";
import { fetch } from "../services/networking";

export default function AuthenticationPage({ setAlert, setAlertData }: any) {
	const dispatch = useDispatch();

	const formSignin = z.object({
		email: z.string().email(),
		password: z.string().min(5),
	});

	const formSigninInstance = useForm<z.infer<typeof formSignin>>({
		resolver: zodResolver(formSignin),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const formSignup = z.object({
		username: z.string().min(3).max(30),
		email: z.string().email(),
		password: z.string().min(5),
	});

	const formSignupInstance = useForm<z.infer<typeof formSignup>>({
		resolver: zodResolver(formSignup),
		defaultValues: {
			username: "",
			email: "",
			password: "",
		},
	});

	async function onSigninSubmit(values: z.infer<typeof formSignin>) {
		const { status, statusText, data }: any = await fetch(SIGNIN, {
			...values,
		});

		switch (status) {
			case 201:
				dispatch(refresh(data));
				break;

			case 409:
				setAlert(true);
				setAlertData({
					type: "destructive",
					title: "Error",
					message: statusText,
				});
				break;

			default:
				break;
		}
	}

	async function onSignupSubmit(values: z.infer<typeof formSignup>) {
		const { status, statusText } = await fetch(SIGNUP, { ...values });

		switch (status) {
			case 201:
				setAlert(true);
				setAlertData({
					type: "default",
					title: "Succes",
					message: statusText,
				});
				break;

			case 409:
				setAlert(true);
				setAlertData({
					type: "destructive",
					title: "Error",
					message: statusText,
				});
				break;

			default:
				break;
		}
	}

	return (
		<Tabs defaultValue="signin" className="w-[500px]">
			<TabsList className="grid w-full grid-cols-2">
				<TabsTrigger value="signin">Sign in</TabsTrigger>
				<TabsTrigger value="signup">Sign up</TabsTrigger>
			</TabsList>
			<TabsContent value="signin">
				<Card>
					<CardHeader>
						<CardTitle>Already a member ? Sign in !</CardTitle>
						<CardDescription>
							Fill in the fields below to create your account.
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-2">
						<Form {...formSigninInstance}>
							<form
								onSubmit={formSigninInstance.handleSubmit(
									onSigninSubmit,
								)}
								className="space-y-8"
							>
								<FormField
									control={formSigninInstance.control}
									name="email"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Email</FormLabel>
											<FormControl>
												<Input
													type="email"
													placeholder="skywalker@gmail.com"
													{...field}
												/>
											</FormControl>

											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={formSigninInstance.control}
									name="password"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Password</FormLabel>
											<FormControl>
												<Input
													placeholder="**********"
													type="password"
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<Button type="submit">Submit</Button>
							</form>
						</Form>
					</CardContent>
				</Card>
			</TabsContent>
			<TabsContent value="signup">
				<Card>
					<CardHeader>
						<CardTitle>Become a member ! Sign up !</CardTitle>
						<CardDescription>
							Fill in the fields below to create your account.
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-2">
						<Form {...formSignupInstance}>
							<form
								onSubmit={formSignupInstance.handleSubmit(
									onSignupSubmit,
								)}
								className="space-y-8"
							>
								<FormField
									control={formSignupInstance.control}
									name="username"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Username</FormLabel>
											<FormControl>
												<Input
													placeholder="Skywalker"
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={formSignupInstance.control}
									name="email"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Email</FormLabel>
											<FormControl>
												<Input
													type="email"
													placeholder="skywalker@gmail.com"
													{...field}
												/>
											</FormControl>

											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={formSignupInstance.control}
									name="password"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Password</FormLabel>
											<FormControl>
												<Input
													placeholder="**********"
													type="password"
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<Button type="submit">Submit</Button>
							</form>
						</Form>
					</CardContent>
				</Card>
			</TabsContent>
		</Tabs>
	);
}
