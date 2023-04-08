import Skeleton from "@mui/material/Skeleton";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Input from "@mui/material/Input";


import * as React from "react";

import { UseStateContext } from "../Contexts/ContextProvider";
import UuidGenerator from "./Utils/Uuid";

// this whil return the number of time
export const generateSpecificLengthArr = (length) => {
  let word = "";
  while (word.split(" ").length < length) {
    word = word.concat("e ");
  }
  return word.split(" ");
};

export const dateFunction = (() => {
  const monthMonthName = [
    "Janvier",
    "Fevrier",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Aout",
    "Septembre",
    "Octobre",
    "Novembre",
    "Decembre"
  ];

  const getMonthName = (monthNumber) => {
    return monthNumber > 0 && monthNumber <= 12 ? monthMonthName[monthNumber - 1] : "inconnu";
  };

  /**
   * Formats the given date based on the format type.
   *
   * @param {Date} date - The date to format
   * @param {string} formatType - The format type. Possible values are:
   *   - "dd/mm/yyyy": 14/01/2022
   *   - "dd/mmm/yyyy": 14/janv./2022
   *   - "dddd dd mmmm yyyy": lundi 14 janvier 2022
   * @returns {string} The formatted date
   */

  function formatDate(date, formatType) {
    let options;
    switch (formatType) {
      case "dd/mm/yyyy":
        options = {
          day: "numeric",
          month: "numeric",
          year: "numeric",
        };
        break;
      case "dd/mmm/yyyy":
        options = {
          day: "numeric",
          month: "short",
          year: "numeric",
        };
        break;
      case "dddd dd mmmm yyyy":
        options = {
          weekday: "long",
          day: "numeric",
          month: "long",
          year: "numeric",
        };
        break;
      default:
        throw new Error("Invalid format type");
    }

    return date.toLocaleDateString("fr-FR", options);
  }

  return {
    monthNameByNumber: monthMonthName,
    getMonthNameByNumber: getMonthName,
    formatDate: formatDate,
  };
})();


export const domFunction = (() => {
  const closeIfClickOutsite = (event, target, changeState) => {
    let containX = 0;
    if (document.querySelector(`.${target}`)) {
      containX = document.querySelector(`.${target}`).getClientRects()[0].x;
      let userX = event.clientX;
      userX < containX && changeState(false);
    }
  };

  const insertLoadingSkeleton = ({
    number,
    height,
    width,
    containerClassName,
    useSx = true,
    variant = "rounded",
  }) => {
    const { themeMode } = UseStateContext();

    return (
      <div key={UuidGenerator.generate()} className={containerClassName && containerClassName}>
        {generateSpecificLengthArr(number).map((Skel, index) => {
          return (
            <Skeleton
              key={index}
              sx={{
                bgcolor:
                  themeMode === "Dark" && useSx === true ? "rgb(171,171,171)" : "gray",
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

  const insertInupt = ({
    fields,
    onChange,
    readOnly = false,
    defaultValues = {},
    assumePhone = false,
    fieldsErr = {},
  }) => {

    const { themeMode } = UseStateContext();

    return (
      <>
        <div className="flex flex-col  w-full py-3">
          <div
            className={` ${
              assumePhone === true
                ? " flex flex-col w-full "
                : " grid sm:grid-cols-3 max-sm:grid-rows-1 "
            }  gap-4`}
          >
            {fields.map((field, index) => {
              switch (field.type.toLowerCase()) {
                case "text": {
                  return (
                    <div key={field.id + index} className="w-full">
                      <TextField
                        className=" field text-white text-14 w-full"
                        required
                        sx={{ fontSize: "14px" }}
                        aria-readonly={readOnly}
                        id={field.id && field.id}
                        error={fieldsErr[field.id] || false}
                        defaultValue={defaultValues[field.id] || ""}
                        label={field.label && field.label}
                        InputLabelProps={{ className: " text-white" }}
                        InputProps={{ className: ` ${themeMode  === 'Dark'? 'text-white' : 'text-white'} ` }}
                        {...field.props}
                        autoComplete="none"
                        onChange={(e) => {
                          onChange(e);
                        }}
                      />
                    </div>
                  );
                }
                case "zonetext": {
                  return (
                    <div
                      key={field.id + index}
                      className="sm:col-span-3 w-full"
                    >
                      <TextField
                        className=" field text-white w-[100%]   "
                        required
                        multiline
                        maxRows={5}
                        error={fieldsErr[field.id] || false}
                        aria-readonly={readOnly}
                        defaultValue={defaultValues[field.id] || ""}
                        id={field.id && field.id}
                        label={field.label && field.label}
                        InputLabelProps={{ className: "dark:text-white" }}
                        InputProps={{ className: "dark:text-white " }}
                        autoComplete="none"
                        onChange={(e) => {
                          onChange(e);
                        }}
                      />
                    </div>
                  );
                }
                case "number": {
                  return (
                    <div key={field.id + index} className="w-full">
                      <TextField
                        type={"number"}
                        className="field text-white w-full"
                        required
                        error={fieldsErr[field.id] || false}
                        aria-readonly={readOnly}
                        defaultValue={defaultValues[field.id] || ""}
                        id={field.id}
                        label={field.label || field.name || "number"}
                        autoComplete="none"
                        inputMode="numeric"
                        InputLabelProps={{ className: "dark:text-white" }}
                        InputProps={{ className: "dark:text-white  " }}
                        onChange={onChange}
                      />
                    </div>
                  );
                }
                case "select": {
                  return (
                    <div key={field.id + index} className="w-full">
                      <FormControl sx={{ width: "100%" }}>
                        <InputLabel
                          className=" field text-white max-sm:w-full"
                          id={field.id && field.id}
                        >
                          {field.label}
                        </InputLabel>
                        <Select
                          className=" field text-white w-full max-sm:w-full"
                          required
                          sx={{ width: "100%" }}
                          aria-readonly={readOnly}
                          id={field.id && field.id}
                          error={fieldsErr[field.id] || false}
                          label={field.label && field.label}
                          defaultValue={
                            field.defaultValue ? field.options[0].value : ""
                          }
                          onChange={onChange}
                          name={field.id}
                          SelectDisplayProps={{ className: "dark:text-white" }}
                        >
                          {field.options?.map((option) => {
                            if (option.value) {
                              return (
                                <MenuItem
                                  className="dark:text-white"
                                  key={option.value}
                                  value={option.value}
                                >
                                  {option.display
                                    ? option.display
                                    : option.value}
                                </MenuItem>
                              );
                            }
                          })}
                        </Select>
                      </FormControl>
                    </div>
                  );
                }
                case "checkbox": {
                  return (
                    <FormControlLabel
                      key={field.id + index}
                      control={
                        <Checkbox
                          defaultChecked={defaultValues[field.id] || false}
                          id={field.id}
                          onChange={onChange}
                        />
                      }
                      label={field.label && field.label}
                    />
                  );
                }
                case "optionGroup": {
                  const [alignment, changeAlignement] = React.useState(
                    field.options[0].value
                  );
                  const handleChange = (event, newAlignement) => {
                    changeAlignement(newAlignement);
                    onChange(event, newAlignement);
                  };

                  return (
                    <ToggleButtonGroup
                      key={field.id + index}
                      color="info"
                      value={alignment}
                      id={field.id}
                      orientation="vertical"
                      exclusive={true}
                      onChange={handleChange}
                      aria-label="Platform"
                      className="w-full"
                    >
                      {field.options?.map((opt) => {
                        return (
                          <ToggleButton
                            key={opt.value}
                            id={field.id}
                            sx={{
                              bgcolor: "background.paper",
                              boxShadow: 2,
                              borderRadius: 3,
                              p: 2,
                              minWidth: 300,
                            }}
                            fullWidth={true}
                            value={opt.value}
                          >
                            {opt.display}
                          </ToggleButton>
                        );
                      })}
                    </ToggleButtonGroup>
                  );
                }
                case "file": {
                  return (
                    <Input
                      type="file"
                      error={fieldsErr[field.id] || false}
                      onChange={onChange}
                      label="Upload a file"
                      style={{ margin: "10px" }}
                    />
                  );
                }
              }
            })}
          </div>
        </div>
      </>
    );
  };

  // returning the the value and the id of a specific input field as target pass in parameter
  function handleChange(e) {
    const id = e.target.id || e.target.name;
    let value;

    // taking the value according to the type of the input field
    switch (e.target.type) {
      case "checkbox":
        value = e.target.checked;
        break;

      default:
        value = e.target.value;
        break;
    }

    return { value, id };
  }

  /**
   * utilisé pour vérifier les erreur dans un object par défaut la valeur c'est true .
   *
   * @param {object} target - l'object à parcourir .
   * @param {boolean} testedValue - l'object à parcourir .
   * @returns {boolean}
   */

  function verifyIfAnyFieldError(target, testedValue = true || false) {
    let isError = false;
    for (let key in target) {
      if (target[key] === testedValue) {
        isError = true;
        break;
      }
    }
    return isError;
  }

  /**
   * update et verifier tous les state erreur d'un field .
   *
   *
   * @param {function} setError - stateError changer
   * @param {array} fields - array in which the différent fields informatio are set
   * @param {string} type - the type of operation needed
   * @param {string} id - the id of the current field
   *
   *
   */
  function validateFormFields({ type, fields, data, setError, element }) {
    switch (type) {
      case "single":
        // Validation d'un champ unique
        const { value, id } = handleChange(element);
        const field = fields.find((el) => el.id === id);
        if (field) {
          const isValid = field.regex.test(value);
          setError((error) => ({ ...error, [id]: !isValid }));
        }
        break;
      case "all":
        // Validation de tous les champs
        if (data) {
          let prevErr = {};
          fields.forEach((field) => {
            if (field.regex) {
              const isValid = field.regex.test(data[field.id]);
              if (!isValid || data[field.id] === undefined) {
                prevErr = { ...prevErr, [field.id]: true };
              }
            }
          });
          setError(prevErr);
          return prevErr;
        } else {
          console.error("Données manquantes");
        }
        break;
      default:
        console.error("Type manquant");
    }
  }

  return {
    closeIfClickOutsite: closeIfClickOutsite,
    insertLoading: insertLoadingSkeleton,
    insertInupt: insertInupt,
    handleGetChange: handleChange,
    verifyIfAnyFieldError: verifyIfAnyFieldError,
    testField: validateFormFields,
  };
})();

/**
 * This function return and email
 *
 * @param {object} data - the data from the name
 * @returns {string} global
 */

export function generateEmail(data) {
  const firstName = data.firstName.split(" ")[0];
  const lastName = data.lastName.split(" ")[0];
  return `${firstName}.${lastName}@ah.com`;
}

//

export const handleSearch = (e, global) => {
  let emp_div = document.querySelectorAll(`.${global}`);
  emp_div.forEach((div) => {
    if (
      div.id.toLocaleLowerCase().includes(e.target.value.toLocaleLowerCase())
    ) {
      if (div.classList.contains("hidden")) {
        div.classList.remove("hidden");
      }
    } else {
      div.classList.add("hidden");
    }
  });
};

export const handleResetSearch = (e) => {
  let emp_div = document.querySelectorAll(`.${global}`);
  let count = 0;
  emp_div.forEach((div) => {
    if (div.classList.contains("hidden")) {
      count++;
    }
  });
  if (count === emp_div.length) {
    emp_div.forEach((div) => {
      div.classList.remove("hidden");
    });
    e.target.value = "";
  }
};
