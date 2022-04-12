import { CANCELLED, COMPLETED, IN_PROGRESS, IOder, READY, SEND_REQUIRE } from "../datatypes";
import { DashboardsActionType } from "./types";

const { SET_LOGO, SET_STATE_TAKE_ORDER, TAKE_ALL, TAKE_ORDER_NEW, TAKE_FROM_SIPPER, TAKE_PAIL, TAKE_CANCELING, TAKE_CANCELLED } = DashboardsActionType;

export interface IDashboardsState {
    logo: string;
    takeOrder: DashboardsActionType;
    orders: IOder[];
}

interface IAuthAction {
    type: DashboardsActionType;
    payload: IDashboardsState;
}

export const dashboardsReducer = (state: IDashboardsState, action: IAuthAction) => {
    const {type, payload: {logo, orders, takeOrder} } = action;
    switch (type) {
        case SET_LOGO:
            return {
                ...state,
                logo,
            }

        case SET_STATE_TAKE_ORDER:
            return {
                ...state,
                takeOrder,
            }

        case TAKE_ALL:
            return {
                ...state,
                orders,
            }

        case TAKE_ORDER_NEW: {
            const newOrder = orders.filter(order => order.status === READY)
            
            return {
                ...state,
                orders: newOrder,
            }
        }

        case TAKE_FROM_SIPPER: {
            const newOrder = orders.filter(order => order.status === IN_PROGRESS)
            
            return {
                ...state,
                orders: newOrder,
            }
        }

        case TAKE_PAIL: {
            const newOrder = orders.filter(order => order.status === COMPLETED)
            
            return {
                ...state,
                orders: newOrder,
            }
        }

        case TAKE_CANCELING: {
            const newOrder = orders.filter(order => order.status === SEND_REQUIRE)
            
            return {
                ...state,
                orders: newOrder,
            }
        }

        case TAKE_CANCELLED: {
            const newOrder = orders.filter(order => order.status === CANCELLED)
            
            return {
                ...state,
                orders: newOrder,
            }
        }
           
        default:
            throw new Error('Invalid action!');
    }
}