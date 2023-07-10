"use client";

import { useContext, useEffect, useState } from "react";

import {AuthContext} from '../../context/auth.context';
import TransactionService from '../../services/transaction.services';

const getRequestsUser = async (ids: string[]) => {
  let historyUser;
  try {
    historyUser = await Promise.all(
      ids.map(async (id: String) => {
        const data = await TransactionService.getTransaction(id);
        return data;
      })
    );
  } catch (err) {
    return err;
  }
  return historyUser;
}

export default async function Wallet() {
  let history;
  const {user} = useContext(AuthContext);

  if (user) {
    history = await getRequestsUser(user.wallet.history);
  } else {
    console.log('No hay usuarios conectados.')
  }
  
  return (
    <>
    {
      user && (
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
        </div>

        <div className="flex items-center justify-center mx-4 my-2">
          <div className="flex items-center ml-4">
            <p className="text-gray-600 text-base mx-2">Mi cartera</p>
            <p className="text-gray-600 text-base mx-2">{user.wallet.coins}</p>
          </div>
          <img
            src="/monedaSinFondo.png"
            alt="Moneda imagen"
            className="w-7 h-7 rounded-full"
          />
        </div>

        <table className="table-fixed mt-10">
          <thead>
            <tr>
              <th className="w-1/3 px-4 py-2 border border-gray-300">Titulo solicitud y autor</th>
              <th className="w-1/3 px-4 py-2 border border-gray-300">Fecha</th>
              <th className="w-1/3 px-4 py-2 border border-gray-300">Coste</th>
            </tr>
          </thead>
          <tbody>
            { Array.isArray(history) &&
              history.reverse().map((item: any) => {
                return (
                  <tr className="h-12" key={item._id}>
                    <td className="w-1/3 px-4 py-2">{item.title}
                      <span className="w-1/3 px-4 py-2 italic">por {item.secondPerson}</span>
                    </td>
                    <td className="w-1/3 px-4 py-2">{item.date.toString().substring(0 ,10)}</td>
                    <td className="w-1/3 px-4 py-2">{(item.type === 'initial' || item.type === 'offer') ? '+' + item.amount : '-' + item.amount}</td>
                  </tr>
                )  
            })
          }
          </tbody>
        </table>
      </div>
      )
    }
    </>
  )
}