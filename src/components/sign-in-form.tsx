"use client";

import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { KeyRound, MailIcon } from "lucide-react";
import { toast } from "sonner";

import { useAppStore } from "@/providers/store-provider";

export const signInSchema = z.object({
    email: z.string().email({
        message: "Please enter a valid email address",
    }),
    password: z.string().min(6, {
        message: "Password must be at least 6 characters long",
    }),
});

export type SignInFormValues = z.infer<typeof signInSchema>;

export const SignInForm = () => {
    const {
        modal: { onClose },
        user: { setUser },
    } = useAppStore((state) => state);

    const [loading, setLoading] = useState(false);

    const form = useForm<SignInFormValues>({
        resolver: zodResolver(signInSchema),
        defaultValues: {
            email: "admin@gmail.com",
            password: "password",
        },
    });

    const onSubmit = async (values: SignInFormValues) => {
        setLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        toast.success(
            "Login successful. User data is saved in the local storage"
        );

        onClose();
        setUser?.({
            email: values.email,
            name: "John Doe",
            avatarUrl: "https://i.pravatar.cc/128",
        });
        setLoading(false);
    };

    return (
        <div className="space-y-6 mt-6">
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4"
                >
                    <div className="space-y-4">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <div className="relative">
                                        <MailIcon className="absolute top-2 left-3 size-5 text-muted-foreground" />
                                        <Input
                                            placeholder="E-mail"
                                            className="pl-10"
                                            {...field}
                                        />
                                    </div>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <div className="relative">
                                        <KeyRound className="absolute top-2 left-3 size-5 text-muted-foreground" />
                                        <Input
                                            type="password"
                                            placeholder="Password"
                                            className="pl-10"
                                            {...field}
                                        />
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <Button
                        type="submit"
                        className="w-full bg-indigo-600 hover:bg-indigo-700"
                        disabled={loading}
                    >
                        Login
                    </Button>
                </form>
            </Form>
        </div>
    );
};
