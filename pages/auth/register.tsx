import useUser from '@/hooks/useUser';
import { initPocketbase, serializeNonPOJOs } from '@/lib/pocketbase';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { FormEvent } from 'react';

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const pb = await initPocketbase(req, res);

  if (pb.authStore.isValid)
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };

  return {
    props: {},
  };
};

const Register = () => {
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
    <>
      <form onSubmit={handleSubmit}>
        <input type='text' name='name' />
        {error?.fieldErrors?.name?.[0]}
        <input type='email' name='email' />
        {error?.fieldErrors?.email?.[0]}
        <input type='password' name='password' />
        {error?.fieldErrors?.password?.[0]}
        {typeof error === 'string' && error}
        <button type='submit'>submit</button>
      </form>
    </>
  );
};

export default Register;
