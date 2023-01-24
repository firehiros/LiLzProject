import { Column, Entity, JoinTable, OneToMany } from 'typeorm';
import { CoreEntity } from '@helpers/entities/core.entity';
import { Measurement } from '@/modules/measurements/entities/measurement.entity';

@Entity()
export class Gauge extends CoreEntity {
  @Column({
    name: 'name',
    type: 'varchar',
    nullable: false,
  })
  name: string;

  @OneToMany(() => Measurement, (measurement) => measurement.gauge, {
    cascade: true,
  })
  @JoinTable()
  measurements?: Measurement[];
}
