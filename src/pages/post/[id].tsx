import React, { ReactElement, useState } from "react";
import { GetStaticProps, GetStaticPaths } from "next";
import { API, withSSRContext } from "aws-amplify";
import { listPosts, getPost } from "../../graphql/queries";
import {
  ListPostsQuery,
  GetPostQuery,
  Post,
  CreateCommentInput,
  CreateCommentMutation,
  Comment,
} from "../../API";
import PostPreview from "../../components/PostPreview";
import { Button, Container, Grid, TextField } from "@material-ui/core";
import PostComment from "../../components/PostComment";
import { SubmitHandler, useForm } from "react-hook-form";
import { createComment } from "../../graphql/mutations";
import { GRAPHQL_AUTH_MODE } from "@aws-amplify/api-graphql";

interface IFormInput {
  comment: string;
}

interface Props {
  post: Post;
}

export default function IndividualPost({ post }: Props): ReactElement {
  const [comments, setComments] = useState<Comment[]>(
    post.comments.items as Comment[]
  );
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    console.log(data);

    const newCommentInput: CreateCommentInput = {
      postID: post.id,
      content: data.comment,
    };
    // Add Comment Mutation
    const createNewComment = (await API.graphql({
      query: createComment,
      variables: { input: newCommentInput },
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    })) as { data: CreateCommentMutation };

    setComments([...comments, createNewComment.data.createComment as Comment]);
  };

  return (
    <Container maxWidth="md">
      <PostPreview post={post} />
      {/* Start rendering comments */}
      {/* Space for user to add a comment */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        autoComplete="off"
        style={{ marginTop: 32, marginBottom: 32 }}
      >
        <Grid container spacing={2} direction="row" alignItems="center">
          <Grid item style={{ flexGrow: 1 }}>
            <TextField
              variant="outlined"
              label="Add A Comment"
              id="comment"
              type="text"
              multiline
              fullWidth
              error={errors.comment ? true : false}
              helperText={errors.comment ? errors.comment.message : null}
              {...register("comment", {
                required: { value: true, message: "Please enter a comment." },
                maxLength: {
                  value: 240,
                  message: "Please enter a comment under 240 characters.",
                },
              })}
              style={{ width: "100%" }}
            />
          </Grid>
          <Grid item>
            <Button variant="contained" color="default" type="submit">
              Add Comment
            </Button>
          </Grid>
        </Grid>
      </form>
      {/* TODO: Sort comments by createdDate */}
      {comments
        .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
        .map((comment) => (
          <PostComment key={comment.id} comment={comment} />
        ))}
    </Container>
  );
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const SSR = withSSRContext();
  const postsQuery = (await SSR.API.graphql({
    query: getPost,
    variables: {
      id: params.id,
    },
  })) as { data: GetPostQuery };
  return {
    props: {
      post: postsQuery.data.getPost as Post,
    },
    revalidate: 1,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const SSR = withSSRContext();
  const response = (await SSR.API.graphql({ query: listPosts })) as {
    data: ListPostsQuery;
    errors: any[];
  };
  const paths = response.data.listPosts.items.map((post) => ({
    params: { id: post.id },
  }));

  return { paths, fallback: "blocking" };
};
