"use client";

import lancediumLogo from "./assets/lancedium-logo-transparent.png";
import { useState, useEffect } from "react";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const Home = () => {
    const [mounted, setMounted] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    // Simple animation on mount
    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <div className="min-h-dvh flex flex-col bg-gradient-to-b from-amber-50 to-orange-50">
            {/* Minimal header */}
            <header className="flex justify-between items-center px-6 py-6">
                <div className="w-10"></div> {/* Spacer for centering */}
                <Button
                    variant="ghost"
                    asChild
                    className="text-amber-800 hover:text-amber-600"
                >
                    <Link to="/auth">Sign In</Link>
                </Button>
            </header>

            {/* Main content - centered */}
            <main className="flex-1 flex flex-col items-center justify-center px-4 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={mounted ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="max-w-md flex flex-col items-center"
                >
                    {/* Logo */}
                    <div className="mb-8 relative">
                        <div className="absolute -inset-6 rounded-full bg-gradient-to-r from-amber-100 to-orange-100 blur-xl opacity-70"></div>
                        <img
                            src={lancediumLogo}
                            alt="Lancedium Logo"
                            className="relative w-32 h-32 object-contain"
                        />
                    </div>

                    {/* Brand name */}
                    <h1 className="text-4xl font-bold text-amber-900 mb-6">
                        lancedium
                    </h1>

                    {/* Introduction text */}
                    <p className="text-xl text-amber-800 mb-8 leading-relaxed">
                        Secure freelancing powered by blockchain technology.
                        Connect with global talent, collaborate with confidence,
                        and transact safely using ICP blockchain.
                    </p>

                    {/* Simple CTA */}
                    <div className="flex gap-4">
                        <Button
                            asChild
                            className="bg-amber-700 hover:bg-amber-800 text-amber-50 rounded-full px-8"
                        >
                            <Link to="/auth?signup=true">Get Started</Link>
                        </Button>
                        <Button
                            variant="outline"
                            asChild
                            className="text-amber-700 border-amber-300 hover:bg-amber-100 hover:text-amber-800 rounded-full px-8"
                        >
                            <a href="#learn-more">Learn More</a>
                        </Button>
                    </div>
                </motion.div>
            </main>

            {/* Minimal footer */}
            <footer className="py-6 text-center text-amber-700 text-sm">
                <p>
                    &copy; {new Date().getFullYear()} Lancedium. All rights
                    reserved.
                </p>
            </footer>
        </div>
    );
};

export default Home;
