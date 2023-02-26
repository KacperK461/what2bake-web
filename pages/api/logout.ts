import type { NextApiRequest, NextApiResponse } from 'next';
import { initPocketbase } from '@/utils/pocketbaseHelpers';

const register = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'DELETE') return res.status(405).send({ message: 'Only DELETE requests allowed.' });

  const pb = await initPocketbase(req, res);
  pb.authStore.clear();

  return res.status(200).send({ message: 'success' });
};

export default register;
