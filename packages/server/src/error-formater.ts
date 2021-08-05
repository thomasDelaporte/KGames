import { ApolloError } from 'apollo-server-express'
import { ArgumentValidationError } from 'type-graphql'

export default (error: any): any => {
  if (error.originalError instanceof ApolloError) {
    return error
  }

  if (error.originalError instanceof ArgumentValidationError) {
    const { extensions, locations, message, path, validationErrors } = error

    error.extensions.code = 'GRAPHQL_VALIDATION_FAILED'

    console.log(error, extensions.exception.validationErrors)

    return {
      extensions,
      locations,
      message,
      path,
    }
  }

  return error
}
