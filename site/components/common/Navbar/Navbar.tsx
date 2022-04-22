/* eslint-disable jsx-a11y/anchor-is-valid */
import type { FC } from 'react';
import Link from 'next/link';

import { useStyletron } from 'styletron-react';

import { Logo, Flex, Container } from '@components/ui';
import { Searchbar /* , UserNav */ } from '@components/common';
import { Login, Heart } from '@components/icons';

import { StyledNavbar, IconText } from './styled-components';
import { ActiveLink } from './ActiveLink';

interface LinkT {
  href: string;
  label: string;
}

interface NavbarProps {
  links?: LinkT[];
}

const Navbar: FC<NavbarProps> = ({ links }) => {
  const [css] = useStyletron();

  return (
    <StyledNavbar>
      <Container>
        <Flex
          $style={{
            paddingTop: '1.5rem',
            alignItems: 'center',
            gap: '2rem',
          }}
        >
          <Link href='/'>
            <a aria-label='Logo'>
              <Logo height='50' width='' />
            </a>
          </Link>
          <IconText $style={{ marginLeft: 'auto' }}>
            <Login className={css({ transform: 'scale(.8)' })} />
            <Link href='/login'>
              <a
                className={css({
                  fontWeight: 400,
                  fontSize: '1rem',
                  color: 'rgba(255, 255, 255, 0.65);',
                })}
              >
                Login
              </a>
            </Link>
          </IconText>
          <IconText>
            <Heart className={css({ transform: 'scale(.8)' })} />
            <Link href='/wishlist'>
              <a
                className={css({
                  fontWeight: 400,
                  fontSize: '1rem',
                  color: 'rgba(255, 255, 255, 0.65);',
                })}
              >
                Wishlist
              </a>
            </Link>
          </IconText>
        </Flex>
        <Flex $style={{ alignItems: 'center' }}>
          <Flex $as='nav' $style={{ gap: '2.5rem' }}>
            {links?.map((l) => (
              <ActiveLink
                href={l.href}
                key={l.href}
                $style={{
                  paddingTop: '1.5rem',
                  paddingBottom: '1.5rem',
                }}
              >
                {l.label}
              </ActiveLink>
            ))}
          </Flex>
          {process.env.COMMERCE_SEARCH_ENABLED && (
            <Searchbar $style={{ marginLeft: 'auto' }} />
          )}
        </Flex>
      </Container>
    </StyledNavbar>
  );
};

Navbar.defaultProps = {
  links: [],
};

export default Navbar;
