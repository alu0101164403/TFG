"use client";

import { useState } from "react";
import WarningModal from "./modalWarning";
import {RequestDataReceive, RequestService} from "@/services/request.services";

export default function RequestsByUser({ isOpen, onClose, requests, title }: { isOpen: boolean, onClose: () => void, requests: RequestDataReceive[], title: string }) {
  if (!isOpen || !requests) return null;
  const [isWarningOpen, setIsModalWarningOpen] = useState(false);
  let isDelete = false, isBlock = false;
  let message = '';

  const deleteRequest = () => {
    console.log('hola')
    message = 'Si elimina esta solicitud no podrá recuperarla, ¿Quiere continuar?';
    isDelete = true;
    setIsModalWarningOpen(true);
  }
  const blockRequest = () => {
    message = 'Si bloquea esta solicitud no podrá ser vista por otros usuarios, ¿Quiere continuar?';
    isBlock = true;
    setIsModalWarningOpen(true);
  }

  const action = (idRequest: string) => {
    if (isDelete) {
      RequestService.deleteRequestById(idRequest).then(response => {
        console.log(response)
      }).catch(error => {
        return error;
      })
    }
    if (isBlock) {

    }
    isDelete = false;
    isBlock = false;
  }
  
  return (
    <main className="min-h-screen w-full items-center justify-between">
      <div className="bg-white sm:py-5 justify-items-center">
        <div className="flex items-center justify-center">
          <p className="text-2xl font-bold tracking-tight text-gray-900">{title}</p>
        </div>
            <div className="mx-auto max-w-7xl px-6 lg:px-8 py-6">
              <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                {requests.map((request) => (
                  <article
                    key={request._id}
                    className="flex max-w-xl flex-col items-start border-r pl-5 pr-5 justify-between">
                    <div className="flex items-center gap-x-4 text-xs">
                      <time dateTime={request.date} className="text-gray-500">
                        {request.date.toString().substring(0, 10)}
                      </time>
                      <p className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600">
                        {request.type}
                      </p>
                      <button
                        type="button"
                        onClick={deleteRequest}
                        className="ml-2 py-2"
                      >
                        <img src='/deleteSymbol.svg' alt="Delete" className="w-4 h-4 mr-2" />
                      </button>
                      <button
                        type="button"
                        onClick={blockRequest}
                        className="ml-2 py-2"
                      >
                        <img src="/blockSymbol.svg" alt="Block" className="w-4 h-4 mr-2" />
                      </button>
                      <button
                        type="button"
                        className="ml-2 py-2"
                      >
                        <img src="/editSimbol.svg" alt="Edit" className="w-4 h-4 mr-2 fill-red-300 hover:fill-red-700" />
                      </button>
                    </div>
                    <div className="group relative">
                      <h3 className="flex items-center mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                        {request.title}
                        <span className="ml-2 text-rose-400">{request.price}</span>
                        <img
                          className="hidden h-5 w-auto lg:block"
                          src="/logoSFtfg.png"
                          alt="Your Company" />
                      </h3>
                      <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">{request.description}</p>
                    </div>
                    <WarningModal isOpen={isWarningOpen} onClose={() => action(request._id)} message={message} />
                  </article>
                ))}
              </div>
            </div>
            <div className="flex justify-center">
              <button
                type="button"
                onClick={onClose}
                className="ml-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Atrás
              </button>
            </div>
        { requests.length == 0 && (
          <>
            <div className="mx-auto max-w-7xl px-6 lg:px-8 py-6 ">
              <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                <p>No tiene solicitudes en este momento</p>
              </div>
            </div>
          </>
        )}
      </div>
    </main>
  )
}
