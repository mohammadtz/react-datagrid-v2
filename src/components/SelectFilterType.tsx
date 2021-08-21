import { useRef } from "react";
import { useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { renderMessage } from "../localization/render";
import { colors } from "../utils/colors";
import { useOutsideClick } from "../utils/utils";
import { FilterType, IFilter } from "./DataGrid.type";
import { StyledSelectFilterType } from "./StyledComponents";

interface IProps<T> {
  message: ReturnType<typeof renderMessage>;
  onFilterType: (e: FilterType) => void;
  data?: IFilter<T>;
}

export function SelectFilterType<T>(props: IProps<T>) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useOutsideClick(ref, () => setVisible(false));

  const [filterTypeData, setFilterTypeData] = useState([
    {
      id: FilterType.contain,
      text: props.message.select_filter_type_contain,
      active: props.data?.type === FilterType.contain,
    },
    {
      id: FilterType.equal,
      text: props.message.select_filter_type_equal,
      active: props.data?.type === FilterType.equal,
    },
    {
      id: FilterType.startWith,
      text: props.message.select_filter_type_start_with,
      active: props.data?.type === FilterType.startWith,
    },
    {
      id: FilterType.endWith,
      text: props.message.select_filter_type_end_with,
      active: props.data?.type === FilterType.endWith,
    },
  ]);

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
