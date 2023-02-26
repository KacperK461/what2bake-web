import type { NextApiRequest, NextApiResponse } from 'next';
import { initPocketbase } from '@/utils/pocketbaseHelpers';
import { z } from 'zod';

const registerSchema = z.object({
  name: z
    .string({ required_error: 'Nazwa użytkownika jest wymagana.' })
    .trim()
    .min(1, { message: 'Nazwa użytkownika jest wymagana.' }),
  email: z
    .string({ required_error: 'Email jest wymagany.' })
    .trim()
    .min(1, { message: 'Email jest wymagany.' })
    .email({ message: 'Nieprawidłowy email.' }),
  password: z
    .string({ required_error: 'Hasło jest wymagane.' })
    .trim()
    .min(1, { message: 'Hasło jest wymagane.' })
    .min(6, { message: 'Hasło musi składać się przynajmniej z 6 znaków.' }),
});

const register = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') return res.status(405).send({ message: 'Only POST requests allowed.' });

  const registerData = registerSchema.safeParse(req.body);
  if (!registerData.success) return res.status(400).send({ message: registerData.error.flatten() });

  const pb = await initPocketbase(req, res);

  try {
    await pb.collection('users').create({
      ...registerData.data,
      passwordConfirm: registerData.data.password,
      roles: 'ROLE_USER',
    });
    await pb.collection('users').authWithPassword(registerData.data.email, registerData.data.password);
    return res.status(201).send({ message: 'Success' });
  } catch (error: any) {
    if (error?.data?.data?.email) return res.status(400).send({ message: 'Konto z tym adresem e-mail już istnieje.' });

    return res.status(500).send({ message: 'Coś poszło nie tak, spróbuj ponownie.' });
  }
};

export default register;
