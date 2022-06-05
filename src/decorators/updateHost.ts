import { ReactiveControllerHost } from "lit";

interface Options {
  multiple?: boolean;
  shouldUpdate?: (_this: any) => boolean;
}

export function updateHost({ multiple = false, shouldUpdate }: Options = {}) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const fn = descriptor.value;

    descriptor.value = function (...args: any) {
      const response = fn.call(this, ...args);

      if (shouldUpdate === undefined || shouldUpdate(this))
        if (multiple) {
          this?.hosts?.forEach((host: ReactiveControllerHost) =>
            host.requestUpdate()
          );
        } else {
          this?.host?.requestUpdate();
        }

      return response;
    };

    return descriptor;
  };
}
