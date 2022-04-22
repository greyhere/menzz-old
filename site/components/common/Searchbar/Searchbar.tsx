import { memo, useEffect } from 'react';
import { useRouter } from 'next/router';

import type { FC } from 'react';
import type { StyletronComponentInjectedProps } from 'styletron-react';

import { Search } from '@components/icons';

import { StyledSearch, IconContainer, Input } from './styled-components';

type Props = StyletronComponentInjectedProps<{}> & {
  id?: string;
};

const Searchbar: FC<Props> = ({ id, ...rest }) => {
  const router = useRouter();

  useEffect(() => {
    router.prefetch('/search');
  }, [router]);

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.key === 'Enter') {
      const q = e.currentTarget.value;
      router.push(
        {
          pathname: `/search`,
          query: q ? { q } : {},
        },
        undefined,
        { shallow: true }
      );
    }
  };

  return (
    <StyledSearch {...rest}>
      <label className='hidden' htmlFor={id}>
        Search
      </label>
      <Input
        id={id}
        placeholder='Search for products...'
        defaultValue={router.query.q}
        onKeyUp={handleKeyUp}
      />
      <IconContainer>
        <Search />
      </IconContainer>
    </StyledSearch>
  );
};

Searchbar.defaultProps = {
  id: 'search',
};

export default memo(Searchbar);
