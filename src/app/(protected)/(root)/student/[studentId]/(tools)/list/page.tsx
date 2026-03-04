import React from 'react'

export default function page({ onClose }:any) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-4 rounded shadow">
        <h2>List Section</h2>
        <p>This is the list section popup.</p>
        <button onClick={onClose} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">Close</button>
      </div>
    </div>
  )
}
