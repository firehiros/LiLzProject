import { SortOrder } from 'src/helpers/dto/generic-conditions.dto';

export class GetGaugeDto {
  orderBy?: QueryGaugesOrderByClause[];
  search?: string;
  limit?: string;
}

export class QueryGaugesOrderByClause {
  column: QueryGaugeOrderByColumn;
  order: SortOrder;
}

export enum QueryGaugeOrderByColumn {
  NAME = 'NAME',
  CREATED_AT = 'CREATED_AT',
  UPDATED_AT = 'UPDATED_AT',
}
