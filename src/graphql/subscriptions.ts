/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreatePost = /* GraphQL */ `
  subscription OnCreatePost {
    onCreatePost {
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
export const onUpdatePost = /* GraphQL */ `
  subscription OnUpdatePost {
    onUpdatePost {
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
export const onDeletePost = /* GraphQL */ `
  subscription OnDeletePost {
    onDeletePost {
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
export const onCreateComment = /* GraphQL */ `
  subscription OnCreateComment {
    onCreateComment {
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
export const onUpdateComment = /* GraphQL */ `
  subscription OnUpdateComment {
    onUpdateComment {
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
export const onDeleteComment = /* GraphQL */ `
  subscription OnDeleteComment {
    onDeleteComment {
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
