import React from "react";

export interface ITimerProps {
  timer: {
    isTiming: boolean;
    value: number;
    start: () => void;
    cancel: () => void;
    continue: () => void;
    reset: (autoStart: boolean) => void;
  };
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

export default function withTimer(
  component: React.ComponentType<any>,
  initialOptions?: ITimerOptions
): React.ComponentClass<Omit<any, keyof ITimerProps>>;
