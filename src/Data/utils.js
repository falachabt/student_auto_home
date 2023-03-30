/**
 * This function generates an array with a given length and fills it with null values.
 * The resulting array is map-able.
 *
 * @param {number} length - The desired length of the resulting array.
 * @returns {Array} - An array of the specified length, filled with null values.
 */

import { Skeleton } from "@mui/material";

export function generateArray(length) {
  return Array.from({ length }, (_, index) => ({ value: index }));
}

/**
 * Returns an array of loading skeletons.
 * @param {number} number - The length of the array.
 * @param {number} height - The height of each loading skeleton.
 * @param {number} width - The width of each loading skeleton.
 * @param {string} containerClassName - The class name for the container of the loading skeletons.
 * @param {boolean} useSx - Whether or not to use sx.
 * @param {string} variant - The variant of the loading skeleton.
 * @returns {JSX.Element} An array of loading skeletons.
 */

export const insertLoadingSkeleton = ({
  number,
  height,
  width,
  containerClassName,
  useSx = false,
  variant = "rounded" || "circular" || "rectangle",
}) => {
  //   const { themeMode } = UseStateContext();
  let themeMode = localStorage.getItem("themeMode") || "Dark";

  return (
    <div className={containerClassName && containerClassName}>
      {generateArray(number).map((Skel, index) => {
        return (
          <Skeleton
            key={index}
            sx={{
              bgcolor:
                themeMode === "Dark" && useSx === true ? "#20232A" : "gray",
            }}
            animation="wave"
            variant={variant}
            width={width ? width : 250}
            height={height ? height : 250}
          />
        );
      })}
    </div>
  );
};

export function generateProgress({ type = "square", max, min, actual }) {
  if (max <= 0) {
    console.log("max should be gratter than 0");
    return;
  }

  if (min > max) {
    console.log("max should be grathher than min");
    return;
  }

  if (actual < min || actual > max) {
    console.log("actual should be in between min and max");
    return;
  }

  switch (type) {
    case "square":
      const array = generateArray(max);

      const ratio_percent = (1 / max) * 100;

      return (
        <div className={` flex  gap-2 `}>
          {array.map((value, index) => {
            return (
              <div
                key={index}
                style={{ width: `${ratio_percent}%` }}
                className={` h-3 rounded-md ${
                  index + 1 <= actual ? " bg-main-blue   " : " bg-gray-400 "
                } `}
              ></div>
            );
          })}
        </div>
      );

      break;

    default:
      break;
  }
}
