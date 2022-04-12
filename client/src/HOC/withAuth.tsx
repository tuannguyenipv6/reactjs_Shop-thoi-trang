import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import Loading from '../components/Loading';
import { AuthContext } from "../contexts/AuthContext";

const withAuth = (WrappedComponent: React.ComponentType) => {
 
    return () => {
        const {authState: {authLoading, isAuthenticated}, loadUser} = useContext(AuthContext)
        const Router = useRouter();

        useEffect(() => {
            const fetchData = async () => {
                const result = await loadUser();
                if(result < 0) {
                    Router.replace("/login");
                }
            }

            fetchData()
        }, []);

        if (authLoading) {
            return <Loading />;
        }else if(isAuthenticated) {
            return <WrappedComponent />;
        }else {
            Router.replace("/login");
            return null;
        }
    }
};

export default withAuth;