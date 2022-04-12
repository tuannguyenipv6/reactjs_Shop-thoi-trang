import { useRouter } from "next/router";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

const registerLogin = (WrappedComponent: React.ComponentType) => {
    return () => {
        const {authState: {isAuthenticated, user}} = useContext(AuthContext)
        const router = useRouter();

        if (isAuthenticated) {
            if(user?.admin) {
                router.replace('/dashboards');
                return null;
            }else {
                router.replace('/');
                return null;
            }
        }else {
            return <WrappedComponent />;
        }
    }
};

export default registerLogin;