import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import Loading from '../components/Loading';
import { AuthContext } from "../contexts/AuthContext";

const withAuthAdmin = (WrappedComponent: React.ComponentType) => {
 
    return () => {
        const {authState: {authLoading, isAuthenticated, user}, loadUser} = useContext(AuthContext)
        const Router = useRouter();

        useEffect(() => {
            const fetchData = async () => {
                const result = await loadUser();
                if(!result) {
                    Router.replace("/login");
                }
            }

            fetchData()
        }, []);

        if (authLoading) {
            return <Loading />;
        }else if(isAuthenticated) {
            if(user?.admin) {
                return <WrappedComponent />;
            }else {
                Router.replace("/");
                return null;
            }
        }else {
            Router.replace("/login");
            return null;
        }
    }
};

export default withAuthAdmin;