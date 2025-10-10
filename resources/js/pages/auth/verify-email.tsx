"use client"
import { useEffect } from 'react';
import EmailVerificationNotificationController from '@/actions/App/Http/Controllers/Auth/EmailVerificationNotificationController';
import { logout } from '@/routes';
import { Form } from "@inertiajs/react";
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import AuthLayout from '@/layouts/auth-layout';
import { LoaderCircle } from "lucide-react";
import { toast } from "sonner";

export default function VerifyEmail({ status }: { status?: string }) {
    useEffect(() => {
        if (status) {
            toast.success(status);
        }
    }, [status]);
    return (
        <AuthLayout
            title="Verify your email"
            description="Please verify your email address by clicking on the link we just emailed to you."
        >
            <Form
                {...EmailVerificationNotificationController.store.form()}
                className="flex flex-col gap-6 w-full">
                {({ processing }) => (
                    <div className="flex flex-col w-full gap-8">
                        <div className="flex flex-col w-full gap-4">
                            <div className="flex flex-col gap-2">
                                <Button
                                    type="submit"
                                    tabIndex={1}
                                    autoFocus
                                    className="w-full bg-white text-black py-5"
                                    disabled={processing}>
                                    {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                                    Resend verification email
                                </Button>

                                <div className="flex flex-row gap-1 text-xs">
                                    <span className='flex text-xs'>Resend in</span>
                                    <span className='flex text-xs'>00:45</span>
                                </div>
                            </div>

                            <div className="flex flex-row items-center justify-center gap-2 text-sm">
                                <TextLink
                                    href={logout()}
                                    tabIndex={2}
                                    className="text-white underline underline-offset-4">
                                    Log out
                                </TextLink>
                            </div>
                        </div>
                    </div>
                )}
            </Form>
        </AuthLayout>
    );
}
