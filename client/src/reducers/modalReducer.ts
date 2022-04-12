import { ModalActionType } from "./types";

// type
const { SET_MODAL } = ModalActionType;

export interface IModalState {
    showModal: boolean;
    title: JSX.Element | string;
    component: JSX.Element | null,
}

interface IModalAction {
    type: ModalActionType;
    payload: IModalState;
}

export const modalReducer = (state: IModalState, action: IModalAction) => {
    const {type, payload: { title, showModal, component } } = action;
    switch (type) {
        case SET_MODAL:
            return {
                ...state,
                title,
                showModal,
                component,
            }
        default:
            throw new Error('Invalid action!');
    }
}