import { memo, useEffect } from 'react';
import { useRouter } from 'next/router';

import type { FC } from 'react';
import type { StyletronComponentInjectedProps } from 'styletron-react';

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
        placeholder='Search for your item...'
        defaultValue={router.query.q}
        onKeyUp={handleKeyUp}
      />
      <IconContainer>
        <svg width='20' height='20' viewBox='0 0 20 20' fill='none'>
          <path
            d='M19.7309 18.3139L16.0209 14.6333C17.461 12.8374 18.1584 10.5579 17.9697 8.26356C17.781 5.96919 16.7205 3.83432 15.0064 2.29792C13.2922 0.761532 11.0547 -0.0595993 8.7538 0.00337152C6.45292 0.0663423 4.26361 1.00863 2.63604 2.63648C1.00846 4.26433 0.0663312 6.454 0.00337095 8.75527C-0.0595893 11.0565 0.761405 13.2945 2.29754 15.0089C3.83367 16.7233 5.96819 17.784 8.26218 17.9727C10.5562 18.1614 12.8353 17.4639 14.6309 16.0235L18.3109 19.7042C18.4038 19.7979 18.5144 19.8723 18.6363 19.9231C18.7581 19.9739 18.8888 20 19.0209 20C19.1529 20 19.2836 19.9739 19.4054 19.9231C19.5273 19.8723 19.6379 19.7979 19.7309 19.7042C19.9111 19.5177 20.0118 19.2684 20.0118 19.009C20.0118 18.7497 19.9111 18.5004 19.7309 18.3139ZM9.02088 16.0235C7.63641 16.0235 6.28304 15.6129 5.1319 14.8436C3.98075 14.0743 3.08355 12.9809 2.55374 11.7016C2.02393 10.4223 1.8853 9.01462 2.1554 7.65653C2.42549 6.29844 3.09218 5.05095 4.07114 4.07183C5.05011 3.0927 6.29739 2.4259 7.65525 2.15576C9.01311 1.88562 10.4206 2.02426 11.6997 2.55417C12.9787 3.08407 14.072 3.98142 14.8412 5.13276C15.6103 6.28409 16.0209 7.63769 16.0209 9.02239C16.0209 10.8792 15.2834 12.66 13.9706 13.973C12.6579 15.2859 10.8774 16.0235 9.02088 16.0235Z'
            fill='url(#paint0_linear_2_1079)'
          />
          <defs>
            <linearGradient
              id='paint0_linear_2_1079'
              x1='0'
              y1='0'
              x2='30.8329'
              y2='18.1321'
              gradientUnits='userSpaceOnUse'
            >
              <stop stopColor='#43E9E9' />
              <stop offset='0.970975' stopColor='white' stopOpacity='0.22' />
            </linearGradient>
          </defs>
        </svg>
      </IconContainer>
    </StyledSearch>
  );
};

Searchbar.defaultProps = {
  id: 'search',
};

export default memo(Searchbar);
