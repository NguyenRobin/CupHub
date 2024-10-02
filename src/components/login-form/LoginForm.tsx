"use client";

import { FormEvent } from "react";
import { useRouter } from "next/navigation";
import "./LoginForm.scss";
import Link from "next/link";

type TBody = {
  username?: string;
  email?: string;
  password: string;
};
function LoginForm() {
  const router = useRouter();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const accountType = formData.get("text") as string;
    const password = formData.get("password") as string;

    const body: TBody = {
      password: password,
    };

    if (typeof accountType === "string" && accountType.includes("@")) {
      body.email = accountType;
    } else {
      body.username = accountType;
    }

    console.log(body);

    const response = await fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error("Something went wrong");
    }

    const data = await response.json();
    console.log(data);

    // if (response.ok) {
    //   router.push("/dashboard");
    // } else {
    //   // Handle errors
    // }
  }

  return (
    <div className="login">
      <div className="login__container">
        <div className="login__heading">
          <h2>Logga in</h2>
          <p>
            Har du inget konto?{" "}
            <Link href="/auth/signup" style={{ textDecoration: "underline" }}>
              Skapa konto
            </Link>
          </p>
        </div>

        <form className="login__form" onSubmit={handleSubmit}>
          <label htmlFor="text">E-post/Användarnamn</label>
          <input
            type="text"
            name="text"
            className="login__input"
            placeholder="example@example.com"
            required
          />
          <label htmlFor="password">Lösenord</label>
          <input
            type="password"
            name="password"
            className="login__input"
            placeholder="*********"
            required
          />
          <button type="submit" className="login__button">
            Logga in
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
