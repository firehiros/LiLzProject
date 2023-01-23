import { SortOrder } from '@helpers/dto/generic-conditions.dto';

export class GetMeasurementDto {
  orderBy?: QueryMeasurementOrderByClause[];
  search?: string;
  limit?: string;
}

export class QueryMeasurementOrderByClause {
  column: QueryMeasurementOrderByColumn;
  order: SortOrder;
}

export enum QueryMeasurementOrderByColumn {
  DATETIME = 'DATETIME',
  VALUE = 'VALUE',
  CREATED_AT = 'CREATED_AT',
  UPDATED_AT = 'UPDATED_AT',
}
