import { CreateContentDto } from '../../dto/content.dto';
import * as contentService from '../../../db/services/ContentService';


export const create = async (payload: CreateContentDto) => {
  const { name, userId } = payload;

  return await contentService.create(name, userId);
}

export const getAll = async () => {
  return await contentService.getAll();
}

export const deleteById = async (id: string) => {
  return await contentService.deleteById(id);
}
