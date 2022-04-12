import { FormEvent } from "react";

export function phone (e: FormEvent<HTMLInputElement>) {
  let value = e.currentTarget.value;
  value = value.replace(/^\($/, "");
  value = value.replace(/^(\d{2})/, "($1) ");
  value = value.replace(/^(\(\d{2})[ \d]+/, "$1) ");
  value = value.replace(/^(\(\d{2}\)) (\d{5})(\d)/, "$1 $2-$3");
  e.currentTarget.value = value;

  return e;
}