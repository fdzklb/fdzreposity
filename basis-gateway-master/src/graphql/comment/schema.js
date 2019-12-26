module.exports = {
  /**
   * define graphql query methods
   */

  // TODO: 与front统一成一个协议
  query: `
    getCommentLists: [GetCommentListsResponse]
    getCommentList(parameters:UserNameInput): GetCommentListResponse
    
  `,

  /**
   * define graphql mutation methods
   */

  mutation: `
    updateComment(parameters: CommentInput ): updateCommentResponse
    insertComment(parameters: InsertInput): InsertCommentResponse
    deleteComment(parameters: DeleteInput): DeleteCommentResponse
  `,
  /**
   * define graphql 'input' and 'type' dataType
   */
  definition: `
    input UserNameInput {
      userId:Int
      userName: String
    }
    
    input CommentInput{
      userId:Int
      comment: String
    }
    
    input InsertInput{
      userName: String
      comment: String
    }
        
    input DeleteInput{
      userId: Int  
    }
    
    
    type GetCommentListsResponse {
      userId: Int
      userName: String
      comment: String
     
    }
    
    type GetCommentListResponse {
      userId: Int
      userName: String
      comment: String
    }

    type updateCommentResponse {
      userId: Int
    }

    type InsertCommentResponse {
      userId: Int
    }
    
    type DeleteCommentResponse {
      userId: Int
    }
  `,
};
