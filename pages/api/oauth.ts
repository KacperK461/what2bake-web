import type { NextApiRequest, NextApiResponse } from 'next';
import { initPocketbase } from '@/utils/pocketbaseHelpers';

const oauth = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') return res.status(405).send({ message: 'Only GET requests allowed.' });

  const state = req.cookies.state;
  const expectedState = req.query.state;
  if (!state || !expectedState || state !== expectedState) return res.redirect('/auth/login');

  const provider = req.cookies.provider;
  const codeVerifier = req.cookies.codeVerifier;
  let code = req.query.code;
  if (typeof code !== 'string') code = '';

  const protocol = req.headers['x-forwarded-proto'] || 'http';
  const host = req.headers.host;
  const redirectUrl = `${protocol}://${host}/api/oauth`;

  const pb = await initPocketbase(req, res);
  try {
    const user = await pb
      .collection('users')
      .authWithOAuth2(provider || '', code || '', codeVerifier || '', redirectUrl, {
        roles: 'ROLE_USER',
      });

    if (user.record?.name === '') await pb.collection('users').update(user.record.id, { name: user.meta?.name });
  } catch (e) {
    return res.redirect('/auth/login');
  }

  return res.redirect('/');
};

export default oauth;
