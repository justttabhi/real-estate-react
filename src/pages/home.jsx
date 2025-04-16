import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
  Button,
  IconButton,
  Input,
  Textarea,
  Checkbox,
  Select,
  Option,
} from "@material-tailwind/react";
import Property from "@/data/property-data";
import { Link } from "react-router-dom";

export function Home() {

  const handlePriceRangeChange = (e) => {
    setPriceRange(Number(e.target.value));
  };

  const handleTypeChange = (value) => {
    setSelectedType(value);
  };

  const handleLocationChange = (value) => {
    setSelectedLocation(value);
  };

  // const [priceRange, setPriceRange] = useState(3); 
  const [priceRange, setPriceRange] = useState(7);
  const [selectedType, setSelectedType] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [filteredProperties, setFilteredProperties] = useState([]);






  useEffect(() => {
    const filtered = Property?.filter((item) => {
      const matchesType = selectedType ? item.type === selectedType : true;
      const matchesLocation = selectedLocation
        ? item.location.city.toLowerCase() === selectedLocation.toLowerCase()
        : true;
      const priceInCrore = parsePriceToCrore(item.price);
      const matchesPrice = priceInCrore <= priceRange;

      return matchesType && matchesLocation && matchesPrice;
    });

    setFilteredProperties(filtered);
  }, [priceRange, selectedType, selectedLocation]);

  const parsePriceToCrore = (priceStr) => {
    const num = Number(priceStr.replace(/[₹,]/g, ''));
    return num / 10000000;
  };


  return (
    <>
      <div className="relative flex h-screen content-center items-center justify-center pt-16 pb-32">
        <div className="absolute top-0 h-full w-full bg-[url('/img/background-3.png')] bg-cover bg-center" />
        <div className="absolute top-0 h-full w-full bg-black/60 bg-cover bg-center" />
        <div className="max-w-8xl container relative mx-auto">
          <div className="flex flex-wrap items-center">
            <div className="ml-auto mr-auto w-full px-4 text-center lg:w-8/12">
              <Typography
                variant="h1"
                color="white"
                className="mb-6 font-black"
              >
                Your story starts with us.
              </Typography>
              <Typography variant="lead" color="white" className="opacity-80">
                Safeguarding your investments with meticulous property management — where every detail is handled with precision, every tenant relationship is nurtured, and your peace of mind is our top priority
              </Typography>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Section */}
      <section className="px-4 pt-20 pb-10">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Filter Properties</h2>
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 xl:grid-cols-4">
            {/* Property Type Filter */}
            <div>
              <label className="block text-sm font-semibold mb-2">Type</label>
              <Select label="Select Property Type" onChange={handleTypeChange}>
                <Option value="">All Types</Option>
                <Option value="villa">Villa</Option>
                <Option value="apartment">Apartment</Option>
                <Option value="plot">Plot</Option>
                <Option value="farmhouse">Farmhouse</Option>
              </Select>
            </div>

            {/* Location Filter */}
            <div>
              <label className="block text-sm font-semibold mb-2">Location</label>
              <Select label="Select Location" onChange={handleLocationChange}>
                <Option value="">All Locations</Option>
                <Option value="ahmedabad">Ahmedabad</Option>
                <Option value="pune">Pune</Option>
                <Option value="bangalore">Bangalore</Option>
                <Option value="surat">Surat</Option>
              </Select>
            </div>
            {/* Price Range Filter (₹1 Cr - ₹7 Cr) */}
            <div>
              <label
                htmlFor="price-range"
                className="block text-sm font-semibold mb-2 text-gray-900 dark:text-white"
              >
                Max Price: ₹{priceRange} Cr
              </label>
              <input
                id="price-range"
                type="range"
                min="1"
                max="7"
                step="1"
                value={priceRange}
                onChange={handlePriceRangeChange}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Property Listings */}
      <section className="bg-white px-4 pb-20 pt-4">
        <div className="container mx-auto">
          <div className="flex flex-wrap -mx-4 mt-12">
            {filteredProperties.length > 0 ? (
              filteredProperties.map((property) => (
                <div
                  key={property.id}
                  className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-4 mb-12"
                >
                  <Link to={`/property-detail?id=${property.id}`}>
                    <div className="shadow-lg border border-gray-200 rounded-lg overflow-hidden h-full">
                      <div className="relative h-56">
                        <img
                          alt={property.title}
                          src={property.images[0]?.original}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="p-4">
                        <p className="text-sm text-gray-600 font-medium">
                          {property.price}
                        </p>
                        <h5 className="text-lg text-gray-800 font-semibold mt-1">
                          {property.title}
                        </h5>
                        <p className="text-sm text-gray-600 mt-2">
                          {property.description}
                        </p>
                        <p className="text-xs text-gray-500 mt-2">
                          Area: {property.area}
                        </p>
                        <div className="mt-4 flex justify-between text-xs text-gray-500">
                          <span className="capitalize">Type: {property.type}</span>
                          <span className="capitalize">
                            Location: {property.location.city}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))
            ) : (
              <div className="w-full text-center mt-16">
                <p className="text-xl text-gray-700">
                  No properties found for the selected filters.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>



      <div className="bg-white">
        {/* <Footer /> */}
      </div>
    </>
  );
}

export default Home;
