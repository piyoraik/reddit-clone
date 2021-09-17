import React, { ReactElement } from "react";
import { Grid, Paper, Typography } from "@material-ui/core";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import IconButton from "@material-ui/core/IconButton";
import { Post } from "../API";

interface Props {
  post: Post;
}

export default function PostPreview({ post }: Props): ReactElement {
  return (
    <Paper elevation={3}>
      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="flex-start"
        spacing={3}
        style={{ width: "100%", padding: 12, marginTop: 24 }}
      >
        {/* Upvote / votes / downvote */}
        <Grid direction="column" item spacing={1} style={{ maxWidth: 128 }}>
          <Grid container direction="column" alignItems="center">
            <Grid item>
              <IconButton color="inherit" style={{ maxWidth: 16 }}>
                <ArrowUpwardIcon />
              </IconButton>
            </Grid>
            <Grid item>votes</Grid>
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
                Posted by <b>{post.owner}</b> at <b>{post.createdAt}</b>
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="h2">{post.title}</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}
