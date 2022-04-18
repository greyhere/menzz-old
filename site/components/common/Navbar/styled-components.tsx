import { styled } from 'styletron-react';
import type { StyletronComponent } from 'styletron-react';

const StyledAnchor: StyletronComponent<{
  $isActive: boolean;
}> = styled('a', ({ $isActive }) => ({
  fontWeight: 700,
  fontSize: '1rem',
  // TODO: move these color codes to global css
  color: $isActive ? '#FCD232' : 'rgba(255, 255, 255, 0.65);',
}));

// eslint-disable-next-line import/prefer-default-export
export { StyledAnchor };
