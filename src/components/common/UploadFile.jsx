"use client";

import React, { useEffect, useState } from "react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { app } from "@/utils/firebase";
import toast from "react-hot-toast";

const UploadFile = ({ imageUrl, setImageURL }) => {
  const [image, setImage] = useState();

  useEffect(() => {
    const storage = getStorage(app);

    const upload = () => {
      // console.log("first");
      const name = new Date().getTime() + image.name;
      const storageRef = ref(storage, name);

      const uploadTask = uploadBytesResumable(storageRef, image);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          // setProgress(progress);

          switch (snapshot.state) {
            case "paused":
              console.log("paused");
              break;
            case "running":
              // setIsUploading(true);
              break;
          }
        },
        (error) => {
          // setIsUploading(false);
          toast.error("Image upload failed.");
          console.log(error);
        },
        () => {
          //   setIsUploading(false);
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            // if (previousUrl) {
            //   const prevRef = ref(storage, previousUrl);
            //   deleteObject(prevRef)
            //     .then(() => {
            //       console.log("deleted");
            //     })
            //     .catch((err) => console.log(err));
            // }
            setImageURL(downloadURL);
            console.log(downloadURL);
          });
        }
      );
    };

    image && upload();
  }, [image]);

  return (
    <div className="mb-6 w-full">
      <input
        type="file"
        id="photo"
        onChange={(e) => setImage(e.target.files[0])}
        className="text-sm text-stone-500
                          file:mr-5 file:py-1 file:px-3 file:border-[0.5px]
                          file:text-xs file:font-medium
                          file:bg-stone-50 file:text-stone-700
                          hover:file:cursor-pointer hover:file:bg-gray-200
                        hover:file:text-gray-600"
      />
    </div>
  );
};

export default UploadFile;
