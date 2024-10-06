"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import "./LoginForm.scss";
import Link from "next/link";
import { z } from "zod";
import AuthInput from "../authInput/AuthInput";
import Nav from "../landing-page/ui/Nav/Nav";

const SubmitFormSchema = z
  .object({
    email: z.string().email({ message: "Ogiltig e-postadress" }).optional(),
    username: z
      .string()
      .trim()
      .min(5, "Användarnamn måste vara minst 5 tecken långt")
      .optional(),
    password: z
      .string()
      .min(6, { message: "Lösenordet måste vara minst 6 tecken långt" }),
  })
  .refine((data) => data.username || data.email, {
    message: "Användarnamn eller e-post måste anges",
    path: ["username", "email"],
  });

type TSubmitFormBody = z.infer<typeof SubmitFormSchema>;
type TErrorMessages = {
  username?: string;
  email?: string;
  password?: string;
};

function LoginForm() {
  const [errorMessages, setErrorMessages] = useState<TErrorMessages>({});
  const [user, setUser] = useState("robinnguyen");
  const [password, setPassword] = useState("papimami");
  const router = useRouter();

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.type === "text") {
      setUser(e.target.value);
    } else {
      setPassword(e.target.value);
    }
  };

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const submitFormBody: TSubmitFormBody = {
      password: password,
    };

    if (typeof user === "string" && user.includes("@")) {
      submitFormBody.email = user;
    } else {
      submitFormBody.username = user;
    }

    try {
      SubmitFormSchema.parse(submitFormBody); // z validation if any error occurred we skip the rest of the code and goe to catch bloc

      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submitFormBody),
      });

      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      const data = await response.json();

      if (data.status !== 200) {
        setErrorMessages({
          username: data.message,
          email: data.message,
        });
        setPassword("");
      } else {
        router.push("/dashboard");
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errorObj: TErrorMessages = {};
        error.issues.forEach((error) => {
          errorObj[error.path[0] as keyof TErrorMessages] = error.message;
        });

        setErrorMessages(errorObj);
      }
    }
  }

  return (
    <>
      <Nav />
      <div className="login">
        <div className="login__container">
          <div className="login__heading">
            <h2>Logga in</h2>
            <p>
              Har du inget konto?{" "}
              <Link
                href="/auth/signup"
                style={{
                  textDecoration: "underline",
                  color: "green",
                  fontWeight: "bold",
                }}
              >
                Skapa konto
              </Link>
            </p>
          </div>

          <form className="login__form" onSubmit={handleSubmit}>
            <AuthInput
              htmlFor="text"
              labelText="E-post/Användarnamn"
              type="text"
              name="text"
              placeholder="användarnamn"
              errorMessage={errorMessages.email || errorMessages.username || ""}
              onChange={handleOnChange}
              value={user}
            />

            <AuthInput
              htmlFor="password"
              labelText="Lösenord"
              type="password"
              name="password"
              placeholder="******"
              errorMessage={errorMessages.password || ""}
              onChange={handleOnChange}
              value={password}
            />

            <button type="submit" className="login__button">
              Logga in
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default LoginForm;
