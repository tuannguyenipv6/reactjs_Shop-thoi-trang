import Head from 'next/head';
// import { withAuth } from '../../HOC';
function Cart() {
  return (<>
    <Head>
      <title>NQT Shop</title>
      <meta name="404" content="Trang này không tồn tại!" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', height: '80vh'}}>
        <h1 style={{margin: 8}}>Trang này không tồn tại</h1>
        <p style={{margin: 0}}>Ô nâu! có lẻ bạn đã tìm sai địa chỉ!</p>
    </div>
  </>)
}

// export default withAuth(Cart);
export default Cart;