import { AuthContextProps } from "../components/auth-context";
import IGridFilter from "../types/grid-filters";

export interface FetchData {
  uri: string;
  id?: any;
  params?: string;
  data?: any;
  context?: AuthContextProps;
  filters?: IGridFilter;
}

const getHeaders: (authId?: string, isFormData?: boolean) => HeadersInit = (
  authId,
  isFormData
) => {
  const headers: HeadersInit = {};
  if (!isFormData) headers["Content-Type"] = "application/json";
  if (authId) {
    headers["Authorization"] = `Bearer ${authId}`;
  }
  return headers;
};

async function fetchData(
  url: string,
  method: string,
  authId?: string,
  onUnauthorized?: () => void,
  data?: any
): Promise<any> {
  const request: RequestInit = {
    method: method,
    headers: getHeaders(authId),
  };
  if (data !== undefined) {
    request.body = JSON.stringify(data);
  }
  const response = await fetch(url, request);
  if (response.status <= 400) return response.json();
  if (response.status === 401) {
    onUnauthorized && onUnauthorized();
    throw new Error("لطفا مجددا لاگین کنید");
  } else throw new Error("خطایی رخ داده است");
}

async function fetchFile(
  url: string,
  method: string,
  authId?: string,
  onUnauthorized?: () => void,
  data?: any
): Promise<any> {
  const request: RequestInit = {
    method: method,
    headers: getHeaders(authId, true),
  };
  if (data !== undefined) {
    request.body = data;
  }
  const response = await fetch(url, request);
  if (response.status <= 400) return response.json();
  if (response.status === 401) {
    onUnauthorized && onUnauthorized();
    throw new Error("لطفا مجددا لاگین کنید");
  } else throw new Error("خطایی رخ داده است");
}

async function getDataCore(
  url: string,
  authId?: string,
  onUnauthorized?: () => void
): Promise<any> {
  return fetchData(url, "get", authId, onUnauthorized);
}
async function postDataCore(
  url: string,
  data: any,
  authId?: string,
  onUnauthorized?: () => void
): Promise<any> {
  return fetchData(url, "post", authId, onUnauthorized, data);
}

async function postFileCore(
  url: string,
  data: any,
  authId?: string,
  onUnauthorized?: () => void
): Promise<any> {
  return fetchFile(url, "post", authId, onUnauthorized, data);
}

async function putDataCore(
  url: string,
  data: any,
  authId?: string,
  onUnauthorized?: () => void
): Promise<any> {
  return fetchData(url, "put", authId, onUnauthorized, data);
}

async function deleteDataCore(
  url: string,
  data: any,
  authId?: string,
  onUnauthorized?: () => void
): Promise<any> {
  return fetchData(url, "delete", authId, onUnauthorized, data);
}

function getParams(params?: string, filters?: IGridFilter): string {
  const leadingAmpersand = /^&/;
  const tailingAmpersand = /&$/;
  params = `${refineParams(params)}&${getFilterParams(filters)}`;
  return params
    .replace(leadingAmpersand, "?")
    .replace(tailingAmpersand, "")
    .trim();
}

function getFilterParams(filters?: IGridFilter) {
  if (!filters) return "";

  let result = `_search=true&rows=${filters.rows}&page=${filters.page}`;
  if (filters.sidx) result += `&sidx=${filters.sidx}&sord=${filters.sord}`;
  result += `&filters=${encodeURIComponent(JSON.stringify(filters.filters))}`;
  return result;
}

function refineParams(params?: string) {
  return params === undefined ? "" : params;
}

function getUrl({ uri, id, params, filters }: FetchData): string {
  params = getParams(params, filters);
  return `/api/${uri}/${id === undefined ? "" : id}${params}`;
}
const getAuthId = ({ context }: FetchData) =>
  context && context.authId ? context.authId : undefined;

const getOnUnauthorized = ({ context }: FetchData) =>
  context && context.logout ? context.logout : undefined;

export function getData(props: FetchData): Promise<any> {
  const url = getUrl(props);
  const authId = getAuthId(props);
  const onUnauthorized = getOnUnauthorized(props);
  return getDataCore(url, authId, onUnauthorized);
}

export function postData(props: FetchData) {
  const url = getUrl(props);
  const authId = getAuthId(props);
  const onUnauthorized = getOnUnauthorized(props);
  return postDataCore(url, props.data, authId, onUnauthorized);
}

export function postFile(props: FetchData) {
  const url = getUrl(props);
  const authId = getAuthId(props);
  const onUnauthorized = getOnUnauthorized(props);
  return postFileCore(url, props.data, authId, onUnauthorized);
}

export function putData(props: FetchData) {
  const url = getUrl(props);
  const authId = getAuthId(props);
  const onUnauthorized = getOnUnauthorized(props);
  return putDataCore(url, props.data, authId, onUnauthorized);
}

export function deleteData(props: FetchData) {
  const url = getUrl(props);
  const authId = getAuthId(props);
  const onUnauthorized = getOnUnauthorized(props);
  return deleteDataCore(url, props.data, authId, onUnauthorized);
}
