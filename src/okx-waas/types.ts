export type WaasResponseBase<T> = {
  code: string;
  msg: string;
  data: T;
};
