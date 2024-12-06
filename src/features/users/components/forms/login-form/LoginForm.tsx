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
  const [isLoading, setIsLoading] = useState(true);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState<null | boolean>(null);
  const [user, setUser] = useState('DemoUser');
  const [password, setPassword] = useState('Demo123');
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/auth/token`
        );

        console.log(response);
        if (!response.ok) {
          return;
        }

        const data = await response.json();
        console.log(data);

        if (data.isLoggedIn) {
          setIsUserLoggedIn(true);
          router.push('/dashboard');
        } else {
          setIsLoading(false);
          setIsUserLoggedIn(false);
        }
        setIsUserLoggedIn(false);
      } catch (error) {
        console.error('Error validating token:', error);
      }
    };

    fetchData();
  }, [router]);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.type === 'text') {
      setUser(e.target.value);
    } else {
      setPassword(e.target.value);
    }
  };

  async function handleSubmit(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    event.preventDefault();

    setIsLoading(true);

    const submitFormBody: TSubmitFormBody = {
      password: password,
    };

    if (typeof user === 'string' && user.includes('@')) {
      submitFormBody.email = user;
    } else {
      submitFormBody.username = user;
    }

    try {
      SubmitFormSchema.parse(submitFormBody); // z validation if any error occurred we skip the rest of the code and goe to catch bloc

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(submitFormBody),
        }
      );

      if (!response.ok) {
        throw new Error('Something went wrong');
      }

      const data = await response.json();

      if (data.status === 200) {
        router.refresh();
        router.push('/dashboard');
      } else {
        setErrorMessages({
          username: data.message,
          email: data.message,
        });

        setPassword('');
        setIsLoading(false);
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errorObj: TErrorMessages = {};
        error.issues.forEach((error) => {
          errorObj[error.path[0] as keyof TErrorMessages] = error.message;
        });

        setErrorMessages(errorObj);
        setIsLoading(false);
      }
    }
  }

  if (isLoading) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          alignItems: 'center',
          height: '100%',
          gap: '4rem',
        }}
      >
        <LoadingSpinner size={50} />
        {isUserLoggedIn && <p>Loggar in...</p>}
      </div>
    );
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

        <form className="login__form">
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

          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="login__button"
          >
            {isLoading ? <LoadingSpinner /> : 'Logga in'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
