import { Field, ObjectType, Int } from "type-graphql";
import { Book } from "./book";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BaseEntity } from "typeorm";

@Entity()
@ObjectType()
export class Author extends BaseEntity {
    @PrimaryGeneratedColumn()
    @Field(() => Int)
    id: number;

    @Column()
    @Field(() => String)
    name: string

    @OneToMany(() => Book, book => book.id)
    @Field(() => [Book!]!)
    books: Book[]
}