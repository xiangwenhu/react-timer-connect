import React from "react";

export interface ITimerProps {
  timer: {
    isTiming: boolean;
    value: number;
    start: (option: ITimerOptions, force: boolean) => void;
    cancel: () => void;
    continue: () => void;
    reset: (autoStart?: boolean) => void;
  };
}

export interface IOuterProps {
  onTimingEnd?: (value: number) => void;
}

export interface ITimerOptions {
  interval?: number;
  start?: number;
  step?: number;
  end?: number;
}

export type Omit<T, K extends keyof T> = T extends any
  ? Pick<T, Exclude<keyof T, K>>
  : never;

export default function withTimer<P extends ITimerProps>(
  component: React.ComponentType<P>,
  initialOptions?: ITimerOptions
): React.ComponentClass<IOuterProps & Omit<P, keyof ITimerProps>>;



