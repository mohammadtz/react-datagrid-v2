/* eslint-disable react-hooks/exhaustive-deps */
import { useState, FormEvent } from "react";
import { HiSearch } from "react-icons/hi";
import { IColumn, IFilter } from "..";
import { renderMessage } from "../localization/render";
import { getKey } from "../utils/utils";
import { just_number_regex } from "../utils/variables";
import { colors } from "../utils/colors";
import { FilterType } from "./DataGrid.type";
import { SelectFilterType } from "./SelectFilterType";
import { StyledColumnSearch } from "./StyledComponents";
import { SelectBoolean } from "./SelectBoolean";
import { useEffect } from "react";

interface IColumnSearch<T> {
  column: IColumn<T> | keyof T;
  onSubmit?: (e?: IFilter<T>) => void;
  index: number;
  data?: IFilter<T>;
  message: ReturnType<typeof renderMessage>;
}

export function ColumnSearch<T>(props: IColumnSearch<T>) {
  const column_obj = props.column as IColumn<T>;
  const [temptValue, setTemptValue] = useState<string | boolean | number | null | undefined>(
    props.data?.value || ""
  );
  const [value, setValue] = useState<string | boolean | number | null | undefined>();
  const [type, setType] = useState<FilterType>(FilterType.contain);

  useEffect(() => {
    value !== undefined &&
      props.onSubmit &&
      props.onSubmit({
        key: getKey(props.column),
        type,
        value,
      });
    setValue(undefined);
  }, [value]);

  const onSubmit = (e?: FormEvent) => {
    e?.preventDefault();
    setValue(temptValue);
  };

  const renderSelectBoolean = () => {
    const selectBooleanValue =
      props.data?.value === true || props.data?.value === false
        ? Boolean(props.data?.value)
        : undefined;

    return (
      <SelectBoolean {...props} value={selectBooleanValue} onSelectChange={(e) => setValue(e)} />
    );
  };

  function renderSearchInput() {
    const onChangeInput = (value: string) =>
      column_obj.dataType !== "number" || value.length === 0
        ? setTemptValue(value)
        : value.match(just_number_regex) && setTemptValue(+value);

    return (
      <>
        <input value={temptValue?.toString()} onChange={(e) => onChangeInput(e.target.value)} />
        <SelectFilterType {...props} onFilterType={(e) => setType(e)} data={props.data} />
        <button style={{ paddingInlineEnd: 6, paddingInlineStart: 2 }}>
          <HiSearch fontSize={"1.6rem"} color={colors.border} />
        </button>
      </>
    );
  }

  return (
    <StyledColumnSearch onSubmit={onSubmit}>
      {column_obj.dataType === "boolean" ? renderSelectBoolean() : renderSearchInput()}
    </StyledColumnSearch>
  );
}
