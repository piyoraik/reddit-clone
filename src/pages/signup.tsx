import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button, TextField, Grid, Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { Auth } from "aws-amplify";

interface IFormInput {
  username: string;
  email: string;
  password: string;
}

export default function Signup() {
  const [open, setOpen] = useState(false);
  const [signUpError, setSignUpError] = useState<string>("");
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormInput>();

  console.log("Errors", errors);

  async function signUpWithEmailAndPassword(data: IFormInput) {
    const { username, password, email } = data;
    try {
      const { user } = await Auth.signUp({
        username,
        password,
        attributes: {
          email,
        },
      });
      console.log(user);
    } catch (error) {
      throw error;
    }
  }

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log("Submitted the form");
    console.log(data);

    try {
      signUpWithEmailAndPassword(data);
    } catch (err) {
      console.error(err);
      setSignUpError(err.message);
      setOpen(true);
    }
  };

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
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
            label="email"
            id="email"
            type="email"
            error={errors.username ? true : false}
            helperText={errors.email ? errors.email.message : null}
            {...register("email", {
              required: { value: true, message: "Please enter a valid email." },
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
              required: { value: true, message: "Please enter a password." },
              minLength: { value: 8, message: "Please enter a stronger password." },
            })}
          />
        </Grid>

        <Grid style={{ marginTop: 16 }}>
          <Button variant="contained" type="submit">
            Sign up
          </Button>
        </Grid>
      </Grid>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} security="error">
          {signUpError}
        </Alert>
      </Snackbar>
    </form>
  );
}
