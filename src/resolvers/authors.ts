import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Author } from "../entity/autor";

@Resolver()
export class AuthorResolver {
    @Query(() => [Author!]!)
    authors() {
        return Author.find();
    }

    @Mutation(() => Author)
    async addAuthor(
        @Arg("name") name: string
    ) {
        const author = await Author.create({ id: Date.now() % 1e8, name }).save();
        return author;
    }
}