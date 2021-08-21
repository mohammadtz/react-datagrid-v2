import { useEffect } from "react";
import { IColumn } from "..";
import { op } from "./opacity";

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

export function getKey<T>(column: IColumn<T> | keyof T) {
  const column_obj = column as IColumn<T>;
  const column_key = column as keyof T;
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
  console.log("result", result);
  return result;
};
