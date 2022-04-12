import { createContext, Dispatch, ReactNode, SetStateAction, useState } from "react";
import { IProductCart } from "../datatypes";

interface IPayContext {
    payProducts: IProductCart[];
    setPayProducts: Dispatch<SetStateAction<IProductCart[]>>
}

export const PayContext = createContext<IPayContext>({
    payProducts: [],
    setPayProducts: () => {}
});

interface IPayContextProvider {
    children: ReactNode;
}

const PayContextProvider = ({children}: IPayContextProvider) => {
    const [payProducts, setPayProducts] = useState<IProductCart[]>([]);

    const PayContextData = {
        payProducts,
        setPayProducts
    }

    return <PayContext.Provider value={PayContextData}>
        {children}
    </PayContext.Provider>
}

export default PayContextProvider;