/* eslint-disable jsx-a11y/anchor-is-valid */
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import type { FC } from 'react';

import { useStyletron } from 'styletron-react';

import { Container, Flex, Logo } from '@components/ui';
import { Any } from '@react-spring/types';

const verifyMutation = `
mutation VerifyCustomerAccount($token: String!) {
  verifyCustomerAccount(token: $token) {
    __typename
    ...on CurrentUser {
      identifier
    }
    ...on VerificationTokenInvalidError {
      errorCode
      message
    }
    ...on VerificationTokenExpiredError {
      errorCode
      message
    }
    ...on MissingPasswordError {
      errorCode
      message
    }
    ...on PasswordValidationError {
      errorCode
      message
      validationErrorMessage
    }
    ...on PasswordAlreadySetError {
      errorCode
      message
    }
    ...on NativeAuthStrategyError {
      errorCode
      message
    }
  }
}
`;

const Verify: FC = () => {
  const router = useRouter();
  const [css] = useStyletron();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const api = process.env.NEXT_PUBLIC_VENDURE_SHOP_API_URL;

  useEffect(() => {
    if (router.isReady) {
      const { token } = router.query;
      if (token) {
        fetch(api as any, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            query: verifyMutation,
            variables: { token },
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            // eslint-disable-next-line no-underscore-dangle
            if (data.data.verifyCustomerAccount.__typename !== 'CurrentUser') {
              setError(true);
            }
            setLoading(false);
          });
      }
    }
  }, [router.isReady, router.query]);

  return (
    <Flex
      $as={Container}
      $style={{
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      <Link href='/'>
        <a>
          <Logo height='40' width='' className={css({ marginTop: '1rem' })} />
        </a>
      </Link>
      <Flex
        $as={Container}
        $style={{
          flex: 1,
          gap: '1rem',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {loading && <p>Verifying...</p>}
        {error && (
          <>
            <p>Invalid Token</p>
            <Link href='/'>
              <a>Go Home &rarr;</a>
            </Link>
          </>
        )}
        {!loading && !error && (
          <>
            <p>Account Verified!</p>
            <Link href='/'>
              <a>Go Home &rarr;</a>
            </Link>
          </>
        )}
      </Flex>
    </Flex>
  );
};

export default Verify;
