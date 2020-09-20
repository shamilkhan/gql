import { Field, Int, ObjectType } from "type-graphql";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BaseEntity } from "typeorm";
import { Author } from './autor';

@Entity()
@ObjectType()
export class Book extends BaseEntity {
    @PrimaryGeneratedColumn()
    @Field(() => Int)
    id: number;

    @Column()
    @Field(() => String)
    name: string;

    @OneToMany(() => Author, author => author.id)
    @Field(() => [Author!]!)
    authors: Author[]
}