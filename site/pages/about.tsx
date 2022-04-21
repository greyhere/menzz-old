import Image from 'next/image';

import { Layout } from '@components/common';
import { Container, Text, Flex, Logo } from '@components/ui';
import { styled, useStyletron } from 'styletron-react';

const About = () => {
  const [css] = useStyletron();

  return (
    <>
      {/* eslint-disable-next-line @typescript-eslint/no-use-before-define */}
      <Box $as={GlassBackground}>
        {/* eslint-disable-next-line @typescript-eslint/no-use-before-define */}
        <GlowingShape
          $style={{
            top: '2rem',
            left: '-20rem',
            width: '25rem',
            height: '20rem',
            background: 'rgba(252, 210, 50)',
          }}
        />
        {/* eslint-disable-next-line @typescript-eslint/no-use-before-define */}
        <GlowingShape
          $style={{
            top: '8rem',
            right: '-25rem',
            width: '25rem',
            height: '30rem',
            background: 'rgba(247, 1, 168)',
            filter: 'blur(450px)',
          }}
        />
        <Container>
          <Text
            className={css({
              marginBottom: '1.5rem !important',
              color: '#FCD232DE',
              textTransform: 'uppercase',
            })}
            variant='sectionHeading'
          >
            Menzz: Your One-Stop Grooming Shop
          </Text>
          <p>
            We are Nepal&apos;s first digital marketplace for men. We know that
            it can be difficult to find authentic men&apos;s products in Nepal,
            which is why we created Menzz: a one-stop-shop where you can find
            all the products that you need in one trusted place. It is an
            exclusive men&apos;s store that caters to your style. We want you to
            know that we understand what it takes to look good—and feel
            confident! Now all of the men&apos;s grooming products you need are
            available online at reasonable prices and can be delivered to your
            door in a snap! We know you want to get on with your day and
            don&apos;t want to be bogged down by extra steps or complicated
            processes, so we make it easy for you to shop how and when you want.
            We have developed a powerful search tool so that you can find
            exactly what you&apos;re looking for, no matter how specific it
            is—and have it sent straight to your home! And if you&apos;re
            looking for something specific or want tips about how to use a
            certain product? Our experts are always on hand with advice! Whether
            you&apos;re getting ready for a big meeting or going out on the
            town, Menzz has got your back.
          </p>
          <Flex
            // eslint-disable-next-line @typescript-eslint/no-use-before-define
            $as={GlassBackground}
            $style={{
              marginTop: '8rem',
              paddingTop: '1.5rem',
              paddingBottom: '1.5rem',
              justifyContent: 'space-around',
              borderRadius: 'var(--border-radius)',
              // for GlassBackground component
              '--background': ' rgba(151, 151, 151, 0.18)',
              '--border-radius': '1.5rem',
            }}
          >
            <div>
              <Image
                width={100}
                height={100}
                src='/assets/menzz/verified_seller.png'
                alt='verified seller icon'
              />
              <Text>Verified Seller</Text>
            </div>
            <div>
              <Image
                width={100}
                height={100}
                src='/assets/menzz/on_time_delivery.png'
                alt='on time delivery icon'
              />
              <Text>On Time Delivery</Text>
            </div>
            <div>
              <Image
                width={100}
                height={100}
                src='/assets/menzz/excellent_customer_service.png'
                alt='excellent customer service icon'
              />
              <Text>Excellent Customer Service</Text>
            </div>
            <div>
              <Image
                width={100}
                height={100}
                src='/assets/menzz/secured_payment.png'
                alt='secured payment icon'
              />
              <Text>Secured Payment</Text>
            </div>
          </Flex>
        </Container>
      </Box>
      <Container $style={{ marginBottom: '4rem' }}>
        <Logo height='' width='100%' stroke='#262525' />
      </Container>
    </>
  );
};

//
// TODO: move these to seperate file
//
const Box = styled('div', {
  marginTop: '4rem',
  marginBottom: '4rem',
  paddingTop: '4rem',
  paddingBottom: '4rem',
  textAlign: 'center',
  borderRadius: 'var(--border-radius)',
  background: 'rgba(55, 214, 249, 0.08)',
  // for GlassBackground component
  '--background': ' rgba(151, 151, 151, 0.18)',
  '--border-radius': '2rem',
});

const GlassBackground = styled('div', {
  backdropFilter: 'blur(20px)',
  ':before': {
    content: '""',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    background: 'var(--background)',
    borderRadius: 'var(--border-radius)',
    opacity: 0.2,
    zIndex: -1,
  },
});

const GlowingShape = styled('div', {
  position: 'absolute',
  borderRadius: '50%',
  filter: 'blur(300px)',
  zIndex: -1,
});

About.Layout = Layout;

export default About;
