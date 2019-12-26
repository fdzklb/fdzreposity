module.exports = {
  /**
   * define graphql query methods
   */
  query: `
    getUser: User
    login(name:String, password:String): LoginResult
  `,

  /**
   * define graphql mutation methods
   */
  mutation: `
    mutateUser(parameters: UserInput): UserResponse
    changePassword(parameters: ChangePasswordInput): UserResponse
  `,

  /**
   * define graphql 'input' and 'type' dataType
   */
  definition: `
    input UserInput {
      userName: String
      firstName: String
      lastName: String
      email: String
      country: String
      phone: String
    }

    input ChangePasswordInput{
      newPassword: String
      oldPassword: String
    }

    type User {
      userId: Int
      userName: String
      firstName: String
      lastName: String
      email: String
      country: String
      phone: String
    }

    type LoginResult {
      userId: Int
      userName: String
      token: String
    }

    type UserResponse {
      userId: Int
    }
  `,
};
