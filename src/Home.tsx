"use client";

import lancediumLogo from "./assets/lancedium-logo-transparent.png";
import { useState, useEffect } from "react";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useAuthClient } from "@/hooks/use-auth-client";

// Define the expected profile type (adjust based on UserProfile.mo)
interface Profile {
    username: string;
    email?: string;
    bio?: string;
}

const Home = () => {
    const { isAuthenticated, userProfileActor, principal, principalObject } =
        useAuthClient();
    const [mounted, setMounted] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [profile, setProfile] = useState<Profile | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Animation on mount
    useEffect(() => {
        setMounted(true);
    }, []);

    // Fetch user profile when authenticated
    useEffect(() => {
        const fetchProfile = async () => {
            if (!isAuthenticated || !userProfileActor || !principal) {
                setProfile(null);
                return;
            }

            setLoading(true);
            setError(null);

            try {
                // Adjust method name and type based on UserProfile.mo Candid
                const result =
                    await userProfileActor.getProfile(principalObject);
                if (result) {
                    setProfile({
                        username: result.username,
                        email: result.email ? result.email[0] : undefined,
                        bio: result.bio ? result.bio[0] : undefined,
                    });
                } else {
                    setError("Profile not found");
                }
            } catch (err) {
                console.error("Error fetching profile:", err);
                setError("Failed to fetch profile");
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [isAuthenticated, userProfileActor, principal]);

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
                    {isAuthenticated ? (
                        <Link to="/profile">View Profile</Link>
                    ) : (
                        <Link to="/auth">Sign In</Link>
                    )}
                </Button>
            </header>

            {/* Main content - centered */}
            <main className="flex-1 flex flex-col items-center justify-center px-4 text-center">
                {isAuthenticated && profile ? (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="max-w-md flex flex-col items-center"
                    >
                        <h1 className="text-3xl font-bold text-amber-900 mb-4">
                            Welcome, {profile.username}!
                        </h1>
                        <p className="text-lg text-amber-800 mb-2">
                            Principal: {principal}
                        </p>
                        {profile.email && (
                            <p className="text-lg text-amber-800 mb-2">
                                Email: {profile.email}
                            </p>
                        )}
                        {profile.bio && (
                            <p className="text-lg text-amber-800 mb-6">
                                Bio: {profile.bio}
                            </p>
                        )}
                        <Button
                            asChild
                            className="bg-amber-700 hover:bg-amber-800 text-amber-50 rounded-full px-8"
                        >
                            <Link to="/dashboard">Go to Dashboard</Link>
                        </Button>
                    </motion.div>
                ) : (
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
                        {loading ? (
                            <p className="text-xl text-amber-800 mb-8">
                                Loading profile...
                            </p>
                        ) : error ? (
                            <p className="text-xl text-red-600 mb-8">{error}</p>
                        ) : (
                            <p className="text-xl text-amber-800 mb-8 leading-relaxed">
                                Secure freelancing powered by blockchain
                                technology. Connect with global talent,
                                collaborate with confidence, and transact safely
                                using ICP blockchain.
                            </p>
                        )}

                        {/* Simple CTA */}
                        {!isAuthenticated && (
                            <div className="flex gap-4">
                                <Button
                                    asChild
                                    className="bg-amber-700 hover:bg-amber-800 text-amber-50 rounded-full px-8"
                                >
                                    <Link to="/auth?signup=true">
                                        Get Started
                                    </Link>
                                </Button>
                                <Button
                                    variant="outline"
                                    asChild
                                    className="text-amber-700 border-amber-300 hover:bg-amber-100 hover:text-amber-800 rounded-full px-8"
                                >
                                    <a href="#learn-more">Learn More</a>
                                </Button>
                            </div>
                        )}
                    </motion.div>
                )}
            </main>

            {/* Minimal footer */}
            <footer className="py-6 text-center text-amber-700 text-sm">
                <p>
                    © {new Date().getFullYear()} Lancedium. All rights
                    reserved.
                </p>
            </footer>
        </div>
    );
};

export default Home;
