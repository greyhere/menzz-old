import { styled } from 'styletron-react';
import type { StyletronComponent } from 'styletron-react';

interface ContainerProps {
  $clean?: boolean;
}

const Container: StyletronComponent<ContainerProps> = styled(
  'div',
  ({ $clean }) => ({
    ...(!$clean && {
      marginLeft: 'auto',
      marginRight: 'auto',
      paddingLeft: '1.5rem',
      paddingRight: '1.5rem',
      maxWidth: '80rem',
      width: '100%',
    }),
  })
);

export default Container;
