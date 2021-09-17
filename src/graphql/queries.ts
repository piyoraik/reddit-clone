/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getPost = /* GraphQL */ `
  query GetPost($id: ID!) {
    getPost(id: $id) {
      id
      title
      PostID
      createdAt
      updatedAt
      owner
      Post {
        id
        title
        PostID
        createdAt
        updatedAt
        owner
        Post {
          id
          title
          PostID
          createdAt
          updatedAt
          owner
        }
        comments {
          nextToken
        }
      }
      comments {
        items {
          id
          postID
          content
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
    }
  }
`;
export const listPosts = /* GraphQL */ `
  query ListPosts(
    $filter: ModelPostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPosts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        PostID
        createdAt
        updatedAt
        owner
        Post {
          id
          title
          PostID
          createdAt
          updatedAt
          owner
        }
        comments {
          nextToken
        }
      }
      nextToken
    }
  }
`;
export const getComment = /* GraphQL */ `
  query GetComment($id: ID!) {
    getComment(id: $id) {
      id
      postID
      content
      createdAt
      updatedAt
      post {
        id
        title
        PostID
        createdAt
        updatedAt
        owner
        Post {
          id
          title
          PostID
          createdAt
          updatedAt
          owner
        }
        comments {
          nextToken
        }
      }
      owner
    }
  }
`;
export const listComments = /* GraphQL */ `
  query ListComments(
    $filter: ModelCommentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listComments(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        postID
        content
        createdAt
        updatedAt
        post {
          id
          title
          PostID
          createdAt
          updatedAt
          owner
        }
        owner
      }
      nextToken
    }
  }
`;
