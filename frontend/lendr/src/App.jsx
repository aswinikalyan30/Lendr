import React from 'react'
import './App.css'

// App now acts as a minimal layout wrapper. Route contents are provided by router.jsx.
export default function App({ children }) {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  
  return (
    <div className="min-h-screen w-full">
      <header className="bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800 shadow-sm w-full fixed top-0 left-0 right-0 z-50">
        <div className="flex items-center justify-between px-6 py-4 w-full max-w-full">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primary-blue rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">L</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">Lendr</h1>
                <p className="text-xs text-neutral-600 dark:text-neutral-400">Desmond University</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {user.name && (
              <>
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-medium text-neutral-800 dark:text-neutral-200">{user.name}</p>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 capitalize">{user.role?.toLowerCase()}</p>
                </div>
                <div className="w-10 h-10 bg-gradient-to-br from-primary-blue to-light-blue rounded-full flex items-center justify-center text-white font-semibold">
                  {user.name.charAt(0).toUpperCase()}
                </div>
              </>
            )}
          </div>
        </div>
      </header>
      <main className="pt-[73px] w-full">{children}</main>
    </div>
  )
}
