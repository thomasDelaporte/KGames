import { Query, Resolver } from 'type-graphql'

@Resolver()
export class UserResolver {
  @Query(() => String, { nullable: true })
  me(): string {
    return 'Hello me'
  }
}
