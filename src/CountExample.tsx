import { useQueryCall, useUpdateCall } from "@ic-reactor/react";
import motokoLogo from "./assets/motoko_moving.png";
import motokoShadowLogo from "./assets/motoko_shadow.png";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import { Button } from "./components/ui/button";

function CountExample() {
    const { data: count, refetch } = useQueryCall({
        functionName: "get",
    });

    const { call: increment, loading } = useUpdateCall({
        functionName: "inc",
        onSuccess: refetch,
    });

    return (
        <div className="w-screen h-screen bg-white flex items-center justify-center">
            <Button onClick={increment} disabled={loading}>
                count is {count?.toString() ?? "loading..."}
            </Button>
        </div>
    );
}

export default CountExample;
