import { useContext, useEffect, useState } from "react";
import ShowProducts from "../../components/ShowProducts";
import { SearchContext } from "../../contexts/SearchContext";
import { IProduct } from "../../datatypes";
import { searchProduct } from "../../lib/product";

function Search() {
    const [products, setProducts] = useState<IProduct[]>([]);
    const {searchState} = useContext(SearchContext);

    useEffect(() => {
        const fetchData = async () => {
        const response = await searchProduct(searchState.searchState);
        if(response.success) {
          setProducts(response.data);
        }
      }

      fetchData();
    }, [searchState])

    return <ShowProducts products={products} />
}

export default Search;