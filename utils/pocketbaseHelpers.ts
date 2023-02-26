import PocketBase, { Record, Admin } from 'pocketbase';
import { GetServerSidePropsContext } from 'next';
import type { NextApiRequest, NextApiResponse } from 'next';

export const initPocketbase = async (
  req: NextApiRequest | GetServerSidePropsContext['req'],
  res: NextApiResponse | GetServerSidePropsContext['res']
) => {
  const pb = new PocketBase(process.env.POCKETBASE_URL);

  pb.authStore.loadFromCookie(req?.headers?.cookie || '');

  pb.authStore.onChange(() => {
    res?.setHeader('set-cookie', pb.authStore.exportToCookie());
  });

  try {
    pb.authStore.isValid && (await pb.collection('users').authRefresh());
  } catch (_) {
    pb.authStore.clear();
  }

  return pb;
};

export const serializeNonPOJOs = (model: Record | Admin | null) => {
  return structuredClone(model);
};
