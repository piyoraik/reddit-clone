import { useEffect, useState } from "react";
import { Container } from "@material-ui/core";
import { useUser } from "./context/AuthContext";
import { listPosts } from "../graphql/queries";
import API from "@aws-amplify/api";
import { ListPostsQuery, Post } from "../API";
import PostPreview from "../components/PostPreview";

export default function Home() {
  const { user } = useUser();
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPostsFromApi = async (): Promise<Post[]> => {
      const allPosts = (await API.graphql({ query: listPosts })) as {
        data: ListPostsQuery;
        errors: any[];
      };

      if (allPosts.data) {
        setPosts(allPosts.data.listPosts.items as Post[]);
        return allPosts.data.listPosts.items as Post[];
      } else {
        throw new Error("Cloud not get posts");
      }
    };
    fetchPostsFromApi();
  }, []);

  console.log("USER:", user);
  console.log("POSTS", posts);

  return (
    <Container maxWidth="md">
      {posts.map((post) => (
        <PostPreview key={post.id} post={post} />
      ))}
    </Container>
  );
}
