import React, { ReactElement } from "react";
import { GetStaticProps, GetStaticPaths } from "next";
import { withSSRContext } from "aws-amplify";
import { listPosts, getPost } from "../../graphql/queries";
import { ListPostsQuery, GetPostQuery, Post } from "../../API";
import PostPreview from "../../components/PostPreview";
import { Container } from "@material-ui/core";
import PostComment from "../../components/PostComment";

interface Props {
  post: Post;
}

export default function IndividualPost({ post }: Props): ReactElement {
  console.log("God post", post);

  return (
    <Container maxWidth="md">
      <PostPreview post={post} />

      {/* Start rendering comments */}
      {post.comments.items.map((comment) => (
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
