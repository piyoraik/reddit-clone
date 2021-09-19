import { Button, Container, Grid, TextField } from "@material-ui/core";
import React, { ReactElement, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { API, Storage } from "aws-amplify";
import { v4 as uuidv4 } from "uuid";
import ImageDropzone from "../components/ImageDropzone";
import { createPost } from "../graphql/mutations";
import { CreatePostInput, CreatePostMutation } from "../API";
import { GRAPHQL_AUTH_MODE } from "@aws-amplify/api-graphql";
import { useRouter } from "next/router";

interface IFormInput {
  title: string;
  content: string;
  image?: string;
}

interface Props {}

export default function create({}: Props): ReactElement {
  const [file, setFile] = useState<File>();
  const router = useRouter();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    // User uploaded file
    if (file) {
      // Send a request to upload to the S3 Bucket.
      try {
        const imagePath = uuidv4();
        await Storage.put(imagePath, file),
          {
            contentType: file.type,
          };

        // Once the file is uploaded
        const createNewPostInput: CreatePostInput = {
          title: data.title,
          contents: data.content,
          image: imagePath,
          // createdAt
          // updatedAt
          // owner
        };
        const createNewPost = (await API.graphql({
          query: createPost,
          variables: { input: createNewPostInput },
          authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
        })) as { data: CreatePostMutation };

        console.log("New post created successfully:", createNewPost);
        router.push(`/post/${createNewPost.data.createPost.id}`);
      } catch (error) {
        console.error("Error up loading file: ", error);
      }
    } else {
      const createNewPostWithoutImageInput: CreatePostInput = {
        title: data.title,
        contents: data.content,
        // createdAt
        // updatedAt
        // owner
      };
      const createNewPostWithoutimage = (await API.graphql({
        query: createPost,
        variables: { input: createNewPostWithoutImageInput },
        authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
      })) as { data: CreatePostMutation };

      router.push(`/post/${createNewPostWithoutimage.data.createPost.id}`);
    }

    console.log(data);
    console.log(file);
  };

  return (
    <Container maxWidth="md">
      {/* Create a form where */}
      <form onClick={handleSubmit(onSubmit)} autoComplete="off">
        <Grid container spacing={4} direction="column">
          {/* Title of the post  */}
          <Grid item>
            <TextField
              variant="outlined"
              label="Post Title"
              id="title"
              type="text"
              fullWidth
              error={errors.title ? true : false}
              helperText={errors.title ? errors.title.message : null}
              {...register("title", {
                required: { value: true, message: "Please enter a title." },
                maxLength: {
                  value: 120,
                  message: "Please enter a title that is 120 characters or less.",
                },
              })}
            />
          </Grid>
          {/* Content of the post */}
          <Grid item>
            <TextField
              variant="outlined"
              label="Post Content"
              id="content"
              type="text"
              fullWidth
              multiline
              error={errors.content ? true : false}
              helperText={errors.content ? errors.content.message : null}
              {...register("content", {
                required: {
                  value: true,
                  message: "Please enter some content for your post.",
                },
                maxLength: {
                  value: 1000,
                  message:
                    "Please make sure your content is 1000 characters or less.",
                },
              })}
            />
          </Grid>
          {/* Optional Image of the post */}
          <Grid item>
            <ImageDropzone file={file} setFile={setFile} />
          </Grid>
          {/* Button to submit the form wth those contents */}
          <Grid item>
            <Button variant="contained" type="submit">
              Create Post
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}
