"use client";

import Link from 'next/link'
import { Disclosure } from '@headlessui/react'

import {AuthContext} from '../../context/auth.context';
import { useContext } from 'react';

export default function Nav() {
  const {isLoggedIn} = useContext(AuthContext);

  return (
    <header className='fixed top-0 left-0 w-full z-50'>
      <Disclosure as="nav" className="bg-neutral-400">
        <div className="mx-auto max-w-7xl px2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex flex-shrink-0 items-center">
                <img
                  className="hidden h-8 w-auto lg:block"
                  src="/logoSFtfg.png"
                  alt="Your Company"
                />
              </div>
              <div className="hidden sm:ml-6 sm:block">
                <div className="flex space-x-4">
                  <Link
                    href='/'
                    className='text-black'
                  >
                    Home
                  </Link>
                  {
                    !isLoggedIn && 
                      <><Link
                      href='/Login'
                      className='text-black'
                    >
                      Iniciar sesión
                    </Link><Link
                      href='/Register'
                      className='text-black'
                    >
                        Registrarse
                      </Link></>
                  }
                  {
                    isLoggedIn &&
                    <><Link
                      href='/Profile'
                      className='text-black'
                    >
                      Tu Perfil
                    </Link></>
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </Disclosure>
    </header>
    
  )
}
