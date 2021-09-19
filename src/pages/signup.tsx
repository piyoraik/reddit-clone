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
  email: string;
  password: string;
  code: string;
}

export default function Signup() {
  // eslint-disable-next-line no-unused-vars
  const { user, setUser } = useUser();
  const router = useRouter();
  const [showCode, setShowCode] = useState(false);
  const [open, setOpen] = useState(false);
  const [signUpError, setSignUpError] = useState<string>("");
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormInput>();

  console.log("hooks,user: ", user);

  async function signUpWithEmailAndPassword(
    data: IFormInput
  ): Promise<CognitoUser> {
    const { username, password, email } = data;
    try {
      const { user } = await Auth.signUp({
        username,
        password,
        attributes: {
          email,
        },
      });
      console.log("Signed up a user:", user);
      return user;
    } catch (error) {
      throw error;
    }
  }

  async function confirmSignUp(data: IFormInput) {
    const { username, password, code } = data;
    try {
      await Auth.confirmSignUp(username, code);
      const amplifyUser = await Auth.signIn(username, password);
      console.log("Success, singed in a user", amplifyUser);
      if (amplifyUser) {
        router.push("/");
      } else {
        throw new Error("Something went wrong ");
      }
    } catch (err) {
      console.error("error confirming sign up", err);
    }
  }

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      if (showCode) {
        confirmSignUp(data);
      } else {
        await signUpWithEmailAndPassword(data);
        setShowCode(true);
      }
    } catch (err) {
      setSignUpError(err.message);
      setOpen(true);
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
      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
        spacing={1}
      >
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
              minLength: {
                value: 3,
                message: "Please enter a username between 3-16 characters.",
              },
              maxLength: {
                value: 16,
                message: "Please enter a username between 3-16 characters.",
              },
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
              required: { value: true, message: "Please enter a code" },
              minLength: {
                value: 8,
                message: "Your verification is 6 characters long.",
              },
            })}
          />
        </Grid>

        {showCode && (
          <Grid item>
            <TextField
              variant="outlined"
              label="Verification Code"
              id="code"
              type="text"
              error={errors.code ? true : false}
              helperText={errors.code ? errors.code.message : null}
              {...register("code", {
                required: { value: true, message: "Please enter a code." },
                minLength: {
                  value: 6,
                  message: "Please enter a username between 3-16 characters.",
                },
                maxLength: {
                  value: 6,
                  message: "Please enter a username between 3-16 characters.",
                },
              })}
            />
          </Grid>
        )}

        <Grid style={{ marginTop: 16 }}>
          <Button variant="contained" type="submit">
            {showCode ? "Confirm Code" : "Sign up"}
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
