/* eslint-disable react-hooks/exhaustive-deps */
import { useState, FormEvent } from "react";
import { HiSearch } from "react-icons/hi";
import { IColumn, FilterParams } from "..";
import { renderMessage } from "../localization/render";
import { getKey } from "../utils/utils";
import { just_number_regex } from "../utils/variables";
import { colors } from "../utils/colors";
import { FilterOptions } from "./DataGrid.type";
import { SelectFilterType } from "./SelectFilterType";
import { StyledColumnSearch } from "./StyledComponents";
import { SelectBoolean } from "./SelectBoolean";
import { useEffect } from "react";
import { Paths } from "../utils/types";

interface IColumnSearch<T> {
  column: IColumn<T> | Paths<T, 2>;
  onSubmit?: (e?: FilterParams<T>) => void;
  index: number;
  data?: FilterParams<T>;
  message: ReturnType<typeof renderMessage>;
}

export function ColumnSearch<T>(props: IColumnSearch<T>) {
  const column_obj = props.column as IColumn<T>;
  const [temptValue, setTemptValue] = useState<string | boolean | number | null | undefined>(
    props.data?.FilterValue || ""
  );
  const [value, setValue] = useState<string | boolean | number | null | undefined>();
  const [type, setType] = useState<FilterOptions>(FilterOptions.Contains);

  useEffect(() => {
    value !== undefined &&
      props.onSubmit &&
      props.onSubmit({
        ColumnName: getKey(props.column),
        FilterOptions: type,
        FilterValue: value,
      });
    setValue(undefined);
  }, [value]);

  const onSubmit = (e?: FormEvent) => {
    e?.preventDefault();
    setValue(temptValue);
  };

  const renderSelectBoolean = () => {
    const selectBooleanValue =
      props.data?.FilterValue === true || props.data?.FilterValue === false
        ? Boolean(props.data?.FilterValue)
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
