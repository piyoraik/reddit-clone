import { Grid, Typography } from "@material-ui/core";
import React from "react";
import { useDropzone } from "react-dropzone";

interface Props {
  file: string;
  setFile: React.Dispatch<React.SetStateAction<string>>;
}

export default function ImageDropzone({ file, setFile }: Props) {
  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      setFile(URL.createObjectURL(acceptedFiles[0]));
    },
  });

  return (
    <>
      {!file ? (
        <section
          className="container"
          style={{
            borderStyle: "dotted",
            borderWidth: 2,
            borderColor: "#fff",
            minHeight: 128,
          }}
        >
          <div {...getRootProps({ className: "dropzone" })} style={{ padding: 16 }}>
            <input {...getInputProps()} />
            <Typography variant="body1">
              Drag and drop the image you want to upload for your post.
            </Typography>
          </div>
        </section>
      ) : (
        <Grid
          container
          alignItems="center"
          justifyContent="center"
          direction="column"
          spacing={1}
        >
          <Grid item>
            <Typography variant="h6">Your Image:</Typography>
          </Grid>
          <Grid item>
            <img src={file} style={{ width: "auto", maxHeight: "320" }} />
          </Grid>
        </Grid>
      )}
    </>
  );
}
