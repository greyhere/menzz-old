/* eslint-disable jsx-a11y/anchor-is-valid */
import type { FC } from 'react';
import Link from 'next/link';

import { styled, useStyletron } from 'styletron-react';

import { Logo, Flex } from '@components/ui';
import { Searchbar /* , UserNav */ } from '@components/common';
import { Mail, Phone } from '@components/icons';

import { ActiveLink } from './ActiveLink';

interface LinkT {
  href: string;
  label: string;
}

interface NavbarProps {
  links?: LinkT[];
}

const Root = styled('div', {
  position: 'sticky',
  top: 0,
  background: '#262525',
  paddingLeft: '1.5rem',
  paddingRight: '1.5rem',
  zIndex: 2,
});

const IconListItem = styled('span', {
  display: 'flex',
  gap: '.5rem',
  alignItems: 'center',
  fontWeight: 700,
  fontSize: '1rem',
  color: 'rgba(255, 255, 255, 0.65);',
});

const Navbar: FC<NavbarProps> = ({ links }) => {
  const [css] = useStyletron();

  return (
    <Root>
      <Flex
        $style={{
          paddingTop: '1.5rem',
          paddingBottom: '.5rem',
          alignItems: 'center',
        }}
      >
        <Link href='/'>
          <a aria-label='Logo'>
            <Logo />
          </a>
        </Link>
        <IconListItem
          $style={{
            marginLeft: '1.5rem',
            marginRight: '1.5rem',
          }}
        >
          <Mail className={css({ transform: 'scale(.8)' })} />
          <a href='mailto:contact@menzz.com'>contact@menzz.com</a>
        </IconListItem>
        <IconListItem>
          <Phone className={css({ transform: 'scale(.8)' })} />
          9800000000
        </IconListItem>
        <Link href='/login'>
          <a
            className={css({
              marginLeft: 'auto',
              marginRight: '1.5rem',
              fontWeight: 700,
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
              fontWeight: 700,
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
                marginRight: '1.5rem',
                paddingTop: '1rem',
                paddingBottom: '1rem',
              }}
            >
              {l.label}
            </ActiveLink>
          ))}
        </Flex>
        {process.env.COMMERCE_SEARCH_ENABLED && (
          <Searchbar className={css({ marginLeft: 'auto' })} />
        )}
      </Flex>
    </Root>
  );
};

Navbar.defaultProps = {
  links: [],
};

export default Navbar;
