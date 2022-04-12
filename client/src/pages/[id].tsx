import Comment from '../components/Comment';
import DetailsProduct from '../components/DetailsProduct';
import { IComment, IProduct } from '../datatypes';
import { getCommentByProductId } from '../lib';
import { getKeyProducts, getProducById } from '../lib/product';


interface IProductDetail {
  product: IProduct
  comments: IComment[]
}

function ProductDetail({product, comments}: IProductDetail) {
  return (<>
    <DetailsProduct product={product} />
    
    <Comment comments={comments} />
  </>)
}

// Đây là tên mặt định ko đổi đc
export const getStaticPaths = async () => {
    const products = await getKeyProducts();
    const paths = products.data.map((value: IProduct) => ({
      params: {
        id: `${value.name.replace(/\/?/g, '').replace(/\?/g, '').replace(/ /g, '-')}.${value._id}`,
      },
    }));
    return {
      paths: paths,
      fallback: false, // bất kỳ path nào k return bởi getStaticPath sẽ tự động qua trang 404
    }
};

export const getStaticProps = async ({ params }: any) => {
  const arrayParams = params.id.split(".");
  const response = await getProducById(arrayParams[arrayParams.length - 1]);
  const resComment = await getCommentByProductId(arrayParams[arrayParams.length - 1])

  return {
    props: {
      product: response.data,
      comments: resComment.comments
    },
    revalidate: 1,
  };
  }

export default ProductDetail;