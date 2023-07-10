"use client";

import { useContext, useEffect, useState } from "react";
import {AuthContext} from '../../context/auth.context';
import Link from "next/link";
import { useRouter } from "next/navigation";
import {RequestService, RequestDataReceive} from "@/services/request.services";
import RequestsByUser from "../components/requestsByUser";

export default function Profile() {
  const router = useRouter();
  const {user, logout} = useContext(AuthContext);
  const [allRequest, setAllRequest] = useState<RequestDataReceive[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  let countRequests = 0, countOfferts = 0;

  useEffect(() => {
    if (!user) {
      router.push('/Login');
    }
  }, [user, router]);
  
  useEffect(() => {
    if (user) {
      RequestService.getRequestsUser(user.id).then(data => {
        setAllRequest(data.data);
      }).catch(err => {
        return err;
      });
    } else {
      console.log('No hay usuarios autenticados')
    }
    
  }, [user]);

  const count = () => {
    countRequests = 0, countOfferts = 0;
    allRequest.forEach((request) => {
      if (request)
        request.type === 'offer' ? countOfferts++ : countRequests++;
    });
  }

  if (allRequest.length > 0) count();

  const handleLogout = () => {
    logout();
    router.push('Login');
  };

  if (!user) {
    return null; // Evita renderizar el contenido del perfil si no hay usuario autenticado
  }
  return (
    <div className="flex min-h-full flex-1 flex-col items-center justify-center mx-6 my-6 px-6 py-10">
      <div className="flex items-center justify-center mx-4 my-4">
        <img
          src="/user1.jpg"
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
          <Link className="text-cyan-700 text-base mx-2" href="/Wallet">Mi cartera</Link>
          <p className="text-gray-600 text-base mx-2">{user.wallet.coins}</p>
        </div>
        <img
          src="/monedaSinFondo.png"
          alt="Moneda imagen"
          className="w-7 h-7 rounded-full"
        />
      </div>

      <div className="columns-2 justify-center mt-16 mb-6 ">
        <div className="items-center mx-10">
          <div className="flex items-center ml-4">
            <button className="text-stone-900 text-base mx-2">Respuesta solicitudes</button>
            <p className="text-stone-900 text-base mx-2">0</p>
          </div>
          <div className="flex items-center ml-4">
            <button className="text-stone-900 text-base mx-2">Respuesta peticiones</button>
            <p className="text-stone-900 text-base mx-2">2</p>
          </div>
        </div>
        <div className="items-center mx-10">
          <div className="flex items-center ml-4">
            <button className="text-stone-900 text-base mx-2" onClick={() => setIsModalOpen(true)}>Solicitudes activas</button>
            <p className="text-stone-900 text-base mx-2">{countOfferts}</p>
          </div>
          <div className="flex items-center ml-4">
            <button className="text-stone-900 text-base mx-2" onClick={() => setIsModalOpen(true)}>Peticiones activas</button>
            <p className="text-stone-900 text-base mx-2">{countRequests}</p>
          </div>
        </div>
      </div>
      <RequestsByUser isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} requests={allRequest} title={'Tus solicitudes activas'}/>
    </div>
  )
}