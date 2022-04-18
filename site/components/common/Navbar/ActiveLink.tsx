import type { FC } from 'react';
import type { LinkProps as NextLinkProps } from 'next/link';
import type { StyletronComponentInjectedProps } from 'styletron-react';

import Link from 'next/link';
import { useRouter } from 'next/router';

import { StyledAnchor } from './styled-components';

type ActiveLinkProps = NextLinkProps & StyletronComponentInjectedProps<{}>;

const ActiveLink: FC<ActiveLinkProps> = (props) => {
  const {
    // styletron component props
    $as,
    $style,
    // next link props
    href,
    as,
    passHref, // filter out passHref as we are going to pass it by default and don't want to override it
    children,
    ...rest
  } = props;
  const { asPath } = useRouter();

  // pages/index.js will be matched via href
  // pages/about.js will be matched via href
  // pages/[slug].js will be matched via as
  const isActive = asPath === href || asPath === as;

  return (
    <Link href={href} as={as} passHref {...rest}>
      <StyledAnchor $as={$as} $style={$style} $isActive={isActive}>{children}</StyledAnchor>
    </Link>
  );
};

// eslint-disable-next-line import/prefer-default-export
export { ActiveLink };
