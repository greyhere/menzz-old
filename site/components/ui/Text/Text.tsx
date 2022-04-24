import { styled } from 'styletron-react';

import type { FC, HTMLAttributes } from 'react';
import type {
  StyletronBase,
  StyletronComponentInjectedProps,
} from 'styletron-react';

//
// TODO: remove pageHeading after refactoring
//
type Variant = 'body' | 'heading' | 'pageHeading' | 'sectionHeading';

interface TextProps
  extends StyletronComponentInjectedProps<{}>,
    HTMLAttributes<HTMLElement> {
  variant?: Variant;
  // TODO: remove html prop after refactoring
  html?: string;
}

const Text: FC<TextProps> = ({ variant, children, html, ...rest }) => {
  const componentsMap: {
    [P in Variant]: StyletronBase;
  } = {
    body: 'p',
    heading: 'h1',
    pageHeading: 'h1',
    sectionHeading: 'h2',
  };

  const htmlContentProps = html
    ? {
        dangerouslySetInnerHTML: { __html: html },
      }
    : {};

  return (
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    <StyledText $as={componentsMap![variant!]} {...htmlContentProps} {...rest}>
      {children}
    </StyledText>
  );
};

const StyledText = styled('p', {});

Text.defaultProps = {
  variant: 'body',
  html: undefined,
};

export default Text;
