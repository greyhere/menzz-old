/* eslint-disable jsx-a11y/anchor-is-valid */
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState, useCallback } from 'react';

import type { FC } from 'react';

import { Info } from '@components/icons';

import { Container, Logo, Button, Input, Flex } from '@components/ui';

const resetPasswordMutation = `
mutation ResetPassword($token: String!, $password: String!) {
  resetPassword(token: $token, password: $password) {
    __typename
    ...on CurrentUser {
      identifier
    }
    ...on PasswordResetTokenInvalidError {
      errorCode
      message
    }
    ...on PasswordResetTokenExpiredError {
      errorCode
      message
    }
    ...on PasswordValidationError {
      errorCode
      message
      validationErrorMessage
    }
    ...on NativeAuthStrategyError {
      errorCode
      message
    }
    ...on NotVerifiedError {
      errorCode
      message
    }
  }
}
`;

const PasswordReset: FC = () => {
  const router = useRouter();
  const { token } = router.query;
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [dirty, setDirty] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [success, setSuccess] = useState(false);

  const api = process.env.NEXT_PUBLIC_VENDURE_SHOP_API_URL;

  const handleValidation = useCallback(() => {
    // Test for Alphanumeric password
    const validPassword = /^(?=.*[a-zA-Z])(?=.*[0-9])/.test(password);
    // Unable to send form unless fields are valid.
    setDisabled(password.length < 7 || !validPassword);
  }, [password, dirty]);

  useEffect(() => {
    handleValidation();
  }, [handleValidation]);

  const handleResetPassword = async (e: React.SyntheticEvent<EventTarget>) => {
    e.preventDefault();

    if (!dirty && !disabled) {
      setDirty(true);
      handleValidation();
    }

    setLoading(true);
    setMessage('');
    fetch(api as string, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: resetPasswordMutation,
        variables: { token, password },
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        // eslint-disable-next-line no-underscore-dangle
        if (data.data.resetPassword.__typename === 'CurrentUser') {
          setSuccess(true);
        } else {
          setMessage(data.data.resetPassword.message);
        }
      });
    setLoading(false);
  };

  if (success) {
    return (
      <Flex
        $as={Container}
        $style={{
          flexDirection: 'column',
          minHeight: '100vh',
        }}
      >
        <Flex
          $style={{
            flex: 1,
            gap: '1rem',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div className='flex justify-center pb-12 '>
            <Logo width='64px' height='64px' />
          </div>
          <p>Password Changed Successfully</p>
          <Link href='/'>
            <a>Go Home &rarr;</a>
          </Link>
        </Flex>
      </Flex>
    );
  }

  return (
    <Flex $style={{ height: '100vh' }}>
      <form
        onSubmit={handleResetPassword}
        className='w-80 flex flex-col justify-between p-3 m-auto'
      >
        <div className='flex justify-center pb-12 '>
          <Logo width='64px' height='64px' />
        </div>
        <div className='flex flex-col space-y-4'>
          {message && (
            <div className='text-red border border-red p-3'>{message}</div>
          )}

          <Input
            type='password'
            placeholder='Enter New Password'
            onChange={setPassword}
          />
          <span className='text-accent-8'>
            <span className='inline-block align-middle '>
              <Info width='15' height='15' />
            </span>{' '}
            <span className='leading-6 text-sm'>
              <strong>Info</strong>: Passwords must be longer than 7 chars and
              include numbers.{' '}
            </span>
          </span>
          <div className='pt-2 w-full flex flex-col'>
            <Button
              variant='slim'
              type='submit'
              loading={loading}
              disabled={disabled}
            >
              Change Password
            </Button>
          </div>
        </div>
      </form>
    </Flex>
  );
};

export default PasswordReset;
