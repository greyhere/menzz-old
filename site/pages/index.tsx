import commerce from '@lib/api/commerce';
import { Layout } from '@components/common';
import { ProductCard } from '@components/product';
import {
  Grid,
  Marquee,
  Hero,
  Flex,
  Button,
  Text,
  Container,
} from '@components/ui';
// import HomeAllProductsGrid from '@components/common/HomeAllProductsGrid'
import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import { styled, useStyletron } from 'styletron-react';
import Image from 'next/image';

export async function getStaticProps({
  preview,
  locale,
  locales,
}: GetStaticPropsContext) {
  const config = { locale, locales };
  const productsPromise = commerce.getAllProducts({
    variables: { first: 6 },
    config,
    preview,
    // Saleor provider only
    ...({ featured: true } as any),
  });
  // const pagesPromise = commerce.getAllPages({ config, preview });
  const siteInfoPromise = commerce.getSiteInfo({ config, preview });
  const { products } = await productsPromise;
  // const { pages } = await pagesPromise;
  const { categories, brands } = await siteInfoPromise;

  return {
    props: {
      products,
      categories,
      brands,
      // pages,
    },
    revalidate: 60,
  };
}

const GradientOverlay = styled('div', {
  position: 'absolute',
  bottom: 0,
  left: 0,
  height: '100%',
  width: '100%',
  background:
    'linear-gradient(180deg, rgba(0, 0, 0, 0) 48.44%, var(--primary) 92.19%)',
});

const Home = ({ products }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const [css] = useStyletron();

  return (
    <>
      <Image
        src='/assets/menzz/ellipse_yellow.png'
        layout='fill'
        objectFit='cover'
      />
      <Flex
        $as={Container}
        $style={{
          minHeight: '40rem',
          marginTop: '7.5rem',
          marginBottom: '7.5rem',
          justifyContent: 'space-between',
        }}
      >
        <div
          className={css({
            marginTop: 'auto',
            marginBottom: 'auto',
          })}
        >
          <p
            className={css({
              // to compensate for the margin-top of the container
              marginTop: '-7.5rem',
              fontSize: '1.25rem',
            })}
          >
            Best Product for You
          </p>
          {/* TODO: Replace with Text component */}
          <h1
            className={css({
              fontSize: '4rem',
              fontWeight: 700,
              lineHeight: '5.27rem',
            })}
          >
            New Look Fashion
            <br />
            on 2022
          </h1>
          <Button className={css({ marginTop: '3rem' })}>Shop Now</Button>
        </div>
        <div className={css({ position: 'relative' })}>
          <Image
            src='/assets/menzz/banner_image.png'
            alt='picture of a man'
            height={677}
            width={385}
          />
          <GradientOverlay />
        </div>
      </Flex>
      <Grid variant='filled'>
        {products.slice(0, 3).map((product: any, i: number) => (
          <ProductCard
            key={product.id}
            product={product}
            imgProps={{
              width: i === 0 ? 1080 : 540,
              height: i === 0 ? 1080 : 540,
              priority: true,
            }}
          />
        ))}
      </Grid>
      <Marquee variant='secondary'>
        {products.slice(0, 3).map((product: any) => (
          <ProductCard key={product.id} product={product} variant='slim' />
        ))}
      </Marquee>
      <Hero
        headline=' Dessert dragée halvah croissant.'
        description='Cupcake ipsum dolor sit amet lemon drops pastry cotton candy. Sweet carrot cake macaroon bonbon croissant fruitcake jujubes macaroon oat cake. Soufflé bonbon caramels jelly beans. Tiramisu sweet roll cheesecake pie carrot cake. '
      />
      <Grid layout='B' variant='filled'>
        {products.slice(0, 3).map((product: any, i: number) => (
          <ProductCard
            key={product.id}
            product={product}
            imgProps={{
              width: i === 0 ? 1080 : 540,
              height: i === 0 ? 1080 : 540,
            }}
          />
        ))}
      </Grid>
      <Marquee>
        {products.slice(3).map((product: any) => (
          <ProductCard key={product.id} product={product} variant='slim' />
        ))}
      </Marquee>
      {/* <HomeAllProductsGrid
        newestProducts={products}
        categories={categories}
        brands={brands}
      /> */}
    </>
  );
};

Home.Layout = Layout;

export default Home;
