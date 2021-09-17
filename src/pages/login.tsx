import React, { useState } from "react";
import { CognitoUser } from "@aws-amplify/auth";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button, TextField, Grid, Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { Auth } from "aws-amplify";
import { useUser } from "./context/AuthContext";
import { useRouter } from "next/router";

interface IFormInput {
  username: string;
  password: string;
}

export default function Login() {
  const { user, setUser } = useUser();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [signInError, setSignInError] = useState<string>("");
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const amplifyUser = await Auth.signIn(data.username, data.password);
    if (amplifyUser) {
      router.push("/");
    } else {
      throw new Error("Something went wrong ");
    }
  };

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
      <Grid container direction="column" alignItems="center" justifyContent="center" spacing={1}>
        <Grid item>
          <TextField
            variant="outlined"
            label="username"
            id="username"
            type="text"
            error={errors.username ? true : false}
            helperText={errors.username ? errors.username.message : null}
            {...register("username", {
              required: { value: true, message: "Please enter a username." },
              minLength: { value: 3, message: "Please enter a username between 3-16 characters." },
              maxLength: { value: 16, message: "Please enter a username between 3-16 characters." },
            })}
          />
        </Grid>

        <Grid item>
          <TextField
            variant="outlined"
            label="password"
            id="password"
            type="password"
            error={errors.password ? true : false}
            helperText={errors.password ? errors.password.message : null}
            {...register("password", {
              required: { value: true, message: "Please enter a code" },
              minLength: { value: 8, message: "Your verification is 6 characters long." },
            })}
          />
        </Grid>

        <Grid style={{ marginTop: 16 }}>
          <Button variant="contained" type="submit">
            Sign In
          </Button>
        </Grid>
      </Grid>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} security="error">
          {signInError}
        </Alert>
      </Snackbar>
    </form>
  );
}
