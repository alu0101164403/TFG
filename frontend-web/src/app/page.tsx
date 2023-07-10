"use client";

import { AuthContext } from "@/context/auth.context";
import {RequestData, RequestDataReceive, RequestService} from "@/services/request.services";
import { useContext, useEffect, useState } from "react";
import FormComponent from "./components/formRequests";
import RequestDetailsModals from "./components/requestDetails";

export default function Home() {
  const {isLoggedIn} = useContext(AuthContext);
  const [allRequest, setAllRequest] = useState<RequestDataReceive[]>([]);
  const [selectedRequest, setSelectedRequest] = useState<RequestDataReceive | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchAllRequests = async () => {
      try {
        const response = await RequestService.getAllRequest();
        const data = response.data;
        setAllRequest(data);
      } catch (err) {
        console.error(err);
      }
    };
  
    fetchAllRequests();
  }, []);

  const openForm = () => {
    setIsFormOpen(true);
  };

  const handleRequestSelection = (request: RequestDataReceive) => {
    setSelectedRequest(request);
    setIsModalOpen(true);
  };

  return (
    <main className="min-h-screen items-center justify-between">
      <div className="bg-white sm:py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="top-20 z-40 bg-white sm:py-12 grid grid-cols-2 lg:px-8">
            <div className="items-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Últimos añadidos</h2>
              <p className="mt-2 text-lg leading-8 text-gray-600">
                Mira lo último agregado por tus compañeros.
              </p>
            </div>
            {
              isLoggedIn &&
              (
                <div>
                  <button className="ml-auto flex items-center" onClick={openForm}>
                    <img src='/plusicon.png' alt="" className="h-20 w-20 rounded-full bg-gray-50" />
                    <p className="">Añadir solicitud</p>
                  </button>
                  <FormComponent isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />
                </div>
              )
            }
            
          </div>
          <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {
              allRequest.length > 0 && (
                allRequest.slice(0, 10).map((request) => (
                  <article 
                    key={request._id} 
                    className="flex max-w-xl flex-col items-start border-r pl-5 pr-5 justify-between"
                    onClick={() => handleRequestSelection(request)}>
                    <div className="flex items-center gap-x-4 text-xs">
                      <time dateTime={request.date} className="text-gray-500">
                        {request.date.toString().substring(0 ,10)}
                      </time>
                      <p className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600">
                        {request.type}
                      </p>
                    </div>
                   <div className="group relative">
                      <h3 className="flex items-center mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                        {request.title}
                        <span className="ml-2 text-rose-400">{request.price}</span>
                        <img
                          className="hidden h-5 w-auto lg:block"
                          src="/monedaSinFondo.png"
                          alt="Your Company"
                        />
                      </h3>
                      <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">{request.description}</p>
                    </div> 
                    <div className="relative mt-8 flex items-center gap-x-4">
                      <img src='/avatar.png' alt="" className="h-10 w-10 rounded-full bg-gray-50" />
                      <div className="text-sm leading-6">
                        <p className="font-semibold text-gray-900">
                          {request.owner.username}
                        </p>
                      </div>
                    </div>
                  </article>
                ))
              )
            }
          </div>
          <RequestDetailsModals isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} request={selectedRequest} />
        </div>
      </div>
    </main>
  )
}
