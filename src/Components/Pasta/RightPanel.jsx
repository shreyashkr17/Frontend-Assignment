import { isVisible } from "@testing-library/user-event/dist/utils";
import React, { useEffect, useState } from "react";
import "../css/RightPanel.css";
import InfoIcon from "@mui/icons-material/Info";

function RightPanel({ schema }) {
  const [naplesCheck, setNaplesCheck] = useState(true);
  const [nyCheck, setNyCheck] = useState(false);

  const [formData, setFormData] = useState({})

  // Input Case Hovering State Change
  const [isHoverInput, setIsHoverInput] = useState(false);
  const [isHoverInputTwo, setIsHoverInputTwo] = useState(false);
  const [isHoverInputThree,setIsHoverInputThree] = useState(false);

  // Group Case Hovering State Change
  const [isHoverGrp, setIsHoverGrp] = useState(false);
  const [isHoverGrpTwo, setIsHoverGrpTwo] = useState(false);

  // Select Case Hovering State CHange
  const [isHoverSelect, setIsHoverSelect] = useState(false);
  const [isHoverSelectTwo, setIsHoverSelectTwo] = useState(false);
  const [isHoverSelectThree, setIsHoverSelectThree] = useState(false);
  const [isHoverSelectFour, setIsHoverSelectFour] = useState(false);
  const [isHoverSelectFive, setIsHoverSelectFive] = useState(false);
  const [isHoverSelectSix, setIsHoverSelectSix] = useState(false);
  const [isHoverSelectSeven, setIsHoverSelectSeven] = useState(false);
  const [isHoverSelectEight, setIsHoverSelectEight] = useState(false);

  // Switch Case Hovering State Change
  const [isHoverSwitch,setIsHoverSwitch] = useState(false);
  const [isHoverSwitchTwo,setIsHoverSwitchTwo] = useState(false);

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

  const handleSubmit = (event) => {
    event.preventDefault();

    const formDataToSend = {};

    schema.forEach((field) => {
      if (field.uiType === "Group" && field.label === "Pizza_type") {
        const isSelectedTab =
          (field.label === "New York Style Pizza" && nyCheck) ||
          (field.label === "Naples Style Pizza" && naplesCheck);

        if (isSelectedTab) {
          // Include data for the selected tab
          formDataToSend[field.label] = {};
          field.subParameters.forEach((subParam) => {
            const inputElement = document.querySelector(
              `.InputFormCase[name="${subParam.jsonKey}"]`
            )
            formDataToSend[field.label][subParam.jsonKey] = inputElement.value
          });
        }
      }else {
        const inputElement = document.querySelector(
          `.InputFormCase[name="${field.jsonKey}"]`
        );
        // Include data for non-group fields
        formDataToSend[field.jsonKey] = inputElement.value;
      }
    });

    console.log("FormData to send in the backend", formDataToSend);
  }

  const renderFields = (field) => {
    console.log("Field in the RenderFied function:", field.uiType);
    switch (field.uiType) {
      case "Input":
        return (
          <div className="InputContainer">
            <label className="InputLabel">
              {field.label}
              <span>*</span>
              <InfoIcon
                style={{
                  fontSize: "15px",
                  cursor: "pointer",
                  marginLeft: "10px",
                  color: "rgb(211,211,211)",
                }}
                onMouseEnter={() => {
                  if (field.label === "Pizza Name") {
                    setIsHoverInput(true);
                    setIsHoverInputTwo(false);
                    setIsHoverInputThree(false);
                  } else if (field.label === "Type") {
                    setIsHoverInputTwo(false);
                    setIsHoverInput(true);
                    setIsHoverInputThree(false);
                  }else if(field.label === "Pasta Name"){
                    setIsHoverInputTwo(false);
                    setIsHoverInput(false);
                    setIsHoverInputThree(true);
                  }
                }}
                onMouseLeave={() => {
                  setIsHoverInput(false);
                  setIsHoverInputTwo(false);
                  setIsHoverInputThree(false);
                }}
              />
              {isHoverInput && field.label === "Pizza Name" && (
                <div className="HoverContainer">
                  <h3>{field.label}</h3>
                  <hr className="hr" />
                  <h4>{field.description}</h4>
                </div>
              )}
              {isHoverInputTwo && field.label === "Type" && (
                <div className="HoverContainer">
                  <h3>{field.label}</h3>
                  <hr className="hr" />
                  <h4>{field.description}</h4>
                </div>
              )}
              {isHoverInputThree && field.label === "Pasta Name" && (
                <div className="HoverContainer">
                  <h3>{field.label}</h3>
                  <hr className="hr" />
                  <h4>{field.description}</h4>
                </div>
              )}
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
              {field.label === "Pizza_type" && (
                <>
                  <span>*</span>
                  <InfoIcon
                    style={{
                      fontSize: "15px",
                      cursor: "pointer",
                      marginLeft: "10px",
                      color: "rgb(211,211,211)",
                    }}
                    onMouseEnter={() => {
                      if (field.label === "Pizza_type") {
                        setIsHoverGrp(true);
                        setIsHoverGrpTwo(false);
                      } else if (field.label === "Toppings") {
                        setIsHoverGrpTwo(true);
                        setIsHoverGrp(false);
                      }
                    }}
                    onMouseLeave={() => {
                      setIsHoverGrp(false);
                      setIsHoverGrpTwo(false);
                    }}
                  />
                  {isHoverGrp && field.label === "Pizza_type" && (
                    <div className="HoverContainer">
                      <h3>{field.label}</h3>
                      <hr className="hr" />
                      <h4>{field.description}</h4>
                    </div>
                  )}
                  {isHoverGrpTwo && field.label === "Toppings" && (
                    <div className="HoverContainer">
                      <h3>{field.label}</h3>
                      <hr className="hr" />
                      <h4>{field.description}</h4>
                    </div>
                  )}
                </>
              )}
            </label>
            <hr className="hr" />
          </div>
        );
      case "Radio":
        const selectedRadioValue = schema[field.jsonKey] || field.validate.defaultValue;
        console.log("Radio Field", field);
        return (
          <div className="RadioContCase">
            {field.validate &&
              field.validate.options.map((option, idx) => (
                <label
                  key={idx}
                  className={`RadioContainer ${option.value === selectedRadioValue? "selectedRadioLabel":""}`}
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
                style={{ width: "20px", height: "20px", marginLeft: "10px" ,cursor:"Pointer"}}
              />
            </div>

            <label className="InputLabel">
              {field.label}
              <span>*</span>
              <InfoIcon
                style={{
                  fontSize: "15px",
                  cursor: "pointer",
                  marginLeft: "10px",
                  color: "rgb(211,211,211)",
                }}
                onMouseEnter={()=>{
                  if(field.label === "Cheeseburst"){
                    setIsHoverSwitch(true);
                    setIsHoverSwitchTwo(false);
                  }else if(field.label === "Include_seasonings"){
                    setIsHoverSwitch(false);
                    setIsHoverSwitchTwo(true);
                  }
                }}
                onMouseLeave= {()=>{
                  setIsHoverSwitch(false);
                  setIsHoverSwitchTwo(false);
                }}
              />
              {isHoverSwitch && field.label === "Cheeseburst" && (
                <div className="HoverContainer">
                  <h3>{field.label}</h3>
                  <hr className="hr" />
                  <h4>{field.description}</h4>
                </div>
              )}
              {isHoverSwitchTwo && field.label === "Include_seasonings" && (
                <div className="HoverContainer">
                  <h3>{field.label}</h3>
                  <hr className="hr" />
                  <h4>{field.description}</h4>
                </div>
              )}
            </label>
          </div>
        );
      case "Select":
        return (
          <>
            <div className="SelectCont">
              <label className="InputLabel">
                {
                field.label === "Main_topping" ? "Main Topping" :
                  field.label === "Second_topping" ? "Second Topping" :
                  field.label === "Topping_type" ? "Topping Type" :
                  field.label
                }
                <span>*</span>
                <InfoIcon
                  style={{
                    fontSize: "15px",
                    cursor: "pointer",
                    marginLeft: "10px",
                    color: "rgb(211,211,211)",
                  }}
                  onMouseEnter={() => {
                    if (field.label === "Slices") {
                      setIsHoverSelect(true);
                      setIsHoverSelectTwo(false);
                      setIsHoverSelectThree(false);
                      setIsHoverSelectFour(false);
                      setIsHoverSelectFive(false);
                      setIsHoverSelectSix(false);
                      setIsHoverSelectSeven(false);
                      setIsHoverSelectEight(false);
                    } else if (field.label === "Sauce") {
                      setIsHoverSelect(false);
                      setIsHoverSelectTwo(true);
                      setIsHoverSelectThree(false);
                      setIsHoverSelectFour(false);
                      setIsHoverSelectFive(false);
                      setIsHoverSelectSix(false);
                      setIsHoverSelectSeven(false);
                      setIsHoverSelectEight(false);
                    } else if (field.label === "Main_topping") {
                      setIsHoverSelect(false);
                      setIsHoverSelectTwo(false);
                      setIsHoverSelectThree(true);
                      setIsHoverSelectFour(false);
                      setIsHoverSelectFive(false);
                      setIsHoverSelectSix(false);
                      setIsHoverSelectSeven(false);
                      setIsHoverSelectEight(false);
                    } else if (field.label === "Second_topping") {
                      setIsHoverSelect(false);
                      setIsHoverSelectTwo(false);
                      setIsHoverSelectThree(false);
                      setIsHoverSelectFour(true);
                      setIsHoverSelectFive(false);
                      setIsHoverSelectSix(false);
                      setIsHoverSelectSeven(false);
                      setIsHoverSelectEight(false);
                    } else if (field.label === "Size") {
                      setIsHoverSelect(false);
                      setIsHoverSelectTwo(false);
                      setIsHoverSelectThree(false);
                      setIsHoverSelectFour(false);
                      setIsHoverSelectFive(true);
                      setIsHoverSelectSix(false);
                      setIsHoverSelectSeven(false);
                      setIsHoverSelectEight(false);
                    }else if(field.label === "Topping_type"){
                      setIsHoverSelect(false);
                      setIsHoverSelectTwo(false);
                      setIsHoverSelectThree(false);
                      setIsHoverSelectFour(false);
                      setIsHoverSelectFive(false);
                      setIsHoverSelectSix(true);
                      setIsHoverSelectSeven(false);
                      setIsHoverSelectEight(false);
                    }else if(field.label === "Cheese"){
                      setIsHoverSelect(false);
                      setIsHoverSelectTwo(false);
                      setIsHoverSelectThree(false);
                      setIsHoverSelectFour(false);
                      setIsHoverSelectFive(false);
                      setIsHoverSelectSix(false);
                      setIsHoverSelectSeven(true);
                      setIsHoverSelectEight(false);
                    }else if(field.label === "Portion"){
                      setIsHoverSelect(false);
                      setIsHoverSelectTwo(false);
                      setIsHoverSelectThree(false);
                      setIsHoverSelectFour(false);
                      setIsHoverSelectFive(false);
                      setIsHoverSelectSix(false);
                      setIsHoverSelectSeven(false);
                      setIsHoverSelectEight(true);
                    }
                  }}
                  onMouseLeave={() => {
                    setIsHoverSelect(false);
                    setIsHoverSelectTwo(false);
                    setIsHoverSelectThree(false);
                    setIsHoverSelectFour(false);
                    setIsHoverSelectFive(false);
                    setIsHoverSelectSix(false);
                    setIsHoverSelectSeven(false);
                    setIsHoverSelectEight(false);
                  }}
                />
              {isHoverSelect && field.label === "Slices" && (
                <div className="HoverContainer">
                  <h3>{field.label}</h3>
                  <hr className="hr" />
                  <h4>{field.description}</h4>
                </div>
              )}
              {isHoverSelectTwo && field.label === "Sauce" && (
                <div className="HoverContainer">
                  <h3>{field.label}</h3>
                  <hr className="hr" />
                  <h4>{field.description}</h4>
                </div>
              )}
              {isHoverSelectThree && field.label === "Main_topping" && (
                <div className="HoverContainer">
                  <h3>{field.label}</h3>
                  <hr className="hr" />
                  <h4>{field.description}</h4>
                </div>
              )}
              {isHoverSelectFour && field.label === "Second_topping" && (
                <div className="HoverContainer">
                  <h3>{field.label}</h3>
                  <hr className="hr" />
                  <h4>{field.description}</h4>
                </div>
              )}
              {isHoverSelectFive && field.label === "Size" && (
                <div className="HoverContainer">
                  <h3>{field.label}</h3>
                  <hr className="hr" />
                  <h4>{field.description}</h4>
                </div>
              )}
              {isHoverSelectSix && field.label === "Topping_type" && (
                <div className="HoverContainer">
                  <h3>Topping Type</h3>
                  <hr className="hr" />
                  <h4>{field.description}</h4>
                </div>
              )}
              {isHoverSelectSeven && field.label === "Cheese" && (
                <div className="HoverContainer">
                  <h3>{field.label}</h3>
                  <hr className="hr" />
                  <h4>{field.description}</h4>
                </div>
              )}
              {isHoverSelectEight && field.label === "Portion" && (
                <div className="HoverContainer">
                  <h3>{field.label}</h3>
                  <hr className="hr" />
                  <h4>{field.description}</h4>
                </div>
              )}
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
    <form onSubmit={handleSubmit}>
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
        } else if (field.uiType === "Group" || field.label === "Toppings") {
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
          );
        } else if (field.uiType === "Input") {
          return renderFields(field);
        } else if (field.uiType === "Select") {
          console.log("Select in the Field Parent attach at Main:", field);
          return renderFields(field);
        }
      })}
      {
        <div className="ButtonContainer">
          <button type="submit" className="submtBtn">Submit</button>
          <button type="button" className="canBtn">Cancel</button>
        </div>
      }
    </form>
  );
}

export default RightPanel;
