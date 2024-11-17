"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import { SignInForm } from "./sign-in-form";

import { useAppStore } from "@/providers/store-provider";

export const AuthModal = () => {
    const { isOpen, type, onClose } = useAppStore((state) => state.modal);

    const isModalOpen = isOpen && type === "sign-in";

    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent className="px-10 py-10">
                <DialogHeader>
                    <DialogTitle>Welcome Back!</DialogTitle>
                    <DialogDescription>
                        Please log in to continue, or create a new account to
                        get started.
                    </DialogDescription>
                </DialogHeader>

                <SignInForm />
            </DialogContent>
        </Dialog>
    );
};
