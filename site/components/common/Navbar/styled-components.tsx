import { styled } from 'styletron-react';
import type { StyletronComponent } from 'styletron-react';

const StyledNavbar = styled('div', {
  position: 'sticky',
  top: 0,
  paddingLeft: '1.5rem',
  paddingRight: '1.5rem',
  backdropFilter: 'blur(20px)',
  zIndex: 2,
  ':before': {
    content: '""',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    background: '#171717',
    opacity: 0.8,
    zIndex: -1,
  },
});

const IconText = styled('span', {
  display: 'flex',
  gap: '.5rem',
  alignItems: 'center',
  fontWeight: 400,
  fontSize: '1rem',
  color: 'rgba(255, 255, 255, 0.65);',
});

const StyledAnchor: StyletronComponent<{
  $isActive: boolean;
}> = styled('a', ({ $isActive }) => ({
  fontWeight: 700,
  fontSize: '1rem',
  // TODO: move these color codes to global css
  color: $isActive ? '#FCD232' : 'rgba(255, 255, 255, 0.65);',
}));

// eslint-disable-next-line import/prefer-default-export
export { StyledNavbar, IconText, StyledAnchor };
