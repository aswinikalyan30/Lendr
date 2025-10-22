import React from 'react'
import './App.css'

// App now acts as a minimal layout wrapper. Route contents are provided by router.jsx.
export default function App({ children }) {
  return (
    <div>
      <header style={{padding:10, borderBottom:'1px solid #eee'}}>
        <h1>Lendr</h1>
      </header>
      <main style={{padding:20}}>{children}</main>
    </div>
  )
}
