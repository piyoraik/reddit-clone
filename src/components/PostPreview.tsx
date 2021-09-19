import React, { ReactElement, useState, useEffect } from "react";
import { ButtonBase, Grid, Paper, Typography } from "@material-ui/core";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import IconButton from "@material-ui/core/IconButton";
import { Post } from "../API";
import Image from "next/image";
import { useRouter } from "next/router";
import formatDataPosted from "../lib/formatDatePosted";
import { Storage } from "@aws-amplify/storage";

interface Props {
  post: Post;
}

export default function PostPreview({ post }: Props): ReactElement {
  const router = useRouter();
  const [postImage, setPostImage] = useState<string | undefined>(undefined);

  useEffect(() => {
    async function getImageFormStorage() {
      try {
        const signedURL = await Storage.get(post.image);
        // @ts-ignore
        setPostImage(signedURL);
      } catch (error) {
        console.error("No Image found");
      }
    }

    getImageFormStorage();
  }, []);

  return (
    <Paper elevation={3}>
      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="flex-start"
        wrap="nowrap"
        spacing={3}
        style={{ padding: 12, marginTop: 24 }}
      >
        {/* Upvote / votes / downvote */}
        <Grid
          container
          direction="column"
          item
          spacing={1}
          style={{ maxWidth: 128 }}
        >
          <Grid container direction="column" alignItems="center">
            <Grid item>
              <IconButton color="inherit" style={{ maxWidth: 16 }}>
                <ArrowUpwardIcon />
              </IconButton>
            </Grid>
            <Grid item>
              <Grid container alignItems="center" direction="column">
                <Grid item>
                  <Typography variant="h6">
                    {(post.upvotes - post.downvotes).toString()}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="body2">votes</Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <IconButton color="inherit" style={{ maxWidth: 20 }}>
                <ArrowDownwardIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>

        {/* Content Preview */}
        <Grid item>
          <ButtonBase onClick={() => router.push(`post/${post.id}`)}>
            <Grid container direction="column" alignItems="flex-start">
              <Grid item>
                <Typography variant="body1">
                  Posted by <b>{post.owner}</b> at{" "}
                  <b>{formatDataPosted(post.createdAt)} hours ago</b>
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="h2">{post.title}</Typography>
              </Grid>
              <Grid
                item
                style={{ maxHeight: 32, overflowY: "hidden", overflowX: "hidden" }}
              >
                <Typography variant="body1">{post.contents}</Typography>
              </Grid>

              {post.image && postImage && (
                <Grid item>
                  <Image
                    src={postImage}
                    height={540}
                    width={980}
                    layout="intrinsic"
                  />
                </Grid>
              )}
            </Grid>
          </ButtonBase>
        </Grid>
      </Grid>
    </Paper>
  );
}
