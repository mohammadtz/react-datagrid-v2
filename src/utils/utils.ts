import { useEffect } from "react";
import { IColumn } from "..";
import { op } from "./opacity";
import { Paths } from "./types";

export function getScrollbarWidth() {
  // Creating invisible container
  const outer = document.createElement("div");
  outer.style.visibility = "hidden";
  outer.style.overflow = "scroll"; // forcing scrollbar to appear
  // outer.style.msOverflowStyle = 'scrollbar'; // needed for WinJS apps
  document.body.appendChild(outer);

  // Creating inner element and placing it in the container
  const inner = document.createElement("div");
  outer.appendChild(inner);

  // Calculating difference between container's full width and the child width
  const scrollbarWidth = outer.offsetWidth - inner.offsetWidth;

  // Removing temporary elements from the DOM
  outer.parentNode?.removeChild(outer);

  return scrollbarWidth;
}

export const trueUnit = (value?: string | number): string => {
  if (typeof value === "number") return `${value}px`;
  return value || "";
};

export function getKey<T>(column: IColumn<T> | Paths<T, 2>) {
  const column_obj = column as IColumn<T>;
  const column_key = column as Paths<T, 2>;
  return column_obj.dataField || column_key;
}

export const colorOp = (color: string, opacity: keyof typeof op) => color + op[opacity];

export const useOutsideClick = (ref: any, callback: any) => {
  const handleClick = (e: any) => {
    if (ref.current && !ref.current.contains(e.target)) {
      callback();
    }
  };
  useEffect(() => {
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  });
};

export const checkHasValue = (value: any) => {
  if (value !== undefined && value !== null && value !== "") return true;
  return false;
};

export const scrollbarVisible = (element: HTMLElement): boolean => {
  const result = element.scrollHeight > element.clientHeight;
  return result;
};

export const keyify = (obj: any, prefix = ""): string[] => {
  return Object.keys(obj).reduce<string[]>((res, el) => {
    if (Array.isArray(obj[el])) {
      return res;
    } else if (typeof obj[el] === "object" && obj[el] !== null) {
      return [...res, ...keyify(obj[el], prefix + el + ".")];
    }
    return [...res, prefix + el];
  }, []);
};
