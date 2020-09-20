import { Mutation, Query, Resolver, Arg, Int, InputType, Field } from "type-graphql";
import { Book } from '../entity/book';

@InputType()
class BookInput {
    @Field(() => String, { nullable: true })
    name?: string

    @Field(() => Int, { nullable: true })
    author?: number
}

@Resolver()
export class BooksResolver {

    @Query(() => [Book])
    async books() {
        return Book.find();
    }

    @Mutation(() => Boolean)
    async deleteBook(@Arg("id", () => Int) id: number) {
        await Book.delete({ id });
        return true;
    }

    @Mutation(() => Book)
    async addBook(
        @Arg("name") name: string
    ) {
        const book = await Book.create({ id: Date.now() % 1e8, name }).save();
        return book;
    }

    @Mutation(() => Boolean)
    async updateBook(
        @Arg("id", () => Int) id: number,
        @Arg("input", () => BookInput) input: BookInput
    ) {
        await Book.update({ id }, input);
        return true;
    }
}