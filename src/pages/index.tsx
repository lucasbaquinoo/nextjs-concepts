import SEO from "@/components/SEO";
import { client } from "@/lib/prismic";
import Link from 'next/link';
import { GetServerSideProps } from "next";
import { Title } from "../styles/pages/Home";
import Prismic from 'prismic-javascript';
import { Document } from 'prismic-javascript/types/documents';
import PrismicDOM from 'prismic-dom';

interface HomeProps {
  recommendedProducts: Document[];
}

export default function Home({ recommendedProducts }: HomeProps) {
  // async function handleSum() {
  //   const math = (await import("../lib/math")).default;
  //   // const { sum } = (await import('../lib/math')).default;

  //   alert(math.sum(5, 3));
  // }

  return (
    <div>
      <SEO 
        title="DevCommerce, your best e-commerce"
        image="boost.png"  
        shouldExcludeTitleSuffix 
      />
      <section>
        <Title>Products</Title>

        <ul>
          {recommendedProducts.map((recommendedProduct) => {
            return (
              <li key={recommendedProduct.id}>
                <Link href={`/catalog/products/${recommendedProduct.uid}`}>
                  <a>
                    {PrismicDOM.RichText.asText(recommendedProduct.data.title)}
                  </a>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      {/* <button onClick={handleSum}>Sum!</button> */}
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  const recommendedProducts = await client().query([
    Prismic.Predicates.at('document.type', 'product')
  ])

  return {
    props: {
      recommendedProducts: recommendedProducts.results,
    },
  };
};
