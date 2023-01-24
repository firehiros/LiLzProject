import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { CoreEntity } from '@helpers/entities/core.entity';
import { Gauge } from '@/modules/gauges/entities/gauge.entity';

@Entity()
export class Measurement extends CoreEntity {
  @Column({
    name: 'datetime',
    nullable: false,
  })
  datetime: Date;

  @Column({
    name: 'value',
    type: 'varchar',
    nullable: false,
  })
  value: string;

  @ManyToOne(() => Gauge)
  @JoinColumn({ name: 'gauge_id' })
  gauge?: Gauge;
}
