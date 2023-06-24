"use client";

import './globals.css'
import { Inter } from 'next/font/google'

import Nav from './components/Nav'
import AuthProvider from '@/provider/auth-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Aplicación intercambio recursos estudiantes',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthProvider>
      <html lang="en">
        <body className={inter.className}>
            <Nav/>
          {children}
        </body>
      </html>
    </AuthProvider>
  )
}
