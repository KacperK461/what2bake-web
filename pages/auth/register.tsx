import { initPocketbase, serializeNonPOJOs } from '@/utils/pocketbaseHelpers';
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
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<any>(null);

  const router = useRouter();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const response = await fetch('../api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });

    if (response.ok) router.push('/');
    else {
      const data = await response.json();
      setError(data?.message);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type='text' name='name' value={name} onChange={(event) => setName(event.target.value)} />
        {error?.fieldErrors?.name?.[0]}
        <input type='email' name='email' value={email} onChange={(event) => setEmail(event.target.value)} />
        {error?.fieldErrors?.email?.[0]}
        <input type='password' name='password' value={password} onChange={(event) => setPassword(event.target.value)} />
        {error?.fieldErrors?.password?.[0]}
        {typeof error === 'string' && error}
        <button type='submit'>submit</button>
      </form>
    </>
  );
};

export default Register;
