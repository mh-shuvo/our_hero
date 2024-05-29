import {React,useState} from "react";
import { useParams } from "react-router-dom";

function HeroDetails(){
    let {slug} = useParams()
    const personData = {
        images: [
            { url: 'https://images.unsplash.com/photo-1464746133101-a2c3f88e0dd9?q=80&w=1000' },
            { url: 'https://images.unsplash.com/photo-1714828099291-3df2c0b3d948?q=80&w=1000' },
            { url: 'https://images.unsplash.com/photo-1644806194626-ed4dd96b39ac?q=80&w=1000' },
        ],
        name: 'John Doe',
        dateOfDeath: 'January 1, 2020',
        description: 'John Doe was a beloved member of the community...',
        address: '123 Main St, Anytown, USA'
    };

    const { images, name, dateOfDeath, description, address } = personData;
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const handleClick = (index) => {
        setCurrentImageIndex(index);
    };

    return(
        <div className="py-8">
            <div className="max-w-3xl mx-auto">
                <div className="rounded-md shadow-lg">
                    <div className="p-6">
                        <h1 className="text-3xl font-bold mb-4 text-center">{name} {slug}</h1>
                        <div className="flex">
                            <div className="w-2/3 mr-6">
                                <img
                                    src={images[currentImageIndex].url}
                                    alt={`Image ${currentImageIndex + 1}`}
                                    className="w-full h-auto object-cover rounded-md mb-4"
                                />
                            </div>
                            <div className="w-1/3 flex flex-wrap">
                                {images.map((image, index) => (
                                    <img
                                        key={index}
                                        src={image.url}
                                        alt={`Thumbnail ${index + 1}`}
                                        className="w-1/3 h-auto object-cover rounded-md cursor-pointer mb-2 mr-2"
                                        onClick={() => handleClick(index)}
                                    />
                                ))}
                            </div>
                        </div>
                        <div className="space-y-4">
                            <p><strong>Date of Death:</strong> {dateOfDeath}</p>
                            <p><strong>Description:</strong> {description}</p>
                            <p><strong>Address:</strong> {address}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default HeroDetails