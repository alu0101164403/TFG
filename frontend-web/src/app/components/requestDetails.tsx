"use client";

import { AuthContext } from "@/context/auth.context";
import { RequestDataReceive } from "@/services/request.services";
import TransactionService, { DataTransaction } from "@/services/transaction.services";
import { useContext } from "react";


export default function RequestDetailsModals ({ isOpen, onClose, request }:{ isOpen: boolean, onClose: () => void, request: RequestDataReceive | null}) {
  if (!isOpen || !request) return null;
  const {user, updateUser, isLoggedIn} = useContext(AuthContext);

  const acceptRequest = async () => {
    if (!isLoggedIn) {
      return;
    }
    const data:DataTransaction = {
      buyer: user,
      sellerId: request.owner.id,
      requestId: request._id,
    };
    const userUpdated = await TransactionService.buy(data);
    updateUser(userUpdated);
    onClose();
  };
  
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 overflow-y-auto">
      <div className="bg-white p-6 rounded-lg w-3/4">
        <div className="max-w-7xl gap-x-8 px-8">
          <div className="pr-4 pl-24">
            <p className="text-base font-semibold leading-7 text-indigo-600">Publicado {request.date.slice(0, 10)}</p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{request.title}</h1>
            <p className="mt-6 text-xl text-gray-700">
              {request.description}
            </p>
          </div>
        </div>
        <div className="grid max-w-7xl gap-x-8 px-8">
          <div className="pr-4 pl-24">
            <h1 className="mt-2 text-base font-bold tracking-tight text-gray-900 sm:text-4xl">{request.owner.username}</h1>
            <div className="flex flex-row">
              {Array.from({ length: 5 }).map((_, index) => (
                <img
                className="hidden h-5 w-auto lg:block"
                src="/icons8-estrella-50.png"
                alt="Your Company"
              />
              ))}
            </div>
            <p className="mt-6 text-xl text-gray-700">Coste {request.price}
            <img
              className="hidden h-5 w-auto lg:block"
              src="/monedaSinFondo.png"
              alt="Your Company"
            />
            </p>
          </div>
        </div>
        <div className="flex justify-end mt-6">
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