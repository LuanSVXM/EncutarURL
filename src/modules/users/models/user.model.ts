import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryColumn,
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

  @OneToMany(() => CurtUrls, (relation) => relation.user)
  urls: CurtUrls[] | undefined;
}
