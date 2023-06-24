"use client";

import { AuthContext } from "@/context/auth.context";
import TransactionService from "@/services/transaction.services";
import { useContext } from "react";


export default function RequestDetails({route}) {
  const dataRequest = route.params.data;
  const {user, updateUser} = useContext(AuthContext);

  const acceptRequest = async () => {
    const data = {
      buyer: user,
      sellerId: dataRequest.owner.id,
      requestId: dataRequest._id,
    };
    const userUpdated = await TransactionService.buy(data);
    updateUser(userUpdated.data);
    //navigation.navigate('Profile');
  };

  return (
    <div className="relative isolate overflow-hidden bg-white px-6 py-24 sm:py-32 lg:overflow-visible lg:px-0">
      <div className="mx-auto grid max-w-2xl grid-cols-2 gap-x-8 gap-y-16 mx-0 max-w-none items-center gap-y-10">
        <div className="w-full max-w-7xl gap-x-8 px-8">
          <div className="pr-4 pl-24">
            <p className="text-base font-semibold leading-7 text-indigo-600">Publicado {dataRequest.date.slice(0, 10)}</p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{dataRequest.title}</h1>
            <p className="mt-6 text-xl text-gray-700">
              {dataRequest.description}
            </p>
          </div>
        </div>
        <div className="w-full grid max-w-7xl gap-x-8 px-8">
          <div className="pr-4 pl-24">
            <h1 className="mt-2 text-base font-bold tracking-tight text-gray-900 sm:text-4xl">{dataRequest.owner.username}</h1>
            <p className="mt-6 text-xl text-gray-700">estrellas</p>
            <p className="mt-6 text-xl text-gray-700">Coste {dataRequest.price}</p>
          </div>
        </div>
      </div>
    </div>
  )
}