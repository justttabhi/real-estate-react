import React, { useEffect, useState } from 'react';
import { Card, CardBody, Typography, Button, Dialog, DialogHeader, DialogBody, DialogFooter, Input } from '@material-tailwind/react';
import ReactImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import Property from "@/data/property-data";
import { useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
// import img from '../../public/img/background-1.jpg'
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFDownloadLink,
  pdf,
  Image,
} from '@react-pdf/renderer';
import recentData from '@/data/recent';

const styles = StyleSheet.create({
  page: {
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  header: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  section: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingBottom: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2d2d2d',
    marginBottom: 10,
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
    color: '#555',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#00b300',
    marginBottom: 10,
  },
  featureList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  featureItem: {
    width: '50%',
    marginBottom: 5,
    fontSize: 12,
  },
  amenities: {
    marginBottom: 10,
    fontSize: 12,
    fontStyle: 'italic',
  },
  imageContainer: {
    marginBottom: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 150,
    objectFit: 'cover',
    marginBottom: 10,
  }
});

const PropertyDetail = () => {
  const MyPdfDocument = ({ property }) => (
    <Document>
      <Page size="A4" style={styles.page}>
        <View key={property.id} style={styles.section}>
          <Text style={styles.title}>{property.title}</Text>
          <Text style={styles.text}>Price: {property.price}</Text>
          <Text style={styles.text}>Area: {property.area}</Text>
          <Text style={styles.text}>City: {property.location?.city || 'N/A'}</Text>
          <Text style={styles.text}>Type: {property.type}</Text>
          <Text style={styles.text}>Bedrooms: {property.features?.bedrooms}</Text>
          <Text style={styles.text}>Bathrooms: {property.features?.bathrooms}</Text>
          <Text style={styles.text}>Amenities: {property.amenities?.join(', ')}</Text>
          {/* Images Section */}
          <View style={styles.imageContainer}>

            <Image
              // key={index}
              style={styles.image}
              src="../../public/img/img01.jpeg" // Use the original image URL for high-quality image
            />
            <Image
              // key={index}
              style={styles.image}
              src="../../public/img/img02.jpeg"
            />
            <Image
              // key={index}
              style={styles.image}
              src="../../public/img/img03.jpeg"
            />

          </View>
        </View>
      </Page>
    </Document>
  );


  const generatePdf = async (property) => {
    const blob = await pdf(<MyPdfDocument property={property} />).toBlob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'property-details.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };




  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      phone: "",

    },
  });

  const [open, setOpen] = useState(false);
  const [thankYouOpen, setThankYouOpen] = useState(false);
  const [item, setItem] = useState()
  const location = useLocation();
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const id = params.get('id');
    // console.log("id---", Property, id);
    const result = Property.find(item => item.id == id);
    // console.log(result);


    setItem(result)
  }, [])


  const onSubmit = (data) => {
    console.log(data);
    generatePdf(item)
    setOpen(false)
    setThankYouOpen(true)
  };

  return (<>


    <div className="py-16 px-6 lg:px-20 bg-gray-100">
      {/* Page Header */}
      <div className="container mx-auto text-center mb-12">
        <Typography variant="h3" color="blue-gray" className="mb-4">
          Property Overview
        </Typography>
        <Typography variant="h5" color="gray" className="mb-8">
          {item?.title}
        </Typography>
      </div>

      {/* Main Content */}
      <div className="container mx-auto flex flex-wrap">
        {/* Left Section */}
        <div className="w-full lg:w-2/3 mb-8 lg:mb-0">
          {/* Image Gallery */}
          <ReactImageGallery
            flickThreshold={0.5}
            slideDuration={0}
            items={item?.images?.length ? item?.images : [
              {
                original: '/fallback.jpg',
                thumbnail: '/fallback-thumb.jpg',
              },
            ]}
            showNav={false}
            showFullscreenButton={false}
            showPlayButton={false}
          />

          {/* Property Description */}
          <Card className="mt-8">
            <CardBody>
              <Typography variant="h5" color="blue-gray" className="mb-4">
                Property Description
              </Typography>
              <Typography color="gray" className="text-base">
                {item?.description}</Typography>
            </CardBody>
          </Card>

          {/* Price, Area, and Key Info */}
          <Card className="mt-8">
            <CardBody>
              <Typography variant="h5" color="blue-gray" className="mb-4">
                Key Information
              </Typography>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex justify-between">
                  <Typography color="gray">Price:</Typography>
                  <Typography color="blue-gray">{item?.price}</Typography>
                </div>
                <div className="flex justify-between">
                  <Typography color="gray">Total Area:</Typography>
                  <Typography color="blue-gray">{item?.area}</Typography>
                </div>
                <div className="flex justify-between">
                  <Typography color="gray">Bedrooms:</Typography>
                  <Typography color="blue-gray">{item?.features?.bedrooms}</Typography>
                </div>
                <div className="flex justify-between">
                  <Typography color="gray">Bathrooms:</Typography>
                  <Typography color="blue-gray">{item?.features?.bathrooms}</Typography>
                </div>
                <div className="flex justify-between">
                  <Typography color="gray">Kitchen:</Typography>
                  <Typography color="blue-gray">{item?.features?.kitchen}</Typography>
                </div>
                <div className="flex justify-between">
                  <Typography color="gray">Garage:</Typography>
                  <Typography color="blue-gray">{item?.features?.garage}</Typography>
                </div>
              </div>
            </CardBody>
          </Card>

          {/* Amenities List */}
          <Card className="mt-8">
            <CardBody>
              <Typography variant="h5" color="blue-gray" className="mb-4">
                Amenities
              </Typography>

              <ul className="list-disc pl-5 space-y-1 text-blue-gray-700">
                {item?.amenities?.map((amenity, index) => (
                  <li key={index}>{amenity}</li>
                ))}
              </ul>
            </CardBody>
          </Card>


          {/* Location Details */}
          <Card className="mt-8">
            <CardBody>
              <Typography variant="h5" color="blue-gray" className="mb-4">
                Location Details
              </Typography>
              <div className="grid grid-cols-1 gap-4">
                <Button variant="text" size="sm" className="flex items-center">
                  <Typography color="gray">{item?.location?.address}</Typography>
                </Button>

              </div>
            </CardBody>
          </Card>

          {/* Embedded Map */}
          <Card className="mt-8">
            <CardBody>
              <Typography variant="h5" color="blue-gray" className="mb-4">
                Google Map
              </Typography>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3672.0265367167245!2d72.57136261542075!3d23.02250568493986!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e84f5e1c4109f%3A0xdeb0e37415b3252e!2sAhmedabad%2C%20Gujarat%2C%20India!5e0!3m2!1sen!2sin!4v1713266471335!5m2!1sen!2sin"

                width="100%"
                height="450"
                loading="lazy"
                className="rounded-lg"
              ></iframe>
            </CardBody>
          </Card>
        </div>

        {/* Right Sidebar */}
        <div className="w-full lg:w-1/3 space-y-8">
          <div >
            <Card className='m-4'>
              <CardBody>
                <Button variant="gradient" size="sm" fullWidth onClick={() => { setOpen(!open); reset(); }}>
                  Download Brochure
                </Button>
              </CardBody>
            </Card>
            <Card className='m-4'>
              <CardBody>
                <Typography variant="h5" color="blue-gray" className="mb-4">
                  Property Types
                </Typography>
                <ul className="space-y-2">
                  <li><Typography color="gray">Apartments</Typography></li>
                  <li><Typography color="gray">Villas</Typography></li>
                  <li><Typography color="gray">Commercial Spaces</Typography></li>
                  <li><Typography color="gray">Plots</Typography></li>
                  <li><Typography color="gray">Townhouses</Typography></li>
                </ul>
              </CardBody>
            </Card>
            {/* Recently Added Properties */}
            <Card className='m-4'>
              <CardBody>
                <Typography variant="h5" color="blue-gray" className="mb-4">
                  Recently Listed
                </Typography>
                <div className="space-y-4">
                  {recentData.map((item, index) => (
                    <div key={index} className="flex items-center mb-2">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-12 h-12 mr-4 rounded"
                      />
                      <Typography color="gray">{item.title}</Typography>
                    </div>
                  ))}
                </div>
              </CardBody>
            </Card>

          </div>

          {/* Property Categories */}

        </div>
      </div>

      <Dialog open={open} handler={() => setThankYouOpen(true)}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>Download Brochure</DialogHeader>
          <DialogBody>
            <div className='m-4'>
              <Input
                label="Name"
                {...register("name", {
                  required: "Name is required",
                })}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
              )}
            </div>

            {/* Phone Number Field */}
            <div className='m-4'>
              <Input
                label="Phone Number"
                {...register("phone", {
                  required: "Phone number is required",
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: "Enter a valid 10-digit phone number",
                  },
                })}
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
              )}
            </div>
          </DialogBody>
          <DialogFooter>
            <Button variant="text" color="gray" onClick={() => setOpen(!open)} className="mr-2">
              Cancel
            </Button>
            <Button type='submit' variant="gradient" color="blue">
              Download
            </Button>
          </DialogFooter>
        </form>
      </Dialog>

      <Dialog open={thankYouOpen} handler={() => setThankYouOpen(false)}>
        <DialogHeader>Thank You!</DialogHeader>
        <DialogBody>
          <p>Your brochure download has started.</p>
        </DialogBody>
        <DialogFooter>
          <Button variant="gradient" color="blue" onClick={() => setThankYouOpen(false)}>
            Close
          </Button>
        </DialogFooter>
      </Dialog>


    </div>

  </>
  );
};

export default PropertyDetail;
