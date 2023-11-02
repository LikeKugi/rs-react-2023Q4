export interface IFetchClientPayload extends RequestInit {
  [T: string]: unknown;
}

export type fetchClientFunction = (
  endpoint: string,
  payload?: IFetchClientPayload,
) => Promise<unknown>;

export interface IClient {
  [T: string]: fetchClientFunction;
}
