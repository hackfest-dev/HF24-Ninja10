// import React from 'react';

function Card(props) {
  return (
    <div className="mt-6 w-96 border border-gray-200 rounded-lg overflow-hidden">
      <div className="relative h-56">
        <img
          src={props.image}
          alt="card-image"
          className="object-cover w-full h-full"
        />
      </div>
      <div className="p-4">
        <h5 className="text-lg text-gray-600 mb-2 mr-4">{props.name}</h5>
        <div className="flex justify-center items-center">
          <h5 className="text-lg text-gray-600 mb-2 mr-16">
            {props.speciality}
          </h5>
          <h5 className="text-lg text-gray-600 mb-2">{props.experience}</h5>
        </div>

        <button className="group inline-block rounded bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 p-1 hover:text-white focus:outline-none focus:ring active:text-opacity-75 w-24">
          <span className="block rounded-sm bg-white px-3 py-2 text-xs font-medium group-hover:bg-transparent">
            Book
          </span>
        </button>
      </div>
    </div>
  );
}

export default Card;
