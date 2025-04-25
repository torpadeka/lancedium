import {
    AuthClient,
    AuthClientCreateOptions,
    AuthClientLoginOptions,
} from "@dfinity/auth-client";
import React, {
    createContext,
    useContext,
    useEffect,
    useState,
    ReactNode,
} from "react";
import { ActorSubclass, HttpAgent, Identity } from "@dfinity/agent";
import {
    canisterId as internetIdentityCanisterId,
    createActor as createInternetIdentityActor,
} from "@/declarations/internet_identity";
import {
    canisterId as userProfileCanisterId,
    createActor as createUserProfileActor,
} from "@/declarations/user_profile";
import { Principal } from "@ic-reactor/react/dist/types";

interface AuthContextType {
    isAuthenticated: boolean;
    login: () => void;
    logout: () => void;
    authClient: AuthClient | null;
    identity: Identity | null;
    principal: string | null;
    whoamiActor: ActorSubclass<any> | null;
    userProfileActor: ActorSubclass<any> | null; // Added for user_profile
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const getIdentityProvider = (): string | undefined => {
    if (typeof window !== "undefined") {
        const isLocal = import.meta.env.VITE_DFX_NETWORK !== "ic";
        const isSafari = /^((?!chrome|android).)*safari/i.test(
            navigator.userAgent
        );
        if (isLocal && isSafari) {
            return `http://127.0.0.1:4943/?canisterId=${import.meta.env.VITE_CANISTER_ID_INTERNET_IDENTITY}`;
        } else if (isLocal) {
            return `http://${import.meta.env.VITE_CANISTER_ID_INTERNET_IDENTITY}.localhost:4943`;
        }
    }
    return "https://identity.ic0.app";
};

export const defaultOptions = {
    createOptions: {
        idleOptions: {
            disableIdle: true,
        },
    } as AuthClientCreateOptions,
    loginOptions: {
        identityProvider: getIdentityProvider(),
    } as AuthClientLoginOptions,
};

export const useAuthClient = (options = defaultOptions) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [authClient, setAuthClient] = useState<AuthClient | null>(null);
    const [identity, setIdentity] = useState<Identity | null>(null);
    const [principalObject, setPrincipalObject] = useState<Principal | null>(null);
    const [principal, setPrincipal] = useState<string | null>(null);
    const [whoamiActor, setWhoamiActor] = useState<ActorSubclass<any> | null>(
        null
    );
    const [userProfileActor, setUserProfileActor] =
        useState<ActorSubclass<any> | null>(null);

    useEffect(() => {
        AuthClient.create(options.createOptions).then((client) => {
            updateClient(client);
        });
    }, []);

    const login = () => {
        if (!authClient) return;
        authClient.login({
            ...options.loginOptions,
            onSuccess: () => {
                updateClient(authClient);
            },
        });
    };

    async function updateClient(client: AuthClient) {
        const isAuthenticated = await client.isAuthenticated();
        setIsAuthenticated(isAuthenticated);

        const identity = client.getIdentity();
        setIdentity(identity);

        const principalObject = identity.getPrincipal();
        setPrincipalObject(principalObject);

        const principal = principalObject.toText();
        setPrincipal(principal);

        setAuthClient(client);

        const agent = new HttpAgent({ identity });

        const internetIdentityActor = createInternetIdentityActor(
            internetIdentityCanisterId,
            {
                agentOptions: { identity },
            }
        );
        setWhoamiActor(internetIdentityActor);

        const userProfileActor = createUserProfileActor(userProfileCanisterId, {
            agentOptions: { identity },
        });
        setUserProfileActor(userProfileActor);
    }

    async function logout() {
        if (!authClient) return;
        await authClient.logout();
        await updateClient(authClient);
    }

    return {
        isAuthenticated,
        login,
        logout,
        authClient,
        identity,
        principalObject,
        principal,
        whoamiActor,
        userProfileActor,
    };
};

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const auth = useAuthClient();
    return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
