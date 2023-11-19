const createNapleNewYorkField = (subParam) => {
    if (
      subParam.uiType === "Ignore" &&
      subParam.conditions &&
      subParam.conditions.length > 0
    ){
      const naplesCondition = subParam.conditions.find(
        (condition) => condition.value === "naples"
      );

      const newYorkCondition = subParam.conditions.find(
        (condition) => condition.value === "newyork"
      );

      console.log("naplesCondition",naplesCondition);
      console.log("newYorkCondition",newYorkCondition);

      setNaplesField((prevNaplesField) => {
        if (naplesCondition && isConditionMet(naplesCondition)) {
          // Accumulate fields if there's an existing field
          return prevNaplesField ? [...prevNaplesField, subParam] : [subParam];
        }
        return prevNaplesField;
      });

      setNewyorkField((prevNewyorkField) => {
        if (newYorkCondition && isConditionMet(newYorkCondition)) {
          // Accumulate fields if there's an existing field
          return prevNewyorkField ? [...prevNewyorkField, subParam] : [subParam];
        }
        return prevNewyorkField;
      });
    }
  }

  