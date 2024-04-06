import { useState, useEffect } from 'react';
import axios from 'axios';

// https://www.hyperui.dev/components/marketing/blog-cards
function Card({ name, specialization, image, id }) {
  return (
    <article className="flex bg-white transition hover:shadow-xl" id={id}>
      <div className="hidden sm:block sm:basis-56">
        <img
          alt={name}
          src={image || 'https://via.placeholder.com/150'}
          className="aspect-square h-full w-full object-cover"
        />
      </div>

      <div className="flex flex-1 flex-col justify-between">
        <div className="border-s border-gray-900/10 p-4 sm:border-l-transparent sm:p-6">
          <a href="#">
            <h3 className="font-bold uppercase text-gray-900">{name}</h3>
          </a>

          <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-700">
            {specialization}
          </p>
        </div>

        <div className="sm:flex sm:items-end sm:justify-end">
          <a
            href="#"
            className="block bg-yellow-300 px-5 py-3 text-center text-xs font-bold uppercase text-gray-900 transition hover:bg-yellow-400"
          >
            Book Appointment
          </a>
        </div>
      </div>
    </article>
  );
}

function GetAllDoc() {
  const [doctors, setDoctors] = useState([]);

  const getData = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/doctor');
      const data = res.data.data.doctors;

      console.log(data);
      setDoctors(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {' '}
      {/* Adjust grid for desired layout */}
      {doctors.map((doctor, index) => (
        <Card
          key={doctor._id || index} // Use doctor ID if available for better key
          name={doctor.name}
          specialization={doctor.specialization || 'orthod'}
          image={doctor.image}
          id={doctor._id || index}
        />
      ))}
    </div>
  );
}

export default GetAllDoc;
