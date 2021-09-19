import { Button, Container, Grid, TextField } from "@material-ui/core";
import React, { ReactElement, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import ImageDropzone from "../components/ImageDropzone";

interface IFormInput {
  title: string;
  content: string;
  image?: string;
}

interface Props {}

export default function create({}: Props): ReactElement {
  const [file, setFile] = useState<string>();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    console.log(data);
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
            <Button variant="contained">Create Post</Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}
