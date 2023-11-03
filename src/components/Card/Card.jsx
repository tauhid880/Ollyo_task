/* eslint-disable react/prop-types */

const ImageCard = ({
  image,
  index,
  handleSelectedImg,
  handleDragStart,
  handleDrop,
  draggedIndex,
  handleDragOver,
}) => {
  return (
    <div
      className={
        index === 0
          ? " transform hover:scale-95 lg:col-span-2 lg:row-span-2 md:col-span-2 md:row-span-2 col-span-2 row-span-2 border-2 border-gray-200 rounded-xl  relative cursor-grab transition-all"
          : "transform hover:scale-95 border-2 border-gray-300 rounded-xl  relative cursor-grab transition-all"
      }
      draggable
      onDragStart={(e) => handleDragStart(e, index)}
      onDrop={(e) => handleDrop(e, index)}
      onDragOver={(e) => handleDragOver(e, index)}
    >
      <img
        src={image.img}
        className={draggedIndex === index ? "scale-90" : "rounded-xl"}
      />

      {/* Image Card hover */}
      <div
        className={
          image.isChecked
            ? `bg-[rgba(234,134,134,0.7)] absolute h-full w-full left-0 top-0 bottom-0 right-0 rounded-xl  transition-all opacity-50`
            : `bg-[rgba(0,0,0,0.7)] absolute h-full w-full left-0 top-0 bottom-0 right-0 opacity-0 rounded-xl transition-all hover:opacity-50 `
        }
      >
        <input
          checked={image.isChecked}
          onChange={() => handleSelectedImg(image.id)}
          className="absolute top-5 left-5 w-5 h-5"
          type="checkbox"
          name=""
          id="#"
        />
      </div>
    </div>
  );
};

export default ImageCard;
