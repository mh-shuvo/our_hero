import React from 'react';
import { Link } from 'react-router-dom';
import ikbal from '../images/ikbal.jpeg'
function OurHeros() {
    // Sample data for hero cards
    const heroData = [
        {
            id: 1,
            slug:"md-ikbal",
            name: 'MD Ikbal',
            image: ikbal, // Sample image URL
            dod: "24-05-2024"
        },
        {
            id: 2,
            slug:"luto-nan",
            name: 'Luto Nan',
            image: 'https://via.placeholder.com/150', // Sample image URL
            dod: "24-05-2024"
        },
    ];

    return (
        <div className="min-h-screen bg-white overflow-hidden">
            <div className="py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-extrabold text-gray-900">Our Heroes</h1>
                    <div className="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        {heroData.map(hero => (
                            <div key={hero.id} className="group relative bg-white rounded-lg shadow-sm overflow-hidden group-hover:shadow-lg transition duration-300 ease-in-out m-2">
                                <img src={hero.image} alt={hero.name} className="w-full h-auto object-cover object-center" />
                                <div className='flex justify-between'>
                                    <div className="px-4 py-2">
                                        <h3 className="text-lg font-semibold text-gray-900">{hero.name}</h3>
                                        <p className="text-sm text-gray-500" title='Date of Death'>DOD: {hero.dod}</p>
                                    </div>
                                    <div className="py-2">
                                        <Link to={`/heros/`+hero.slug}>
                                            <button className="bg-indigo-500 text-white mt-1 py-1 px-2 rounded-lg shadow-sm hover:bg-indigo-600 transition duration-300 ease-in-out">Details</button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OurHeros;
