import useSWR from 'swr';
import { fetcher } from '@/lib/swrFetchers';
import { useState } from 'react';
import Image from 'next/image';

const RecipeList = () => {
  // const [page, setPage] = useState(0);
  // const { data, error, isLoading, mutate } = useSWR(
  //   [
  //     process.env.NEXT_PUBLIC_API_URL + '/recipe',
  //     {
  //       method: 'GET',
  //       body: JSON.stringify({ page }),
  //     },
  //   ],
  //   fetcher
  // );

  return (
    <div className='flex w-full flex-row overflow-y-scroll' onClick={() => console.log()}>
      {data.map((recipe) => (
        <div className='shrink-0'>
          <Image src={recipe.image} width={165} height={142} alt={recipe.title}></Image>
        </div>
      ))}
    </div>
  );
};

const data = [
  {
    id: 389,
    title: 'Ciasto kruche z żurawiną',
    link: 'https://mojewypieki.com/przepis/ciasto-kruche-z-zurawina',
    image:
      'https://static.mojewypieki.com/wp-content/uploads/2022/01/Ciasto_kruche_z_zurawina_3.jpg',
    likes: 0,
    rating: 0.0,
  },
  {
    id: 389,
    title: 'Ciasto kruche z żurawiną',
    link: 'https://mojewypieki.com/przepis/ciasto-kruche-z-zurawina',
    image:
      'https://static.mojewypieki.com/wp-content/uploads/2022/01/Ciasto_kruche_z_zurawina_3.jpg',
    likes: 0,
    rating: 0.0,
  },
  {
    id: 389,
    title: 'Ciasto kruche z żurawiną',
    link: 'https://mojewypieki.com/przepis/ciasto-kruche-z-zurawina',
    image:
      'https://static.mojewypieki.com/wp-content/uploads/2022/01/Ciasto_kruche_z_zurawina_3.jpg',
    likes: 0,
    rating: 0.0,
  },
  {
    id: 389,
    title: 'Ciasto kruche z żurawiną',
    link: 'https://mojewypieki.com/przepis/ciasto-kruche-z-zurawina',
    image:
      'https://static.mojewypieki.com/wp-content/uploads/2022/01/Ciasto_kruche_z_zurawina_3.jpg',
    likes: 0,
    rating: 0.0,
  },
  {
    id: 389,
    title: 'Ciasto kruche z żurawiną',
    link: 'https://mojewypieki.com/przepis/ciasto-kruche-z-zurawina',
    image:
      'https://static.mojewypieki.com/wp-content/uploads/2022/01/Ciasto_kruche_z_zurawina_3.jpg',
    likes: 0,
    rating: 0.0,
  },
  {
    id: 389,
    title: 'Ciasto kruche z żurawiną',
    link: 'https://mojewypieki.com/przepis/ciasto-kruche-z-zurawina',
    image:
      'https://static.mojewypieki.com/wp-content/uploads/2022/01/Ciasto_kruche_z_zurawina_3.jpg',
    likes: 0,
    rating: 0.0,
  },
  {
    id: 389,
    title: 'Ciasto kruche z żurawiną',
    link: 'https://mojewypieki.com/przepis/ciasto-kruche-z-zurawina',
    image:
      'https://static.mojewypieki.com/wp-content/uploads/2022/01/Ciasto_kruche_z_zurawina_3.jpg',
    likes: 0,
    rating: 0.0,
  },
];
export default RecipeList;
