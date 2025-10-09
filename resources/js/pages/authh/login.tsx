// src/pages/Login.jsx
import AuthLayout from '@/layouts/auth-layout';
import InputError from "@/components/input-error";
import { Form } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MdAccountCircle } from "react-icons/md";
import { GiPadlock } from "react-icons/gi";
import { IoCloseCircle } from "react-icons/io5";
import { FaGoogle } from "react-icons/fa";
import { LoaderCircle } from "lucide-react";
import TextLink from "@/components/text-link";
import { cn } from "@/lib/utils";
import AuthenticatedSessionController from "@/actions/App/Http/Controllers/Auth/AuthenticatedSessionController";

export default function Login() {
    return (
        <AuthLayout
            title="Log in"
            description="Enter your email and password below to log in and access amazing features"
        >
            <Form {...AuthenticatedSessionController.store.form()} resetOnSuccess={['password']} className="flex flex-col gap-6 w-full ">
                {({ processing, errors }) => (
                    <div className="flex flex-col w-full gap-24">
                        <div className="grid gap-3">
                            {/* Email */}
                            <div className="grid gap-1 text-white">
                                <div className="relative">
                                    <div className="absolute text-white left-2 flex h-full items-center">
                                        <MdAccountCircle className="size-7" />
                                    </div>
                                    {errors.email && (
                                        <div className="absolute text-red-500 right-3 flex h-full items-center">
                                            <IoCloseCircle className="size-6" />
                                        </div>
                                    )}
                                    <Input
                                        id="email"
                                        type="email"
                                        name="email"
                                        required
                                        autoFocus
                                        tabIndex={1}
                                        autoComplete="email"
                                        placeholder="email@example.com"
                                        className={cn(
                                            "border border-white pl-11 pr-10 py-5 text-sm rounded-full placeholder:text-white bg-white/15 backdrop-blur-md",
                                            errors.email
                                                ? "border-red-400 focus-visible:ring-2 focus-visible:ring-red-200"
                                                : "focus-visible:ring-white/10 focus-visible:border-white"
                                        )}
                                    />
                                </div>
                                <InputError message={errors.email} className="text-xs font-medium" />
                            </div>

                            {/* Password */}
                            <div className="grid gap-1 text-white">
                                <div className="relative">
                                    <div className="absolute text-white left-2.5 flex h-full items-center">
                                        <GiPadlock className="size-7" />
                                    </div>
                                    {errors.password && (
                                        <div className="absolute text-red-500 right-3 flex h-full items-center">
                                            <IoCloseCircle className="size-6" />
                                        </div>
                                    )}
                                    <Input
                                        id="password"
                                        type="password"
                                        name="password"
                                        required
                                        tabIndex={2}
                                        autoComplete="current-password"
                                        placeholder="password"
                                        className={cn(
                                            "border border-white pl-11 pr-10 py-5 text-sm rounded-full placeholder:text-white bg-white/15 backdrop-blur-md",
                                            errors.password
                                                ? "border-red-400 focus-visible:ring-2 focus-visible:ring-red-200"
                                                : "focus-visible:ring-white/10 focus-visible:border-white"
                                        )}
                                    />
                                </div>
                                <InputError message={errors.password} className="text-xs font-medium" />
                            </div>
                        </div>

                        {/* Buttons */}
                        <div className="flex flex-col w-full gap-4">
                            <div className="flex flex-col gap-3">
                                <Button type="submit" className="w-full bg-white text-black py-5" disabled={processing}>
                                    {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                                    Log in
                                </Button>

                                <Button type="button" className="w-full border border-white/50 bg-white/10 text-white py-5">
                                    <FaGoogle />
                                    Log in with Google
                                </Button>
                            </div>

                            <div className="flex flex-row items-center justify-center gap-2 text-sm">
                                <span>Don’t have an account?</span>
                                <TextLink href="/register" className="text-white underline underline-offset-4">
                                    Sign up
                                </TextLink>
                            </div>
                        </div>
                    </div>
                )}
            </Form>
        </AuthLayout>
    );
}
