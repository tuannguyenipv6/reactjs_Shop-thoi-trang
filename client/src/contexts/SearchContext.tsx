import { createContext, Dispatch, ReactNode, SetStateAction, useState } from "react";
import { IProduct } from "../datatypes";


interface ISearchState {
    searchState: string;
    searchProducts: IProduct[];
}

interface ISearchContext {
    searchState: ISearchState;
    setSearchState: Dispatch<SetStateAction<ISearchState>>;
}

interface ISearchContextProvider {
    children: ReactNode;
}


const searchDefault: ISearchState = {
    searchState: '',
    searchProducts: []
};

export const SearchContext = createContext<ISearchContext>({
    searchState: searchDefault,
    setSearchState: () => {}
})

const SearchContextProvider = ({children}: ISearchContextProvider) => {
    // state
    const [searchState, setSearchState] = useState<ISearchState>(searchDefault); 

    const SearchContextData = {
        searchState,
        setSearchState
    }

    return <SearchContext.Provider value={SearchContextData}>
        {children}
    </SearchContext.Provider>
}

export default SearchContextProvider;