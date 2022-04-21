/* eslint-disable jsx-a11y/anchor-is-valid */
import type { FC } from 'react';
import Link from 'next/link';

import { useStyletron } from 'styletron-react';

import { Logo, Flex } from '@components/ui';
import { Searchbar /* , UserNav */ } from '@components/common';
import { Mail, Phone } from '@components/icons';

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
      <Flex
        $style={{
          paddingTop: '1.5rem',
          alignItems: 'center',
        }}
      >
        <Link href='/'>
          <a aria-label='Logo'>
            <Logo height='50' width='' />
          </a>
        </Link>
        <IconText
          $style={{
            marginLeft: '1.5rem',
            marginRight: '1.5rem',
          }}
        >
          <Mail className={css({ transform: 'scale(.8)' })} />
          <a href='mailto:contact@menzz.com'>contact@menzz.com</a>
        </IconText>
        <IconText>
          <Phone className={css({ transform: 'scale(.8)' })} />
          9800000000
        </IconText>
        <Link href='/login'>
          <a
            className={css({
              marginLeft: 'auto',
              marginRight: '1.5rem',
              fontWeight: 400,
              fontSize: '1rem',
              color: 'rgba(255, 255, 255, 0.65);',
            })}
          >
            Login
          </a>
        </Link>
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
      </Flex>
      <Flex $style={{ alignItems: 'center' }}>
        <Flex $as='nav'>
          {links?.map((l) => (
            <ActiveLink
              href={l.href}
              key={l.href}
              $style={{
                marginRight: '2.5rem',
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
    </StyledNavbar>
  );
};

Navbar.defaultProps = {
  links: [],
};

export default Navbar;
