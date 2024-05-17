import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
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
    name: "shortID",
    type: "varchar",
    length: 6,
  })
  short_id: string | undefined;

  @ManyToOne(() => User, (relation) => relation.urls)
  @JoinColumn({ name: "userID", referencedColumnName: "id" })
  user: User | undefined;
}
