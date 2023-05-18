import Layout from '@/components/Layout';
import RecipeList from '@/components/RecipeList';
import useUser from '@/hooks/useUser';

export default function Home() {
  const { user, isLogged, isAdmin } = useUser();
  console.log(user);
  console.log(isLogged);
  console.log(isAdmin);

  return (
    <Layout>
      <RecipeList></RecipeList>
    </Layout>
  );
}
