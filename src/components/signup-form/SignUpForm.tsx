"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import "./SignUpForm.scss";
import Link from "next/link";
import { z } from "zod";
import AuthInput from "../authInput/AuthInput";
import Nav from "../landing-page/Nav/Nav";

const SignUpFormSchema = z
  .object({
    email: z.string().email({ message: "Ogiltig e-postadress" }),
    username: z
      .string()
      .trim()
      .min(5, { message: "Användarnamn måste vara minst 5 tecken långt" }),
    password: z
      .string()
      .min(6, { message: "Lösenordet måste vara minst 6 tecken långt" }),
    confirmPassword: z
      .string()
      .min(6, { message: "Lösenordet måste vara minst 6 tecken långt" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Lösenorden matchar inte",
    path: ["confirmPassword"],
  })
  .superRefine((data, ctx) => {
    const regex = new RegExp(/^[a-zA-Z0-9_]{3,20}$/);
    const isUsernameValid = regex.test(data.username);
    if (!isUsernameValid) {
      ctx.addIssue({
        type: "number",
        code: z.ZodIssueCode.too_big,
        maximum: 20,
        inclusive: true,
        message:
          "Användarnamnet har ogiltigt format. Använd endast bokstäver, siffror och understreck",
        path: ["username"],
      });
    }
  });

type TSubmitFormBody = z.infer<typeof SignUpFormSchema>;

type TErrorMessages = {
  username?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
};

function SignUpForm() {
  const [form, setForm] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [errorMessages, setErrorMessages] = useState<TErrorMessages>({});
  const router = useRouter();

  const validateField = (name: string, value: string) => {
    const partialData = { ...form, [name]: value };
    const zodValidation = SignUpFormSchema.safeParse(partialData);

    if (!zodValidation.success) {
      const error =
        zodValidation.error.formErrors.fieldErrors[
          name as keyof TErrorMessages
        ];

      setErrorMessages((prev) => ({
        ...prev,
        [name]: error ? error[0] : "",
      }));
    } else {
      setErrorMessages((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const submitFormBody: TSubmitFormBody = form;

    try {
      SignUpFormSchema.parse(submitFormBody);

      const response = await fetch("http://localhost:3000/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submitFormBody),
      });

      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      const data = await response.json();

      // user could not be created
      if (data.status !== 201) {
        switch (data.signup_info) {
          case "email_and_username_taken":
            setErrorMessages({
              username: data.message,
              email: data.message,
            });
            break;
          case "username_taken":
            setErrorMessages({
              username: data.message,
            });
            break;
          case "email_taken":
            setErrorMessages({
              email: data.message,
            });
            break;
          default:
            break;
        }
      } else {
        router.push("/dashboard");
      }

      console.log("data response", data);
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
  console.log(errorMessages);
  return (
    <>
      <Nav />
      <div className="signup">
        <div className="signup__container">
          <div className="signup__heading">
            <h2>Skapa konto</h2>
            <p>
              Har du redan ett konto?{" "}
              <Link
                href="/auth/login"
                style={{
                  textDecoration: "underline",
                  color: "green",
                  fontWeight: "bold",
                }}
              >
                Logga in
              </Link>
            </p>
          </div>

          <form className="signup__form" onSubmit={handleSubmit}>
            <AuthInput
              htmlFor="email"
              labelText="E-post"
              type="email"
              name="email"
              placeholder="exempel@exempel.com"
              value={form.email}
              onChange={handleOnChange}
              errorMessage={errorMessages.email || ""}
            />

            <AuthInput
              htmlFor="text"
              labelText="Användarnamn"
              type="text"
              name="username"
              placeholder="användarnamn"
              value={form.username}
              onChange={handleOnChange}
              errorMessage={errorMessages.username || ""}
            />

            <AuthInput
              htmlFor="password"
              labelText="Lösenord"
              type="password"
              name="password"
              placeholder="******"
              value={form.password}
              onChange={handleOnChange}
              errorMessage={errorMessages.password || ""}
            />

            <AuthInput
              htmlFor="password"
              labelText="Bekräfta lösenord"
              type="password"
              name="confirmPassword"
              placeholder="******"
              value={form.confirmPassword}
              onChange={handleOnChange}
              errorMessage={errorMessages.confirmPassword || ""}
            />

            <button type="submit" className="signup__button">
              Skapa konto
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default SignUpForm;
