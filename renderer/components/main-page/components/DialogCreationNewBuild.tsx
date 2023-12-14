import React, { useState } from "react";
import { Button } from "../../ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "../../ui/dialog";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "../../ui/form";
import { PUBLISH_BUILD } from "../../../constants/api";
import { fetch } from "../../../services/networking";
import { ENUM_VIEW_PAGE } from "../../../constants/main";

const formSchema = z.object({
	username: z.string().min(2).max(50),
});

const DialogCreationNewBuild = ({ setView }: any) => {
	const [open, setOpen] = React.useState(false);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			username: "",
		},
	});

	async function onSubmit(values: z.infer<typeof formSchema>) {
		await fetch(PUBLISH_BUILD, {
			title: values.username,
			desc: values.username,
			playrace: "0",
			versusrace: "0",
			User_id: "1",
		});

		setOpen(false);
		form.reset();
		setView(ENUM_VIEW_PAGE.UPDATE);
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button variant="outline">
					<PlusCircledIcon className="mr-2 h-4 w-4" />
					Add build order
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="space-y-8"
					>
						<DialogHeader>
							<DialogTitle>
								Creation of a new build order
							</DialogTitle>
							<DialogDescription>
								Choose a name for your build order
							</DialogDescription>
						</DialogHeader>
						<FormField
							control={form.control}
							name="username"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Name</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
									<FormDescription>
										This is the name of your public build
										order
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
						<DialogFooter>
							<Button type="submit">Submit</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
};

export default DialogCreationNewBuild;
