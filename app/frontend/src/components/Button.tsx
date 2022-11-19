import classNames from 'classnames';
import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
}

export function Button(props: ButtonProps) {
  return (
    <button
      {...props}
      className={classNames(
        `bg-purple-700 text-white rounded-md px-4 py-3 w-full
          disabled:brightness-50 disabled:cursor-not-allowed
          transition-all duration-300
          enabled:bg-purple-700 hover:brightness-110
        `,
        props.className
      )}
    >
      <span className="font-bold text-lg">{props.text}</span>
    </button>
  );
}
