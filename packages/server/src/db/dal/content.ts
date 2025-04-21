import { Content } from '../models';
import { IRepository } from '../../types/interfaces';

interface IRepositoryWithUser extends IRepository {
  user: string;
}

export const create = async (data: IRepositoryWithUser) => {
  const newItem = new Content({
    name: data.name,
    url: data.svn_url,
    stars: data.stargazers_count,
    forks: data.forks_count,
    issues: data.open_issues_count,
    owner: data.owner.login,
    createdAt: data.created_at,
    user: data.user,
  })
  return await newItem.save()
};

export const getAll = async () => {
  return Content.find();
};

export const deleteById = async (id: string) => {
  return Content.findByIdAndDelete(id)
}
