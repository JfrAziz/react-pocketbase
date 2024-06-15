import { type FormEvent } from "react";

export const formHandler = (handler: () => void | Promise<void>) => {
  return (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    event.stopPropagation();

    handler();
  };
};
