"use client"
import { useEffect, useState } from 'react';

export default function Status() {
  const [statusMessage, setStatusMessage] = useState('Loading...');

  return (
    <div>
      <h1 className='text-black'>user not verified</h1>
    </div>
  );
}
