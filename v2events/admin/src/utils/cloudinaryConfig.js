import { Cloudinary } from '@cloudinary/url-gen';

// Create a Cloudinary instance and export it
const cld = new Cloudinary({
  cloud: {
    cloudName: 'dkv0sv3n9' // Replace with your actual cloud name
  }
});

export default cld;