import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import getEnvironments from "@environment";
import CurtUrls from "../../curt_urls/models/curt-urls.model";

@Index("user_pk", ["id"], { unique: true })
@Entity("users", { schema: getEnvironments().schema })
export default class User {
  @PrimaryColumn({
    type: "varchar",
    length: 255,
    name: "id",
  })
  id: string | undefined;

  @Column({
    name: "name",
    type: "varchar",
    length: 255,
  })
  name: string | undefined;

  @Column({
    name: "password",
    type: "varchar",
    length: 120,
  })
  password: string | undefined;

  @Column({
    name: "email",
    type: "varchar",
    length: 255,
  })
  email: string | undefined;

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


  @OneToMany(() => CurtUrls, (relation) => relation.user)
  urls: CurtUrls[] | undefined;
}
