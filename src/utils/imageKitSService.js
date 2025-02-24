import ImageKit from "imagekit";

const imagekit = new ImageKit({
    publicKey: import.meta.env.VITE_IMAGEKIT_PUBLIC_KEY || "public_U1uOXGOIy9bV/40VJ88pazFbhxk=",
    privateKey: "private_PN56VXFLBQqIoz8x/Qc3WUYIgKU=",
    urlEndpoint: import.meta.env.VITE_IMAGEKIT_URL_ENDPOINT || "https://ik.imagekit.io/xawj3f137",
    authenticationEndpoint: import.meta.env.VITE_IMAGEKIT_AUTH_ENDPOINT || "http://localhost:8080/auth",
});

const uploadImageToImageKit = async (file, folder = "/uploads/") => {
    try {
        const response = await imagekit.upload({
            file,
            fileName: file.name,
            folder,
        });
        return response.url; 
    } catch (error) {
        console.error("Image upload failed:", error);
        throw new Error("Image upload failed. Please try again.");
    }
};

export default uploadImageToImageKit;
