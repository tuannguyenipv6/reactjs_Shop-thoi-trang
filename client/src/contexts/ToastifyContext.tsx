import { createContext, ReactNode } from "react";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface IToastifyContext {
    showToast: (message: string, type: 'error' | 'info' | 'success' | 'warning') => void
}
interface IToastifyContextProvider {
    children: ReactNode;
}

toast.configure()
export const ToastifyContext = createContext<IToastifyContext>({
    showToast: () => {}
});

const ToastifyContextProvider = ({children}: IToastifyContextProvider) => {

    const handleShowSuccess = (message: string, type: 'error' | 'info' | 'success' | 'warning') => {
        toast[type](message);
    }

    const toastifyContextData = {
        showToast: handleShowSuccess
    }
    return <ToastifyContext.Provider value={toastifyContextData}>
        {children}
    </ToastifyContext.Provider>
}

export default ToastifyContextProvider;