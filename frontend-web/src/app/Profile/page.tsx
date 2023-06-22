"use client";

import { useContext, useEffect } from "react";
import {AuthContext} from '../../context/auth.context';
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Profile() {
  const router = useRouter();
  const {user, logout} = useContext(AuthContext);

  useEffect(() => {
    if (!user && router.pathname !== "/Login") {
      router.push('/Login');
    }
  }, [user, router]);
  
  const handleLogout = () => {
    logout();
  };
  if (!user) {
    return null; // Evita renderizar el contenido del perfil si no hay usuario autenticado
  }
  return (
    <div className="flex min-h-full flex-1 flex-col items-center justify-center mx-6 my-6 px-6 py-10">
      <div className="flex items-center justify-center mx-4 my-4">
        <img
          src="/avatar.png"
          alt="Imagen de perfil"
          className="w-28 h-28 rounded-full"
        />
        <div className="ml-4">
          <h1 className="text-2xl font-bold">{user.username}</h1>
          <p className="text-gray-500">{user.email}</p>
        </div>
        <div className="flex flex-col ml-6">
          <button className="text-stone-400 mb-4">Ajustes de la cuenta</button>
          <button className="text-stone-400">Opciones</button>
        </div>
        <div className="flex flex-col ml-6">
          <button className="text-stone-400 mb-4">Opciones</button>
          <button className="text-cyan-700" onClick={handleLogout}>Cerrar Sesión</button>
        </div>
      </div>

      <div className="flex items-center justify-center mx-4 my-2">
        <div className="flex items-center ml-4">
          <Link className="text-gray-600 text-base mx-2" href="/Wallet">Mi cartera</Link>
          <p className="text-gray-600 text-base mx-2">{user.wallet.coins}</p>
        </div>
        <img
          src="/logoSFtfg.png"
          alt="Moneda imagen"
          className="w-7 h-7 rounded-full"
        />
      </div>

      <div className="columns-2 justify-center mt-16 mb-6 ">
        <div className="items-center mx-10">
          <div className="flex items-center ml-4">
            <p className="text-stone-900 text-base mx-2">Respuesta solicitudes</p>
            <p className="text-stone-900 text-base mx-2">0</p>
          </div>
          <div className="flex items-center ml-4">
            <p className="text-stone-900 text-base mx-2">Respuesta peticiones</p>
            <p className="text-stone-900 text-base mx-2">2</p>
          </div>
        </div>
        <div className="items-center mx-10">
          <div className="flex items-center ml-4">
            <p className="text-stone-900 text-base mx-2">Solicitudes activas</p>
            <p className="text-stone-900 text-base mx-2">3</p>
          </div>
          <div className="flex items-center ml-4">
            <p className="text-stone-900 text-base mx-2">Peticiones activas</p>
            <p className="text-stone-900 text-base mx-2">1</p>
          </div>
        </div>
      </div>
    </div>
  )
}