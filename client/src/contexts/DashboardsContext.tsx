import { createContext, ReactNode, useContext, useEffect, useReducer } from "react";
import { getAllOder, getInfoShop } from "../lib";
import { dashboardsReducer, IDashboardsState } from "../reducers";
import { DashboardsActionType } from "../reducers/types";
import { AuthContext } from "./AuthContext";

const {SET_LOGO, SET_STATE_TAKE_ORDER, TAKE_ALL} = DashboardsActionType

interface IDashboardsContext {
    dashboardsState: IDashboardsState;
    fetchDataOrder:  () => Promise<void>;
    setStateTakeOrder: (state: DashboardsActionType) => void;
}

const dashboardsDefault: IDashboardsState = {
    logo: '',
    takeOrder: TAKE_ALL,
    orders: []
}

export const DashboardsContext = createContext<IDashboardsContext>({
    dashboardsState: dashboardsDefault,
    fetchDataOrder: async () => {},
    setStateTakeOrder: () => {}
})

interface IDashboardsContextProvider {
    children: ReactNode;
}

const DashboardsProvider = ({children}: IDashboardsContextProvider) => {
    // State
    const [dashboardsState, dispatch] = useReducer(dashboardsReducer, dashboardsDefault);
    const {authState: {user}} = useContext(AuthContext);

    // lấy logo từ db
    const getLogo = async () => {
        const response = await getInfoShop()
        if(response.success) {
            dispatch({
                type: SET_LOGO,
                payload: {
                    ...dashboardsState,
                    logo: response.infoShop.NameLogo
                }
            });
        }
    }

    const fetchDataOrder = async () => {
        const res = await getAllOder();
        if (res.success) {
            dispatch({
                type: dashboardsState.takeOrder,
                payload: {
                    ...dashboardsState,
                    orders: res.data
                }
            });
        }
    }

    const setStateTakeOrder = (state: DashboardsActionType) => {
        dispatch({
            type: SET_STATE_TAKE_ORDER,
            payload: {
                ...dashboardsState,
                takeOrder: state
            }
        });
    }

    useEffect(() => {
        // Gọi hàm get logo
        getLogo();
    }, [user])

    useEffect(() => {
        fetchDataOrder();
    }, [user, dashboardsState.takeOrder])

    const DashboardsContextData = {
        dashboardsState,
        fetchDataOrder,
        setStateTakeOrder
    }
    return <DashboardsContext.Provider value={DashboardsContextData}>
        {children}
    </DashboardsContext.Provider>
}

export default DashboardsProvider;