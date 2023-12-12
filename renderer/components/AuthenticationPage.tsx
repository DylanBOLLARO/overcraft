import { Button } from "./ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useDispatch } from "react-redux";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "./ui/form";

export default function AuthenticationPage() {
	const dispatch = useDispatch();

	const [isLoading, setIsLoading] = useState<boolean>(false);

	const formSchema = z.object({
		username: z.string().min(2).max(50),
	});

	// 1. Define your form.
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			username: "",
		},
	});

	// 2. Define a submit handler.
	function onSubmit(values: z.infer<typeof formSchema>) {
		// Do something with the form values.
		// ✅ This will be type-safe and validated.
		console.log(values);
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
						<Form {...form}>
							<form
								onSubmit={form.handleSubmit(onSubmit)}
								className="space-y-8"
							>
								<FormField
									control={form.control}
									name="username"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Username</FormLabel>
											<FormControl>
												<Input
													placeholder="shadcn"
													{...field}
												/>
											</FormControl>
											<FormDescription>
												This is your public display
												name.
											</FormDescription>
											<FormMessage />
										</FormItem>
									)}
								/>
								<Button type="submit">Submit</Button>
							</form>
						</Form>
						<div className="space-y-1">
							<Label htmlFor="name">Email</Label>
							<Input
								id="name"
								placeholder="skywalker@gmail.com"
								type="email"
							/>
						</div>
						<div className="space-y-1">
							<Label htmlFor="username">Password</Label>
							<Input
								id="username"
								placeholder="*******"
								type="password"
							/>
						</div>
					</CardContent>
					<CardFooter>
						<div className="flex w-full justify-center">
							<Button>Submit</Button>
						</div>
					</CardFooter>
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
						<div className="space-y-1">
							<Label htmlFor="username">Username</Label>
							<Input
								id="username"
								placeholder="Skywalker"
								type="text"
							/>
						</div>
						<div className="space-y-1">
							<Label htmlFor="email">Email</Label>
							<Input
								id="email"
								type="email"
								placeholder="skywalker@gmail.com"
							/>
						</div>
						<div className="space-y-1">
							<Label htmlFor="password">Password</Label>
							<Input
								id="password"
								placeholder="*******"
								type="password"
							/>
						</div>
					</CardContent>
					<CardFooter>
						<div className="flex w-full justify-center">
							<Button>Submit</Button>
						</div>
					</CardFooter>
				</Card>
			</TabsContent>
		</Tabs>
	);
}
function useState<T>(arg0: boolean): [any, any] {
	throw new Error("Function not implemented.");
}

function signup(arg0: string, arg1: string, arg2: string) {
	throw new Error("Function not implemented.");
}

function refresh(arg0: any): any {
	throw new Error("Function not implemented.");
}

function signin(arg0: string, arg1: string): any {
	throw new Error("Function not implemented.");
}
function useRef<T>(arg0: null) {
	throw new Error("Function not implemented.");
}
