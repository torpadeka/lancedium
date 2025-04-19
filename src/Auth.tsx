"use client";

import lancediumLogo from "./assets/lancedium-logo-transparent.png";
import internetIdentityLogo from "./assets/internet_identity_logo.png";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAuthClient } from "./hooks/use-auth-client";

const Auth = () => {
    const { isAuthenticated, login, logout, principal } = useAuthClient();
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/");
        }
    }, [isAuthenticated, navigate]);

    return (
        <div className="flex min-h-dvh">
            {/* Left Side - Form */}
            <div className="flex-1 p-8 flex flex-col max-w-[600px]">
                <div className="flex items-center mb-8">
                    <img
                        src={lancediumLogo}
                        alt="Lancedium Logo"
                        className="h-10 w-auto"
                    />
                    <h1 className="text-2xl font-bold ml-2 text-slate-800">
                        lancedium
                    </h1>
                </div>

                <div className="flex flex-col justify-center max-w-[450px] mx-auto w-full h-full gap-4">
                    <h2 className="text-3xl font-bold text-slate-800">
                        {"Authentication"}
                    </h2>
                    <div>Please authenticate using Internet Identity</div>
                    <Button
                        onClick={login}
                        className="w-48 flex items-center justify-center gap-0"
                    >
                        <img
                            src={internetIdentityLogo}
                            alt="LOGO"
                            className="h-10"
                        />
                        <div>Internet Identity</div>
                    </Button>
                </div>
            </div>

            {/* Right Side - Illustration */}
            <div className="flex-1 bg-indigo-500 hidden lg:flex items-center justify-center p-8 relative overflow-hidden">
                <div className="relative max-w-[500px] w-full z-10 p-8">
                    <div className="absolute w-[150%] h-[150%] bg-white/10 rounded-[30%_70%_70%_30%/30%_30%_70%_70%] top-[-25%] left-[-25%] z-0 animate-[blob_15s_infinite_alternate_ease-in-out]"></div>
                    <Card className="bg-transparent border-0 shadow-none">
                        <CardContent className="p-8 text-white text-center">
                            <h2 className="text-3xl font-bold mb-6">
                                Secure Freelancing with Blockchain
                            </h2>
                            <p className="text-lg mb-8 opacity-90">
                                Join the future of work where transactions are
                                secure, transparent, and efficient.
                            </p>
                            <ul className="flex flex-col gap-4 max-w-[300px] mx-auto">
                                <li className="p-3 bg-white/10 rounded-xl font-medium">
                                    Smart contract protection
                                </li>
                                <li className="p-3 bg-white/10 rounded-xl font-medium">
                                    Lower platform fees
                                </li>
                                <li className="p-3 bg-white/10 rounded-xl font-medium">
                                    Instant payments
                                </li>
                                <li className="p-3 bg-white/10 rounded-xl font-medium">
                                    Global talent network
                                </li>
                            </ul>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default Auth;
