"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import EmailVerificationNotificationController from "@/actions/App/Http/Controllers/Auth/EmailVerificationNotificationController";
import { logout } from "@/routes";
import { Form } from "@inertiajs/react";
import TextLink from "@/components/text-link";
import { Button } from "@/components/ui/button";
import AuthLayout from "@/layouts/auth-layout";
import { LoaderCircle } from "lucide-react";
import { toast } from "sonner";

const COOLDOWN_SECONDS = 60;

function formatMMSS(totalSeconds: number) {
    const m = Math.floor(totalSeconds / 60)
        .toString()
        .padStart(2, "0");
    const s = (totalSeconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
}

export default function VerifyEmail({ status }: { status?: string }) {
    const [cooldown, setCooldown] = useState<number>(0);
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

    useEffect(() => {
        if (status) {
            toast.success(
                typeof status === "string" ? status : "Verification link sent."
            );
            setCooldown(COOLDOWN_SECONDS);
        }
    }, [status]);

    useEffect(() => {
        if (cooldown <= 0) {
            if (timerRef.current) {
                clearInterval(timerRef.current);
                timerRef.current = null;
            }
            return;
        }
        if (timerRef.current) clearInterval(timerRef.current);
        timerRef.current = setInterval(() => {
            setCooldown((c) => {
                if (c <= 1 && timerRef.current) {
                    clearInterval(timerRef.current);
                    timerRef.current = null;
                }
                return Math.max(0, c - 1);
            });
        }, 1000);
        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
                timerRef.current = null;
            }
        };
    }, [cooldown]);

    const buttonLabel = useMemo(() => {
        if (cooldown > 0) return `Resend verification email (${formatMMSS(cooldown)})`;
        if (!status) return "Send verification email now";
        return "Resend verification email";
    }, [cooldown, status]);

    return (
        <AuthLayout
            title="Verify your email"
            description="Your email isn't verified yet. Please verify it to use the application."
        >
            <Form
                {...EmailVerificationNotificationController.store.form()}
                className="flex flex-col gap-6 w-full"
            >
                {({ processing }: { processing: boolean }) => {
                    const disabled = processing || cooldown > 0;
                    return (
                        <div className="flex flex-col w-full gap-8">
                            <div className="flex flex-col w-full gap-4">
                                <div className="flex flex-col gap-2">
                                    <Button
                                        type="submit"
                                        tabIndex={1}
                                        autoFocus
                                        className="w-full bg-white text-black py-5"
                                        disabled={disabled}
                                    >
                                        {processing && (
                                            <LoaderCircle className="h-4 w-4 mr-2 animate-spin" />
                                        )}
                                        {buttonLabel}
                                    </Button>

                                    {cooldown > 0 && (
                                        <div className="flex items-center justify-center gap-1 text-xs text-white/80">
                                            <span>Resend available in</span>
                                            <span className="font-medium">{formatMMSS(cooldown)}</span>
                                        </div>
                                    )}
                                </div>

                                <div className="flex flex-row items-center justify-center gap-2 text-sm">
                                    <TextLink
                                        href={logout()}
                                        tabIndex={2}
                                        className="text-white underline underline-offset-4"
                                    >
                                        Log out
                                    </TextLink>
                                </div>
                            </div>
                        </div>
                    );
                }}
            </Form>
        </AuthLayout>
    );
}