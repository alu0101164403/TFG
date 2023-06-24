"use client";

import { AuthContext } from "@/context/auth.context";
import { RequestDataReceive } from "@/services/request.services";
import TransactionService, { DataTransaction } from "@/services/transaction.services";
import { useContext } from "react";


export default function RequestDetailsModals ({ isOpen, onClose, request }: { isOpen: boolean, onClose: () => void, request: RequestDataReceive | null}) {
  if (!isOpen || !request) return null;
  const {user, updateUser, isLoggedIn} = useContext(AuthContext);

  const acceptRequest = async () => {
    const data:DataTransaction = {
      buyer: user,
      sellerId: request.owner.id,
      requestId: request._id,
    };
    const userUpdated = await TransactionService.buy(data);
    updateUser(userUpdated.data);
  };
  
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-lg max-w-md">
        <div className="w-full max-w-7xl gap-x-8 px-8">
          <div className="pr-4 pl-24">
            <p className="text-base font-semibold leading-7 text-indigo-600">Publicado {request.date.slice(0, 10)}</p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{request.title}</h1>
            <p className="mt-6 text-xl text-gray-700">
              {request.description}
            </p>
          </div>
        </div>
        <div className="w-full grid max-w-7xl gap-x-8 px-8">
          <div className="pr-4 pl-24">
            <h1 className="mt-2 text-base font-bold tracking-tight text-gray-900 sm:text-4xl">{request.owner.username}</h1>
            <p className="mt-6 text-xl text-gray-700">estrellas</p>
            <p className="mt-6 text-xl text-gray-700">Coste {request.price}
            <img
              className="hidden h-5 w-auto lg:block"
              src="/logoSFtfg.png"
              alt="Your Company"
            />
            </p>
          </div>
        </div>
        <div className="flex justify-end">
          {
            isLoggedIn && (
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                onClick={acceptRequest}
              >
                Aceptar
              </button>
            )
          }
          <button
            type="button"
            onClick={onClose}
            className="ml-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Atrás
          </button>
        </div>
      </div>
    </div>
  );
};