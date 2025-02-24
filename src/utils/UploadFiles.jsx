import React, { useRef, useState } from "react";
import { toast } from "react-toastify";

const UploadFiles = ({
  folder = "/uploads/",
  onUploadSuccess,
  disabled = false,
  children,
}) => {
  const fileInputRef = useRef(null);
  const [uploading, setUploading] = useState(false);

  // Call this to programmatically "click" the hidden file input
  const triggerUpload = () => {
    if (!disabled && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Handle the file selection and initiate upload
  // const handleFileChange = async (event) => {
  //   const selectedFile = event.target.files[0];
  //   if (!selectedFile) return;

  //   try {
  //     setUploading(true);
  //     const uploadedImageUrl = await uploadImageToImageKit(
  //       selectedFile,
  //       folder
  //     );
  //     toast.success("Image uploaded successfully!");
  //     onUploadSuccess?.(uploadedImageUrl);
  //   } catch (error) {
  //     toast.error("Failed to upload image. Please try again.");
  //     console.error("Upload Error:", error);
  //   } finally {
  //     setUploading(false);
  //     // Reset the input so the user can select the same file again if needed
  //     if (fileInputRef.current) {
  //       fileInputRef.current.value = "";
  //     }
  //   }
  // };

  return (
    <>
      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        // onChange={handleFileChange}
        className="hidden"
        disabled={uploading || disabled}
      />

      {/* 
        Use a 'render prop' approach so the parent can provide 
        a custom button or design that calls 'triggerUpload' 
      */}
      {typeof children === "function"
        ? children({ triggerUpload, uploading, disabled })
        : children}
    </>
  );
};

export default UploadFiles;
