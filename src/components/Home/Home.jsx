import { useRef, useState } from "react";
import Card from "../Card/Card";
import fileUploadImg from "../../assets/images/fileUpload.gif";
import { images } from "../Home/Images";
import { Trash2Icon } from "lucide-react";
import { useSpring, animated } from "@react-spring/web";

const Home = () => {
  const [selectedImg, setSelectedImg] = useState(images);
  const [deleteImage, setDeleteImage] = useState([]);
  const [draggedIndex, setDraggedIndex] = useState(null);
  const fileInput = useRef();

  // React-spring
  const springs = useSpring({
    scale: deleteImage.length > 0 ? 1 : 0.7,
    opacity: deleteImage.length > 0 ? 1 : 0,
  });

  // Selected Image Filtering Function
  const handleSelectedImg = (id) => {
    const updateSelectedImg = selectedImg.map((img) => {
      return img.id === id ? { ...img, isChecked: !img.isChecked } : img;
    });

    const deleteItemCount = updateSelectedImg.filter((image) => {
      if (image.isChecked) {
        return image;
      }
    });
    setDeleteImage(deleteItemCount);
    setSelectedImg(updateSelectedImg);
  };

  // Selected Image Deleting Function
  const handleDeleteImage = () => {
    const remainingImage = selectedImg.filter((image) => {
      if (!image.isChecked) {
        return image;
      }
    });
    setSelectedImg(remainingImage);
    setDeleteImage([]);
  };

  // File upload handler
  const handleFileClick = () => {
    fileInput.current.click();
  };

  // New Image upload Function
  const handleImageUpload = (e) => {
    const files = e.target.files;
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const id = selectedImg.length + i + 1;
      const img_src = URL.createObjectURL(file);

      const newImage = { id, img: img_src, isChecked: false };

      setSelectedImg((prevImg) => [...prevImg, newImage]);
    }
  };

  // All Images Deselect Function
  const handleDeselectedAllImages = () => {
    const updateSelectedImg = selectedImg.map((img) => {
      return { ...img, isChecked: false };
    });
    setSelectedImg(updateSelectedImg);
    setDeleteImage([]);
  };

  // Drag & Drop Function
  const handleDragStart = (e, index) => {
    e.dataTransfer.setData("index", index);
    setDraggedIndex(index);
  };
  const handleDrop = (e, newIndex) => {
    const startIndex = e.dataTransfer.getData("index");
    const updatedBoxes = [...selectedImg];
    const [draggedBox] = updatedBoxes.splice(startIndex, 1);
    updatedBoxes.splice(newIndex, 0, draggedBox);
    setSelectedImg(updatedBoxes);
    setDraggedIndex(null);
  };
  const handleDragOver = (e, index) => {
    e.preventDefault();
    if (index !== draggedIndex) {
      setDraggedIndex(index);
    }
  };

  return (
    <div className="lg:w-[80%] w-[100%] mx-auto my-10 px-5">
      {/* Top section start */}
      {deleteImage.length > 0 ? (
        <>
          <div className="flex bg-white rounded-t-md items-center justify-between w-[100%] mx-auto py-5 px-4 border-b-2 border-b-slate-300">
            <div className="flex items-center gap-2">
              <input
                checked={true}
                onChange={handleDeselectedAllImages}
                className="w-5 h-5"
                type="checkbox"
                name=""
                id=""
              />
              <p className="ml-2 text-lg font-semibold ">
                {deleteImage.length === 1
                  ? `${deleteImage.length} File Selected`
                  : `${deleteImage.length} Files Selected`}
              </p>
            </div>
            <div>
              <animated.button
                style={springs}
                className="bg-red-400 text-black rounded-full px-3 py-2 flex items-center gap-2"
                onClick={handleDeleteImage}
              >
                <Trash2Icon size={20} color="black" />
                <span className="text-sm md:text-base font-medium">
                  Delete Files
                </span>
              </animated.button>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className=" text-2xl bg-white rounded-t-md font-bold w-[100%] mx-auto pt-5 px-4  border-b-slate-300">
            <h1>Gallery</h1>
            <hr className="mt-5 border-b-2" />
          </div>
        </>
      )}

      {/* Top section End */}

      {/* Image Card Section Start */}
      <section className="grid rounded-b-md bg-white lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-1 gap-4 w-[100%] mx-auto py-8 px-5">
        {selectedImg?.map((image, index) => {
          return (
            <Card
              key={index}
              image={image}
              index={index}
              handleSelectedImg={handleSelectedImg}
              handleDrop={handleDrop}
              handleDragStart={handleDragStart}
              draggedIndex={draggedIndex}
              handleDragOver={handleDragOver}
            />
          );
        })}

        <div
          className="border-2 border-dashed rounded-md  flex flex-col justify-center items-center w-[100%] cursor-pointer gap-5"
          onClick={handleFileClick}
        >
          <img
            className="mx-auto"
            width="1200"
            height="1200"
            src={fileUploadImg}
            alt=""
          />
        </div>
        <input
          type="file"
          id="fileInput"
          className="hidden"
          onChange={handleImageUpload}
          accept="image/*"
          ref={fileInput}
        />
      </section>
      {/* Image Card Section End */}

      {/* CopyRight */}
      <div className="text-center font-medium mt-2 text-lg hidden">
        <h2>Tauhid Islam: &copy;</h2>
      </div>
    </div>
  );
};

export default Home;
