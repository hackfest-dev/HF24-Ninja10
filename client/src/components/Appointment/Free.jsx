// import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';

const Free = () => {
  return (
    <div
      className="relative block overflow-hidden rounded-lg bg-blue-100"
      style={{
        height: '150%',
        width: 'calc(50% - 8px)',
        marginTop: '20px',
        marginBottom: '20px',
      }}
    >
      <div className="px-6 py-12 rounded-lg mb-4">
        <div className="font-bold text-xl mb-4">Free Appointment</div>

        <div className="text-gray-700 text-base flex items-start mb-2">
          <FontAwesomeIcon
            icon={faCheckCircle}
            className="text-green-600 mr-2"
          />
          Guaranteed checkup
        </div>

        <div className="text-gray-700 text-base flex items-start mb-2">
          <FontAwesomeIcon
            icon={faCheckCircle}
            className="text-green-600 mr-2"
          />
          Expert Consultation
        </div>

        <div className="text-gray-700 text-base flex items-start mb-2">
          <FontAwesomeIcon icon={faTimesCircle} className="text-red-600 mr-2" />
          Personalized Treatment Plans
        </div>

        <div className="text-gray-700 text-base flex items-start mb-2">
          <FontAwesomeIcon
            icon={faCheckCircle}
            className="text-green-600 mr-2"
          />
          Comprehensive Care:
        </div>

        <div className="text-gray-700 text-base flex items-start mb-2">
          <FontAwesomeIcon icon={faTimesCircle} className="text-red-600 mr-2" />
          Quick response
        </div>

        <div className="text-gray-700 text-base flex items-start">
          <FontAwesomeIcon icon={faTimesCircle} className="text-red-600 mr-2" />
          Your choice of Doctor
        </div>
        <br />
        <button className="group inline-block rounded bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 p-[2px] hover:text-white focus:outline-none focus:ring active:text-opacity-75">
          <span className="block rounded-sm bg-white px-8 py-3 text-sm font-medium group-hover:bg-transparent">
            Proceed
          </span>
        </button>
      </div>
    </div>
  );
};

export default Free;
