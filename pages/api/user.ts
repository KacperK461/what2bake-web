import type { NextApiRequest, NextApiResponse } from 'next';
import { initPocketbase } from '@/lib/pocketbase';

const user = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') return res.status(405).send({ message: 'Only GET requests allowed.' });

  const pb = await initPocketbase(req, res);

  return res.status(200).send(pb.authStore.model);
};

export default user;
