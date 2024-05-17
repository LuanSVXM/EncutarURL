import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import getEnvironments from "@environment";

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
}
