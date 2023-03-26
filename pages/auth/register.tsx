import AuthLayout from '@/components/AuthLayout';
import useUser from '@/hooks/useUser';
import { initPocketbase, serializeNonPOJOs } from '@/lib/pocketbase';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { FormEvent } from 'react';
import Form from '@/components/Form';
import Button from '@/components/Button';
import Link from 'next/link';
import FacebookIcon from '@/public/icons/facebook-icon.svg';
import GoogleIcon from '@/public/icons/google-icon.svg';
import TwitterIcon from '@/public/icons/twitter-icon.svg';
import { AuthProviderInfo } from 'pocketbase';

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const pb = await initPocketbase(req, res);

  if (pb.authStore.isValid)
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };

  const authMethods = await pb.collection('users').listAuthMethods();
  return {
    props: {
      authProviders: authMethods.authProviders,
    },
  };
};

const Register = ({ authProviders }: { authProviders: AuthProviderInfo[] }) => {
  const [error, setError] = useState<any>(null);
  const router = useRouter();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(Object.fromEntries(formData.entries())),
      });

      if (response.ok) router.push('/');
      else {
        const data = await response.json();
        setError(data?.message);
      }
    } catch (_) {
      setError('Coś poszło nie tak. Spróbuj ponownie później.');
    }
  };

  return (
    <AuthLayout>
      <h1 className='text-2xl font-bold'>Zarejestruj się</h1>
      <Form onSubmit={handleSubmit} error={error}>
        <Form.Input type='text' name='name' placeholder='Nazwa' />
        <Form.Input type='email' name='email' placeholder='Email' />
        <Form.Input type='password' name='password' placeholder='Hasło' />
        <Form.GeneralError />
        <Button type='submit' color='yellow'>
          Zarejestruj się
        </Button>
      </Form>

      <p className='mt-7 text-center text-xs'>
        Przez zarejestrowanie się akceptujesz <br />
        naszą{' '}
        <Link href='#' className='text-yellow'>
          Politykę prywatności
        </Link>
      </p>

      {/* {authProviders.map((provider) => (
        <button onClick={() => handleOAuth(provider)} key={provider.name}>
          {provider.name}
        </button>
      ))} */}
      <div className='my-10 flex justify-around'>
        <button>
          <FacebookIcon className='text-5xl' />
        </button>
        <button>
          <GoogleIcon className='text-5xl' />
        </button>
        <button>
          <TwitterIcon className='text-5xl' />
        </button>
      </div>

      <p className='mt-16 mb-4 text-center'>
        Masz już konto?{' '}
        <Link href='/auth/login' className='text-yellow'>
          Zaloguj się!
        </Link>
      </p>
    </AuthLayout>
  );
};

export default Register;
