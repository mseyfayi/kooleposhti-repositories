import { getGetCategoriesUrl } from './apiPaths';
import fetch from 'node-fetch';
import { Post } from './types';

let accessToken: string | null = null;

export const login = () => {
  if (!accessToken) {
    //todo
    accessToken =
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTY0MzM4MDczMCwianRpIjoiMTMxYjRjZWEtMjhmNC00YjZhLWJmMTktZWUzYjJlYmI2ZjM4IiwidHlwZSI6ImFjY2VzcyIsInN1YiI6Im0uc2V5ZmF5aUBtYWlsLnNidS5hYy5pciIsIm5iZiI6MTY0MzM4MDczMCwiZXhwIjoxNjQzMzgxNjMwfQ.4OmY1MUotGMSgErB4pyqkeuGCpamap0KO848laOmSlo';
  }
};

export const getCategories = async () => {
  await login();
  const res = await fetch(getGetCategoriesUrl(), {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (res.status < 300 && res.status >= 200) {
    return await res.json();
  }
  return undefined;
};

export const createPost = async (post: Post) => {
  console.log('creating post...', post);
  await login();
  const res = await fetch(getGetCategoriesUrl(), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(post),
  });

  if (res.status < 300 && res.status >= 200) {
    console.log('post created!', post);
    return await res.json();
  }
  return undefined;
};
