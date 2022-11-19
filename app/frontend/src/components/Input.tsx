import classNames from 'classnames';
import {
  forwardRef,
  ForwardRefRenderFunction,
  InputHTMLAttributes,
} from 'react';
import { FieldError } from 'react-hook-form';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: FieldError;
}
const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  props,
  ref
) => {
  return (
    <label htmlFor="" className="w-full py-2">
      <p className="text-white/80 mb-2">{props.label}</p>
      <input
        className={classNames(
          `bg-[#201f1fed] text-white rounded-md px-4 py-3 w-full
          placeholder:text-white/40
           focus:outline-none focus:ring-2 focus:ring-[#201f1fed] focus:ring-opacity-50`,
          props.className
        )}
        ref={ref}
        {...props}
      />
      {!!props.error && (
        <p className="text-red-500 text-sm mt-2">{props.error.message}</p>
      )}
    </label>
  );
};

export const Input = forwardRef(InputBase);
