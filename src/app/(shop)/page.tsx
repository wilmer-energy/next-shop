export const revalidate = 60; // 60 segundos


import { redirect } from 'next/navigation';

import { getPaginatedProductsWithImages } from '@/actions';
import { Pagination, ProductGrid, Title } from '@/components';



interface Props {
  searchParams: {
    page?: string;
  }
}


export default async function Home({ searchParams }: Props) {

  const page = searchParams.page ? parseInt(searchParams.page) : 1;

  const { products, currentPage, totalPages } = await getPaginatedProductsWithImages({ page });

  console.log(products);
  if (products.length === 0) {
    redirect('/');
    /*<Title
      title="Store"
      subtitle="All products"
      className="mb-2"
    />*/
  }


  return (
    <>
      <Title
        title="Store"
        subtitle="All products"
        className="mb-2"
      />

      <ProductGrid
        products={products}
      />


      <Pagination totalPages={totalPages} />

    </>
  );
}
