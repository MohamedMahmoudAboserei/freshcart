import React, { useEffect, useState } from 'react'
import classes from './Brands.module.css'
import axios from 'axios'
import Loader from '../Loader/Loader'
import BackStep from '../BackStep/BackStep'

export default function Brands() {
    useEffect(() => {
        document.title = 'Brands'
    })
    const [brand, setBrand] = useState([])
    const [error, setError] = useState(null)
    const [isLoader, setIsLoader] = useState(false)
    const [searchTerm, setSearchTerm] = useState('');

    const [selectedBrandId, setSelectedBrandId] = useState(null);
    const [selectedBrand, setSelectedBrand] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    async function getBrands() {
        setIsLoader(true)
        try {
            const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/brands`);
            setBrand(data.data);
        } catch (error) {
            setError(error.data.message)
        } finally {
            setIsLoader(false)
        }
    }
    const openBrand = async (brandId) => {
        try {
            const response = await axios.get(`https://ecommerce.routemisr.com/api/v1/brands/${brandId}`);
            setSelectedBrand(response.data.data);
            setSelectedBrandId(brandId);
            setIsModalOpen(true);
        } catch (error) {
            console.error('Error fetching brand details:', error);
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        getBrands();
    }, [])

    return <>
        <div className='container mx-auto mb-20'>
            <BackStep />
            <h2 className='text-4xl font-bold text-emerald-500'>Brands</h2>
            {
                isLoader ? <div className='flex justify-center py-16'>
                    <Loader />
                </div>
                    :
                    <div className="row flex flex-wrap justify-center">
                        {
                            brand.map((brand, index) => (
                                <div key={index} onClick={() => openBrand(brand._id)} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-4">
                                    <div className="rounded-2xl overflow-hidden cursor-pointer shadow-lg hover:shadow-gray-400 transition-shadow duration-300">
                                        <img
                                            src={brand?.image}
                                            className="w-full h-40 object-contain"
                                            alt={brand?.name}
                                        />
                                        <p className="text-center text-xl text-main mt-2">{brand?.name}</p>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
            }
            {isModalOpen && selectedBrand && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white w-1/2 rounded-lg p-6 relative">
                        <button
                            className="absolute top-4 right-5 text-gray-500"
                            onClick={closeModal}
                        >
                            <i className="fa fa-times text-4xl"></i>
                        </button>
                        <div className="flex items-center justify-around">
                            <div>
                                <h2 className="text-3xl font-bold text-green-600">{selectedBrand.name}</h2>
                                <p className="text-sm text-gray-400 mt-2">{selectedBrand.name}</p>
                            </div>
                            <img
                                className=" w-80 object-contain"
                                src={selectedBrand.image}
                                alt={selectedBrand.name}
                            />
                        </div>
                        <button
                            className="mt-4 bg-main text-white px-4 py-2 rounded-md"
                            onClick={closeModal}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    </>
}