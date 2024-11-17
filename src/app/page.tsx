"use client";

import { AuthModal } from "@/components/auth-modal";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { useAppStore } from "@/providers/store-provider";
import Image from "next/image";

export default function AppPage() {
    const {
        modal: { onOpen, onClose },
        user: { data, setUser },
    } = useAppStore((state) => state);

    const handleSignOut = () => {
        setUser(null);
        onClose();
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-100 to-indigo-100 flex flex-col items-center justify-center p-4">
            <h1 className="text-4xl font-bold mb-8 text-indigo-800">
                Sign In Demo
            </h1>

            {data ? (
                <Card className="w-full max-w-md">
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold text-center">
                            User Information
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex justify-center">
                            <Image
                                src={data.avatarUrl}
                                alt={data.name}
                                width={128}
                                height={128}
                                className="w-32 h-32 rounded-full border-4 border-indigo-600"
                            />
                        </div>
                        <div className="text-center">
                            <p className="text-xl font-semibold">{data.name}</p>
                            <p className="text-gray-600">Email: {data.email}</p>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button
                            onClick={handleSignOut}
                            className="w-full bg-red-600 hover:bg-red-700"
                        >
                            Sign Out
                        </Button>
                    </CardFooter>
                </Card>
            ) : (
                <Button
                    onClick={() => onOpen("sign-in")}
                    className="bg-indigo-600 hover:bg-indigo-700"
                >
                    Sign In
                </Button>
            )}

            <AuthModal />
        </div>
    );
}
