/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef } from "react";
import { useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { renderMessage } from "../localization/render";
import { colors } from "../utils/colors";
import { useOutsideClick } from "../utils/utils";
import { FilterOptions, FilterParams, IFilterTypeData } from "./DataGrid.type";
import { StyledSelectFilterType } from "./StyledComponents";

interface IProps<T> {
  message: ReturnType<typeof renderMessage>;
  onFilterType: (e: FilterOptions) => void;
  data?: FilterParams<T>;
}

export function SelectFilterType<T>(props: IProps<T>) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [filterTypeData, setFilterTypeData] = useState<IFilterTypeData[]>([]);

  useOutsideClick(ref, () => setVisible(false));

  useEffect(() => {
    const temp: IFilterTypeData[] = [];

    (Object.keys(FilterOptions) as Array<keyof typeof FilterOptions>).forEach((value) => {
      const val = Number(value);
      if (!val) {
        const key = value as keyof typeof FilterOptions;
        const text = props.message.select_filter_type as any;

        const data: IFilterTypeData = {
          id: FilterOptions[key],
          active: props.data?.FilterOptions === FilterOptions[key],
          text: text[key],
        };

        temp.push(data);
      }
    });

    setFilterTypeData(temp);
  }, []);

  return (
    <StyledSelectFilterType ref={ref}>
      <IoMdArrowDropdown
        color={colors.gray}
        className="icon"
        onClick={() => setVisible(!visible)}
      />
      {visible && (
        <div className="drop-down">
          {filterTypeData.map((x) => (
            <div
              key={x.id}
              onClick={() => {
                props.onFilterType(x.id);
                setFilterTypeData(
                  filterTypeData.map((y) =>
                    y.id === x.id ? { ...y, active: true } : { ...y, active: false }
                  )
                );
                setTimeout(() => {
                  setVisible(false);
                }, 100);
              }}
              style={x.active ? { background: colors.border } : {}}
            >
              {x.text}
            </div>
          ))}
        </div>
      )}
    </StyledSelectFilterType>
  );
}
