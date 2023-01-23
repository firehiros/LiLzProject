import { PAGE_LIMIT } from '@helpers/constants';

export class PaginationArgs {
  first?: number = PAGE_LIMIT;
  limit?: number = PAGE_LIMIT;
  page?: number = 1;
}
