import { Column, Entity, ManyToOne } from 'typeorm';

import { CoreEntity } from '@helpers/entities/core.entity';
import { Gauge } from '@/modules/gauges/entities/gauge.entity';

@Entity()
export class Measurement extends CoreEntity {
  @Column({
    name: 'datetime',
    type: 'datetime',
    nullable: false,
  })
  datetime: Date;

  @Column({
    name: 'value',
    type: 'double',
    nullable: false,
  })
  value: string;

  @ManyToOne(() => Gauge)
  gauge?: Gauge;
}
