import { Mutation, Resolver } from 'type-graphql'

@Resolver()
export class LobbyResolver {
  @Mutation(() => String)
  createLobby(): string {
    return 'create lobby'
  }
}
