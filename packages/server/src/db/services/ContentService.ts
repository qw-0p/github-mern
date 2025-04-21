import * as contentDal from '../dal/content';
import { IRepository } from '../../types/interfaces';

export const create = async (name: string, userId: string) => {

  const response = await fetch(`https://api.github.com/repos/${name}`, {
    method: "GET",
  })

  const data: IRepository  = await response.json();

  return contentDal.create({...data, user: userId});
};

export const getAll = async () => {
  return await contentDal.getAll();
};

export const deleteById = async (id: string) => {
  return await contentDal.deleteById(id);
};
