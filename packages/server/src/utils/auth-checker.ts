import { AuthChecker } from 'type-graphql';

export const authChecker: AuthChecker<{ req: any; res: any }> = (
  { root, args, context, info },
  roles
) => {
  if (roles.length === 0) {
    if (context.req.user === undefined) {
      throw new Error("Vous n'êtes pas authoriser à faire cette requête");
    }
    return context.req.user !== undefined;
  }

  return false;
};
