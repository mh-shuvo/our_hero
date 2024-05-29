import {React,useState,useEffect} from 'react';
import { useParams } from "react-router-dom";
import axios from "axios"

const api = process.env.REACT_APP_API;

function HeroDetails(){
    let { id } = useParams();

    const [hero, setHero] = useState(null); // Initialize with null to indicate loading

    // Fetch data using useEffect hook
    useEffect(() => {
        const fetchData = async () => {
        try {
            const response = await axios.get(api + "/heroes/single?id=" + id);
            setHero(response.data);
        } catch (error) {
            console.error(error);
        }
        };

        fetchData();
    }, [id]); // Only run when id changes

    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const handleClick = (index) => {
        setCurrentImageIndex(index);
    };
    return(
        <div className="py-8">
            <div className="max-w-3xl mx-auto">
                <div className="rounded-md shadow-lg">
                    <div className="p-6">
                        <h1 className="text-3xl font-bold mb-4 text-center">{hero?.name}</h1>
                        <div className="flex">
                            <div className="w-2/3 mr-6">
                                <img
                                    src={hero?.images[currentImageIndex]}
                                    alt={`Image ${currentImageIndex + 1}`}
                                    className="w-full h-auto object-cover rounded-md mb-4"
                                />
                            </div>
                            <div className="w-1/3 flex">
                                <div className="flex flex-wrap">

                                    {hero?.images.map((image, index) => (
                                            <img
                                                key={index}
                                                src={image}
                                                alt={`Thumbnail ${index + 1}`}
                                                className="hero-details-image-sm object-cover rounded-md cursor-pointer mb-2 mr-2"
                                                onClick={() => handleClick(index)}
                                            />
                                        ))}
                                </div>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <p><strong>Date of Death:</strong> {hero?.date_of_dead}</p>
                            <p><strong>Description:</strong> {hero?.details}</p>
                            <p><strong>Address:</strong> {hero?.address}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default HeroDetails