import { initPocketbase } from '@/utils/pocketbaseHelpers';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { FormEvent } from 'react';
import { AuthProviderInfo } from 'pocketbase';
import AuthLayout from '@/components/AuthLayout';

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

const Login = ({ authProviders }: { authProviders: AuthProviderInfo[] }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<any>(null);

  const router = useRouter();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const response = await fetch('../api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      // body: JSON.stringify({
      //   email,
      //   password,
      // }),
      body: JSON.stringify(Object.fromEntries(formData.entries())),
    });

    if (response.ok) router.push('/');
    else {
      const data = await response.json();
      setError(data?.message);
    }
  };

  const handleOAuth = (provider: AuthProviderInfo) => {
    const redirectUrl = window.location.origin + '/api/oauth';
    const url = `${provider.authUrl}${redirectUrl}`;
    document.cookie = `state=${provider.state};path=/`;
    document.cookie = `provider=${provider.name};path=/`;
    document.cookie = `codeVerifier=${provider.codeVerifier};path=/`;
    router.push(url);
  };

  return (
    <AuthLayout>
      <form onSubmit={handleSubmit} className='h-[60vh]'>
        <input type='email' name='email' value={email} onChange={(event) => setEmail(event.target.value)} />
        {error?.fieldErrors?.email?.[0]}
        <input type='password' name='password' value={password} onChange={(event) => setPassword(event.target.value)} />
        {error?.fieldErrors?.password?.[0]}
        {typeof error === 'string' && error}
        <button type='submit'>submit</button>
        {authProviders.map((provider) => (
          <button onClick={() => handleOAuth(provider)} key={provider.name}>
            {provider.name}
          </button>
        ))}
      </form>
    </AuthLayout>
  );
};

export default Login;
