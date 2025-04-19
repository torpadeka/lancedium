import { ActorProvider, AgentProvider } from "@ic-reactor/react";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import { canisterId, idlFactory } from "./declarations/backend";
import "./index.css";
import Home from "./Home";
import Auth from "./Auth";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <AgentProvider withProcessEnv>
            <ActorProvider idlFactory={idlFactory} canisterId={canisterId}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/auth" element={<Auth />} />
                    </Routes>
                </BrowserRouter>
            </ActorProvider>
        </AgentProvider>
    </React.StrictMode>
);
