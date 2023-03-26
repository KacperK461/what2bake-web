import type { NextApiRequest, NextApiResponse } from 'next';
import { initPocketbase } from '@/lib/pocketbase';
import { z } from 'zod';

const loginSchema = z.object({
  email: z
    .string({ required_error: 'Email jest wymagany.' })
    .trim()
    .min(1, { message: 'Email jest wymagany.' })
    .email({ message: 'Nieprawidłowy email.' }),
  password: z
    .string({ required_error: 'Hasło jest wymagane.' })
    .trim()
    .min(1, { message: 'Hasło jest wymagane.' }),
});

const login = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST')
    return res.status(405).send({ message: 'Only POST requests allowed.' });

  const loginData = loginSchema.safeParse(req.body);
  if (!loginData.success) return res.status(400).send({ message: loginData.error.flatten() });

  const pb = await initPocketbase(req, res);
  try {
    await pb.collection('users').authWithPassword(loginData.data.email, loginData.data.password);
    return res.send({ message: 'Success' });
  } catch {
    return res.status(400).send({ message: 'Nieprawidłowy email lub hasło.' });
  }
};

export default login;
