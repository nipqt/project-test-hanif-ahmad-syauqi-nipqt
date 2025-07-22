import { useState, useEffect } from 'react';

function Banner() {
    const [offsetY, setOffsetY] = useState(0);
    const handleScroll = () => setOffsetY(window.pageYOffset);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="relative pt-20 h-[50vh] flex items-center justify-center text-white overflow-hidden -z-10">
            {/* Gambar Banner */}
            <img
                src="./public/assets/patrick-tomasso-1NTFSnV-KLs-unsplash.jpg"
                alt="Banner"
                className="absolute top-0 left-0 w-full h-full object-cover"
                style={{ transform: `translateY(${offsetY * 0.5}px)` }}
            />
            {/* Overlay Gelap */}
            <div className="absolute top-0 left-0 w-full h-full bg-black/40"></div>
            
            {/* Teks Banner */}
            <div className="text-center z-10" style={{ transform: `translateY(${offsetY * 0.7}px)` }}>
                <h1 className="text-5xl font-bold">Ideas</h1>
                <p>Where all our great things begin</p>
            </div>

            {/* Elemen untuk Efek Miring */}
            <div
                className="absolute bottom-0 left-0 w-full h-48 bg-white"
                style={{ clipPath: 'polygon(0% 100%, 100% 0, 100% 100%)' }}
            ></div>
        </div>
    );
}

export default Banner;