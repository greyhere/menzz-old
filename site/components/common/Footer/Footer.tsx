import Link from 'next/link';

import { Logo, Container, Flex } from '@components/ui';
import { I18nWidget } from '@components/common';

import type { FC } from 'react';
import type { StyletronComponentInjectedProps } from 'styletron-react';
import type { Page } from '@commerce/types/page';

import { StyledFooter, StyledAnchor, IconLink } from './styled-components';
import { links, socialLinks } from './constants';

interface Props extends StyletronComponentInjectedProps<{}> {
  pages?: Page[];
}

const Footer: FC<Props> = ({ pages: sitePages, ...rest }) => (
  <StyledFooter {...rest}>
    <Container>
      <Flex $style={{ paddingTop: '2rem' }}>
        <Flex $style={{ flexDirection: 'column', gap: '.5rem' }}>
          <Link href='/'>
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a>
              <Logo height='50' width='' />
            </a>
          </Link>
          <span>Groom like a Gentleman</span>
        </Flex>
        <Flex
          $style={{
            height: '8rem',
            flexFlow: 'column wrap',
          }}
        >
          {[...links, ...(sitePages as Page[])].map((page) => (
            // TODO: check if it's external link
            <Link key={page.url} href={page.url!} passHref>
              <StyledAnchor>{page.name}</StyledAnchor>
            </Link>
          ))}
        </Flex>
        <Flex
          $style={{
            gap: '1rem',
            marginLeft: 'auto',
            flexDirection: 'column',
            alignItems: 'flex-end',
          }}
        >
          <I18nWidget />
          <Flex $style={{ gap: '1rem' }}>
            {socialLinks.map((social) => (
              <IconLink
                key={social.url}
                href={social.url}
                aria-label={social.name}
                rel='noopener noreferrer'
                target='_blank'
              >
                {social.icon}
              </IconLink>
            ))}
          </Flex>
        </Flex>
      </Flex>
      <Flex
        $style={{
          paddingTop: '1.5rem',
          paddingBottom: '2.5rem',
          // text-sm
          fontSize: '0.875rem',
          lineHeight: '1.25rem',
          justifyContent: 'center',
          // TODO: add top border
        }}
      >
        &copy; {new Date().getFullYear()} Menzz. All rights reserved.
      </Flex>
    </Container>
  </StyledFooter>
);

Footer.defaultProps = {
  pages: []
}

export default Footer;
