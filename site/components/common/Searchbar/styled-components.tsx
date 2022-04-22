import { styled } from 'styletron-react';

const StyledSearch = styled('div', {
  position: 'relative',
  border: '.1rem solid #CBCCCB',
  borderRadius: '.625rem',
});

const Input = styled('input', {
  background: 'none',
  paddingTop: '0.625rem',
  paddingBottom: '0.625rem',
  paddingLeft: '0.75rem',
  paddingRight: '8rem',
  ':focus': {
    outline: 'none',
    // TODO: add box shadow
  },
});

// TODO: move this to a ui component?
const IconContainer = styled('div', {
  position: 'absolute',
  top: 0,
  bottom: 0,
  right: 0,
  paddingRight: '0.75rem',
  display: 'flex',
  alignItems: 'center',
  pointerEvents: 'none',
});

export { StyledSearch, Input, IconContainer };
