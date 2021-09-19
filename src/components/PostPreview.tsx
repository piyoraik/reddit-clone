import React, { ReactElement } from "react";
import { Grid, Paper, Typography } from "@material-ui/core";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import IconButton from "@material-ui/core/IconButton";
import { Post } from "../API";
import Image from "next/image";

interface Props {
  post: Post;
}

export default function PostPreview({ post }: Props): ReactElement {
  const convertDateToElapsed = function (date: string): string {
    const now = new Date(Date.now());
    const current = new Date(date);

    const diff = now.getTime() - current.getTime();

    return (diff / 1000 / 60 / 60).toFixed(0);
  };

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
        <Grid direction="column" item spacing={1} style={{ maxWidth: 128 }}>
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
          <Grid container direction="column" alignItems="flex-start">
            <Grid item>
              <Typography variant="body1">
                Posted by <b>{post.owner}</b> at{" "}
                <b>{convertDateToElapsed(post.createdAt)} hours ago</b>
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

            {!post.image && (
              <Grid item>
                <Image
                  src={"https://source.unsplash.com/random/980x540"}
                  height={540}
                  width={980}
                  layout="intrinsic"
                />
              </Grid>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}
