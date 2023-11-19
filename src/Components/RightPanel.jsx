import { isVisible } from "@testing-library/user-event/dist/utils";
import React, { useEffect, useState } from "react";
import "./css/RightPanel.css";

function RightPanel({ schema }) {
  const [naplesCheck, setNaplesCheck] = useState(true);
  const [nyCheck, setNyCheck] = useState(false);
  const ignoreFields = [];
  const ToppingField = [];

  const [GlobalnaplesFields, setGlobalnapleFields] = useState([]);
  const [GlobalnyFields, setGlobalnyFields] = useState([]);

  useEffect(() => {
    console.log("Naples Check:", GlobalnaplesFields);
    console.log("NY Check:", GlobalnyFields);
  }, [
    GlobalnaplesFields,
    GlobalnyFields,
    setGlobalnapleFields,
    setGlobalnyFields,
  ]);

  const isConditionMet = (condition) => {
    const { jsonKey, op, value } = condition;
    return schema[jsonKey] === value;
  };

  const handleRadioClick = (event, field) => {
    const radioInput = event.target.querySelector('input[type="radio"]');
    const radioLabel = event.currentTarget;
    if (radioInput) {
      radioInput.checked = true;

      document.querySelectorAll(".RadioContainer").forEach((label) => {
        label.classList.remove("selectedRadioLabel");
      });
      radioLabel.classList.add("selectedRadioLabel");
      console.log(`Chosen radio button: ${radioInput.value}`);
      console.log("Ignore Field in the handleRadioClick:", ignoreFields);

      linkRadioToIgnoreCase(radioInput.value, ignoreFields);
    }
  };

  const linkRadioToIgnoreCase = (selectedValue, field) => {
    const naplesFields = ignoreFields.filter(
      (field) => field.jsonKey === "Naples"
    );
    const newYorkFields = ignoreFields.filter(
      (field) => field.jsonKey === "NewYork"
    );

    console.log("naplesFields:", naplesFields);
    console.log("newYorkFields:", newYorkFields);

    const naplesFieldsObject = naplesFields.reduce((obj, field) => {
      obj[field.jsonKey] = field;
      return obj;
    }, {});

    const newYorkFieldsObject = newYorkFields.reduce((obj, field) => {
      obj[field.jsonKey] = field;
      return obj;
    }, {});

    console.log("Naples Fields:", naplesFieldsObject);
    console.log("New York Fields:", newYorkFieldsObject);

    if (selectedValue === "naples") {
      Object.values(naplesFieldsObject).forEach((field) => {
        if (field.conditions && field.conditions.length > 0) {
          const isConditionMet = field.conditions.some((condition) => {
            switch (condition.op) {
              case "==":
                return selectedValue === condition.value;
              default:
                return false;
            }
          });

          if (isConditionMet) {
            let temp = [];
            temp.push(field);
            setGlobalnapleFields(temp);
            setGlobalnyFields([]);
            // console.log("GlobalnaplesFields:",GlobalnaplesFields);
            setNaplesCheck(true, () => {
              console.log("Updated State - Naples Check:", naplesCheck);
            });
            setNyCheck(false, () => {
              console.log("Updated State - NY Check:", nyCheck);
            });
          }
        }
      });
    } else if (selectedValue === "newyork") {
      Object.values(newYorkFieldsObject).forEach((field) => {
        if (field.conditions && field.conditions.length > 0) {
          const isConditionMet = field.conditions.some((condition) => {
            switch (condition.op) {
              case "==":
                return selectedValue === condition.value;
              default:
                return false;
            }
          });

          if (isConditionMet) {
            setNyCheck(true);
            setNaplesCheck(false);
            console.log("Condition Met for New York:", isConditionMet);
            console.log("Updated State - Naples Check:", naplesCheck);
            console.log("Updated State - NY Check:", nyCheck);

            let temp = [];
            temp.push(field);
            setGlobalnyFields(temp);
            setGlobalnapleFields([]);
          }
        }
      });
    }
  };

  const renderFields = (field) => {
    console.log("Field in the RenderFied function:", field.uiType);
    switch (field.uiType) {
      case "Input":
        return (
          <div className="InputContainer">
            <label className="InputLabel">
              {field.label}
              <span>*</span>
            </label>
            <div className="InputCont">
              <input
                className="InputFormCase"
                type="text"
                placeholder={field.placeholder}
                value={field.value || ""}
                required={field.validate && field.validate.required}
                readOnly={field.validate && field.validate.immutable}
              />
            </div>
          </div>
        );
      case "Group":
        return (
          <div className="GroupContainer">
            <label className="InputLabel">
              {field.label === "Pizza_type" ? `Pizza Type` : field.label}
              {field.label === "Pizza_type" && <span>*</span>}
            </label>
            <hr className="hr" />
          </div>
        );
      case "Radio":
        console.log("Radio Field", field);
        return (
          <div className="RadioContCase">
            {field.validate &&
              field.validate.options.map((option, idx) => (
                <label
                  key={idx}
                  className={`RadioContainer`}
                  onClick={(e) => handleRadioClick(e, field)}
                >
                  <input
                    type="radio"
                    value={option.value}
                    name={field.jsonKey}
                    defaultChecked={
                      option.value === field.validate.defaultValue
                    }
                    required={field.validate.required}
                    readOnly={field.validate.immutable}
                    className="RadioFormCase"
                  />
                  <div className="RadioH1Cont">
                    <h1 className="RadioInput">{option.label}</h1>
                  </div>
                </label>
              ))}
          </div>
        );
      case "Ignore":
        console.log("IgnoreFields:", field);
        if (field.conditions && field.conditions.length > 0) {
          const isFieldVisible = field.conditions.some(isConditionMet);
          if (!isFieldVisible) {
            return null;
          }
        }
        return renderFields(field.subParameters, field);
      case "Switch":
        return (
          <div className="SwitchCont">
            <div className="SwitchInputCont">
              <input
                type="checkbox"
                defaultChecked={field.validate && field.validate.defaultValue}
                required={field.validate && field.validate.required}
                readOnly={field.validate && field.validate.immutable}
                style={{ width: "20px", height: "20px", marginLeft: "10px" }}
              />
            </div>

            <label className="InputLabel">
              {field.label}
              <span>*</span>
            </label>
          </div>
        );
      case "Select":
        return (
          <>
            <div className="SelectCont">
              <label className="InputLabel">
                {field.label}
                <span>*</span>
              </label>
              <select className="SelectTag">
                {field.validate &&
                  field.validate.options &&
                  field.validate.options.map((option, idx) => (
                    <option
                      key={idx}
                      value={option.value}
                      className="optionSelect"
                    >
                      {option.label}
                    </option>
                  ))}
              </select>
            </div>
          </>
        );
      default:
        return <div>Null</div>;
    }
  };

  return (
    <form>
      {schema.map((field) => {
        if (field.uiType === "Group" && field.label === "Pizza_type") {
          return (
            <>
              {renderFields(field)}
              {field.subParameters.map((subParam) => {
                if (subParam.uiType === "Radio") {
                  console.log("Radio Fields in the Main:", subParam);
                  return renderFields(subParam);
                }
              })}
              {field.subParameters.forEach((subParam) => {
                if (subParam.uiType === "Ignore") {
                  console.log("Ignore Fields in the Main:", subParam);
                  ignoreFields.push(subParam);
                  console.log("naplesFieldToSet:", ignoreFields);
                }
              })}
              {GlobalnaplesFields &&
                GlobalnaplesFields.map((field) => {
                  return field.subParameters.map((subParam) => {
                    console.log(subParam);
                    return renderFields(subParam);
                  });
              })}
              {GlobalnyFields &&
                GlobalnyFields.map((field) => {
                  return field.subParameters.map((subParam) => {
                    console.log(subParam);
                    return renderFields(subParam);
                  });
              })}
              {field.subParameters.map((subParam) => {
                if (subParam.uiType === "Select") {
                  console.log("Radio Fields in the Main:", subParam);
                  return renderFields(subParam);
                }
              })}
              {field.subParameters.map((subParam) => {
                if (subParam.uiType === "Switch") {
                  console.log("Radio Fields in the Main:", subParam);
                  return renderFields(subParam);
                }
              })}
            </>
          );
        }else if(field.uiType === "Group" || field.label === "Toppings"){
          return (
            <>
              {renderFields(field)}
              {field.subParameters.map((subParam) => {
                if (subParam.uiType === "Select") {
                  console.log("Radio Fields in the Main:", subParam);
                  return renderFields(subParam);
                }
              })}
              {field.subParameters.map((subParam) => {
                if (subParam.uiType === "Switch") {
                  console.log("Radio Fields in the Main:", subParam);
                  return renderFields(subParam);
                }
              })}
            </>
          )
        }else if (field.uiType === "Input") {
          return renderFields(field);
        }else if (field.uiType === "Select") {
          console.log("Select in the Field Parent attach at Main:",field)
          return renderFields(field);
        }
      })}
    </form>
  );
}

export default RightPanel;
