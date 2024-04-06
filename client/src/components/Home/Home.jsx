// import React from 'react'
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="mx-auto w-full max-w-7xl">
      <h1 className="text-center text-3xl md:text-3xl lg:text-4xl text-gray-900 font-bold mb-8 leading-snug">
        <span className="text-blue-500">We can't help everyone,</span> but{' '}
        <span className="text-green-500">everyone can help someone.</span>
      </h1>

      <div className="grid place-items-center sm:mt-20">
        <img
          className="sm:w-full w-48 h-full object-cover"
          src="https://images.pexels.com/photos/6646768/pexels-photo-6646768.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt="image2"
        />
      </div>
    </div>
  );
}
