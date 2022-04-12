import { IProduct } from "../../datatypes";
import ItemProduct from "../ItemProduct";

interface IShowProductsProps {
    products: IProduct[]
}

function ShowProducts({products}: IShowProductsProps) {

    if(products.length === 0) {
      return <h3 style={{display: 'flex', justifyContent: 'center', width: '100%'}}>
        Không có sản phẩm nào!
      </h3>
    }

    return(<div className={`row`}>
    {
      products.map(product => (
        <ItemProduct key={product._id} product={product} />
      ))
    }
  </div>)
}
export default ShowProducts;