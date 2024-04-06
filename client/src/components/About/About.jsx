// import React from 'react';
import imageSrc from './about.jpg';

export default function About() {
  return (
    <div className="py-16 bg-white">
      <div className="container mx-auto px-6 text-gray-600">
        <div className="md:flex md:gap-6 lg:items-center lg:gap-12">
          <div className="md:w-1/3">
            <img
              src={imageSrc}
              alt="image"
              className="w-full h-auto rounded-lg shadow-md"
            />
          </div>
          <div className="md:w-1/2">
            <div className="max-w-xl mx-auto">
              <h1 className="text-3xl md:text-4xl lg:text-5xl text-gray-900 font-bold mb-8 leading-snug text-center">
                About Us
              </h1>
              <p className="text-lg text-gray-700 mb-6">
                At EquipHealth Initiative, we believe in the power of collective
                action to make a difference in the lives of those in need. Our
                mission is simple: to facilitate the donation and distribution
                of medical equipment and essential medicines to communities and
                healthcare facilities around the world.
              </p>
              <p className="text-lg text-gray-700 mb-6">
                With the generous support of donors like you, we aim to bridge
                the gap between surplus medical supplies and underserved
                populations. Whether it's hospital beds, surgical instruments,
                or life-saving medications, every donation contributes to
                improving access to quality healthcare for those who need it
                most.
              </p>
              <p className="text-lg text-gray-700 mb-6">
                Our team works tirelessly to ensure that your donations are
                efficiently collected, sorted, and distributed to where they are
                needed most. Through partnerships with local organizations and
                healthcare providers, we strive to maximize the impact of every
                contribution, reaching communities in remote areas and crisis
                zones.
              </p>
              <p className="text-lg text-gray-700 mb-6">
                Transparency and accountability are at the core of our
                operations. We are committed to keeping our donors informed
                about the impact of their contributions and how their support is
                making a difference in the lives of individuals and communities
                worldwide.
              </p>
              <p className="text-lg text-gray-700 mb-6">
                Join us in our mission to provide hope and healing through the
                gift of healthcare. Together, we can make a meaningful
                difference and create a world where access to medical resources
                is not a luxury, but a basic human right.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
