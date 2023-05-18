import Router from 'next/router';

export const fetcher = async ([url, options]: [url: string, options?: RequestInit]) => {
  console.log(options);

  const response = await fetch(url, options);
  console.log(await response.json());
  if (response.status === 401) {
    Router.push('/auth/login');
    throw new Error('User is not authenticated.');
  }

  if (response.status === 403) {
    Router.push('/');
    throw new Error('User is not authenticated.');
  }

  //TODO:Add custom error
  if (!response.ok) throw new Error('An error occurred while fetching the data.');

  return response.json();
};

export const postFetcher = async (url: string, body: any) =>
  fetcher([
    url,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    },
  ]);
