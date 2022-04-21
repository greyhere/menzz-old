import { styled } from 'styletron-react';

const StyledFooter = styled('footer', {
  color: '#B0ACAC',
  background: '#262525',
  // TODO: add top border
});

const StyledAnchor = styled('a', {
  marginLeft: '4rem',
  paddingBottom: '0.5rem',
});

// TODO: add hover styles
const IconLink = styled('a', {});

export { StyledFooter, StyledAnchor, IconLink };
