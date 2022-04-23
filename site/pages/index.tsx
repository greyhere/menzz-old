import commerce from '@lib/api/commerce';
import { Layout } from '@components/common';
import { ProductCard } from '@components/product';
import {
  Grid,
  Marquee,
  Hero,
  Flex,
  Button,
  Container,
  Text,
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
  // TODO: add floor fade in image itself using photo editor and remove this gradient
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
        alt=''
      />
      <Flex
        $as={Container}
        $style={{
          minHeight: '40rem',
          justifyContent: 'space-between',
        }}
      >
        <div
          className={css({
            marginTop: 'auto',
            marginBottom: 'auto',
            zIndex: 1,
          })}
        >
          <Text>Best Product for You</Text>
          <Text variant='heading'>
            New Look Fashion
            <br />
            on 2022
          </Text>
          <Button className={css({ marginTop: '3rem' })}>Shop Now</Button>
        </div>
        <div
          className={css({
            alignSelf: 'baseline',
            marginTop: 'auto',
            marginBottom: 'auto',
            position: 'relative',
          })}
        >
          <Image
            src='/assets/menzz/banner_image.png'
            alt='picture of a man'
            height={467}
            width={266}
          />
          <GradientOverlay />
        </div>
      </Flex>
      <Text variant='sectionHeading'>Featured</Text>
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
