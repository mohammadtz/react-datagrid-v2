/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useState } from "react";
import { renderMessage } from "../localization/render";
import { StyledSelect } from "./StyledComponents";

interface ISelectBoolean {
  message: ReturnType<typeof renderMessage>;
  value?: boolean;
  onSelectChange?: (e: boolean | null) => void;
}

export const SelectBoolean = (props: ISelectBoolean) => {
  const [value, setValue] = useState(props.value === true ? 1 : props.value === false ? 0 : -1);

  useEffect(() => {
    if (props.onSelectChange) props.onSelectChange(value === 1 ? true : value === 0 ? false : null);
  }, [value]);

  return (
    <StyledSelect value={value} onChange={(e) => setValue(+e.target.value)}>
      <option value={-1}>{props.message.select_boolean_all}</option>
      <option value={1}>{props.message.select_boolean_true}</option>
      <option value={0}>{props.message.select_boolean_false}</option>
    </StyledSelect>
  );
};
