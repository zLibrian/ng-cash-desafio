import classnames from 'classnames';

interface DividerProps {
  className?: string;
  text?: string;
}

export function Divider(props: DividerProps) {
  return (
    <div className={classnames('flex w-full items-center', props.className)}>
      <div className="flex-1 h-[1px] bg-white/40"></div>
      <p className="p-4">{props.text}</p>
      <div className="flex-1 h-[1px] bg-white/40"></div>
    </div>
  );
}
