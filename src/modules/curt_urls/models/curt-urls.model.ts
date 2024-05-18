import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import getEnvironments from "@environment";
import User from "../../users/models/user.model";

@Index("curt_url_pk", ["id"], { unique: true })
@Entity("curt_urls", { schema: getEnvironments().schema })
export default class CurtUrls {
  @PrimaryColumn({
    type: "varchar",
    length: 255,
    name: "id",
  })
  id: string | undefined;

  @Column({
    name: "url",
    type: "text",
  })
  url: string | undefined;

  @Column({
    name: "views",
    type: "bigint",
  })
  views: number | undefined;

  @Column({
    name: "short_id",
    type: "varchar",
    length: 6,
  })
  short_id: string | undefined;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp'
  })
  created_at: Date | undefined;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp'
  })
  updated_at: Date | undefined;

  @Column({
    name: 'deleted_at',
    type: 'timestamp'
  })
  deleted_at: Date | undefined;


  @ManyToOne(() => User, (relation) => relation.urls)
  @JoinColumn({ name: "user_id", referencedColumnName: "id" })
  user: User | null | undefined;
}
