'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import './LoginForm.scss';
import Link from 'next/link';
import { z } from 'zod';
import NavBar from '../../../../../components/landing-page/ui/NavBar/NavBar';
import AuthInput from '../../../../../components/ui/authInput/AuthInput';
import LoadingSpinner from '../../../../../components/ui/loading-spinner/LoadingSpinner';

const SubmitFormSchema = z
  .object({
    email: z.string().email({ message: 'Ogiltig e-postadress' }).optional(),
    username: z
      .string()
      .trim()
      .min(5, 'Användarnamn måste vara minst 5 tecken långt')
      .optional(),
    password: z
      .string()
      .min(6, { message: 'Lösenordet måste vara minst 6 tecken långt' }),
  })
  .refine((data) => data.username || data.email, {
    message: 'Användarnamn eller e-post måste anges',
    path: ['username', 'email'],
  });

type TSubmitFormBody = z.infer<typeof SubmitFormSchema>;
type TErrorMessages = {
  username?: string;
  email?: string;
  password?: string;
};

function LoginForm() {
  const [errorMessages, setErrorMessages] = useState<TErrorMessages>({});
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState('DemoUser');
  const [password, setPassword] = useState('Demo123');
  const router = useRouter();

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.type === 'text') {
      setUser(e.target.value);
    } else {
      setPassword(e.target.value);
    }
  };

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setIsLoading(true);
    setErrorMessages({});

    const submitFormBody: TSubmitFormBody = {
      password: password,
    };

    if (typeof user === 'string' && user.includes('@')) {
      submitFormBody.email = user;
    } else {
      submitFormBody.username = user;
    }

    try {
      SubmitFormSchema.parse(submitFormBody); // zod-validation

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(submitFormBody),
        }
      );

      const data = await response.json();

      if (data.isAuthenticated) {
        router.push('/dashboard');
      } else {
        setErrorMessages({
          username: data.message,
          email: data.message,
        });
        setPassword('');
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errorObj: TErrorMessages = {};
        error.issues.forEach((issue) => {
          errorObj[issue.path[0] as keyof TErrorMessages] = issue.message;
        });
        setErrorMessages(errorObj);
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="login">
      <NavBar />

      <div className="login__container">
        <div className="login__heading">
          <h2>Logga in</h2>
          <p>
            Har du inget konto? <Link href="/signup">Skapa konto</Link>
          </p>
        </div>

        <form className="login__form" onSubmit={(e) => handleSubmit(e)}>
          <AuthInput
            htmlFor="text"
            labelText="E-post/Användarnamn"
            type="text"
            name="text"
            placeholder="användarnamn"
            errorMessage={errorMessages.email || errorMessages.username || ''}
            onChange={handleOnChange}
            value={user}
          />

          <AuthInput
            htmlFor="password"
            labelText="Lösenord"
            type="password"
            name="password"
            placeholder="******"
            errorMessage={errorMessages.password || ''}
            onChange={handleOnChange}
            value={password}
          />

          <button disabled={isLoading} className="login__button">
            {isLoading ? <LoadingSpinner /> : 'Logga in'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
