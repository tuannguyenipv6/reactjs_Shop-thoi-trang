import { createContext, ReactNode, useReducer } from "react";
import { IModalState, modalReducer } from "../reducers";
import { ModalActionType } from "../reducers/types";

const {SET_MODAL} = ModalActionType

interface IMoadalContext {
    modalState: IModalState;
    hidenModal: () => void;
    showModal: (modal: IModalState) => void;
}

const modalDefault: IModalState = {
    showModal: false,
    title: '',
    component: null
}
export const MoadalContext = createContext<IMoadalContext>({
    modalState: modalDefault,
    hidenModal: () => {},
    showModal: () => {},
});

interface IModalContextProvider {
    children: ReactNode;
}

const ModalContextProvider = ({children}: IModalContextProvider) => {
    // state
    const [modalState, dispatch] = useReducer(modalReducer, modalDefault);

    // hiden modal
    const hidenModal = () => {
        dispatch({
            type: SET_MODAL,
            payload: {
                title: '',
                showModal: false,
                component: null,
            }
        })
    }

    // show modal
    const showModal = (modal: IModalState) => {
        dispatch({
            type: SET_MODAL,
            payload: {
                title: modal.title,
                showModal: modal.showModal,
                component: modal.component,
            }
        })
    }

    const ModalContextData = {
        modalState,
        hidenModal,
        showModal
    }
    return <MoadalContext.Provider value={ModalContextData}>
        {children}
    </MoadalContext.Provider>
}

export default ModalContextProvider;