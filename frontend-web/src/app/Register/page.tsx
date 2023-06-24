"use client";

import Image from 'next/image'
import Link from 'next/link'
import {Auth, UserData} from '../../services/auth-services';
import { useState } from 'react';
import { useRouter } from 'next/navigation';


export default function Register() {
  const router = useRouter();
  
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState("");
  const [credentialError, setCredentialError] = useState("");
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const handlePasswordChange = (event: { target: { value: any; }; }) => {
    const value = event.target.value;
    setPassword(value);
    setPasswordError(validatePassword(value));
  };

  const validatePassword = (password: string) => {
    // minimo 5 caracteres, sin espacios, al menos una mayuscula, una minuscula y un numero
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{5,}$/;
    if (!passwordRegex.test(password)) {
      return "La contraseña debe tener al menos 5 caracteres, una mayúscula, una minúscula y un número.";
    }
    return "";
  };

  const handleCredential = (event: { target: { value: any; }; }) => {
    const value = event.target.value;
    setCredential(value);
    validateCredential(value);
  };

  const validateCredential = (credential: string) => {
    const credentialRegex = /^alu\d{10}$/;
    if (!credentialRegex.test(credential)) {
      setCredentialError("La credencial no es correcta. 'alu0000000000");
    } else {
      setCredentialError("");
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const repeatPassword = formData.get('passwordRepeat');

    if (password !== repeatPassword) {
      setPasswordError("Las contraseñas no coinciden.");
      return;
    }
    validateCredential(credential);
    if (credentialError === "" && passwordError === "") {
      const data: UserData = {
        username: username,
        email: email,
        credential: credential,
        password: password,
      };
      Auth.register(data).then( () => {
        router.push('/Login');
      }).catch(_err => {
        console.log(_err);
      });
    }
    setIsFormSubmitted(true);
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          {/* <Image
            className="mx-auto"
            src={"/logoSFtfg.png"}
            alt="logoApp"
            width={100}
            height={24}
          /> */}
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Regístrate</h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#" method="POST" onSubmit={handleSubmit}>
            <div className="sm:col-span-3">
              <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                Nombre de usuario
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="username"
                  id="username"
                  autoComplete="username"
                  onChange={event => setUsername(event.target.value)}
                  className="block w-full rounded-full border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email 
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  onChange={event => setEmail(event.target.value)}
                  className="block w-full rounded-full border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="credential" className="block text-sm font-medium leading-6 text-gray-900">
               Credencial
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="credential"
                  id="credential"
                  autoComplete="credential"
                  value={credential}
                  onChange={handleCredential}
                  className="block w-full rounded-full border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              {credentialError && (
                <p className="text-red-500 text-sm mt-1">{credentialError}</p>
              )}
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Contraseña
                </label>
                <div className="text-sm">
                  <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                    ¿Olvidaste tu contraseña?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={handlePasswordChange}
                  className="block w-full rounded-full border-pink-600 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              {passwordError && (
                <p className="text-red-500 text-sm mt-1">{passwordError}</p>
              )}
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="passwordRepeat" className="block text-sm font-medium leading-6 text-gray-900">
                  Repite la Contraseña
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="passwordRepeat"
                  name="passwordRepeat"
                  type="password"
                  required
                  className="block w-full rounded-full border-pink-600 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-rose-400 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-rose-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                Entrar
              </button>
            </div>
          </form>
          {isFormSubmitted && (
            <p className="mt-2 text-green-500 text-sm">Se ha registrado correctamente.</p>
          )}
          <p className="mt-10 text-center text-sm text-gray-500">
            ¿Ya tienes cuenta?{' '}
            <Link href="/Login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              Inicia sesión
            </Link>
          </p>
        </div>
      </div>
    </>
  )
}