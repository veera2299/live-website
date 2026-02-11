export const getCloudinaryUrl = (publicId) => {
    const CLOUD_NAME = "dkv0sv3n9"; 
    
    if (!publicId) return "https://placehold.co/400x200?text=No+Image";
    if (publicId.startsWith("http")) return publicId;
  
    // Optimized URL generator
    return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/q_auto,f_auto/${publicId}`;
  };