import {
  createSearchParams,
  NavigateFunction,
  NavigateOptions,
  To,
  useNavigate,
  useSearchParams,
} from "react-router-dom";

export default function useAppNavigate(): NavigateFunction {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const lId = params.get("lId");
  function appNavigate(to: To, options?: NavigateOptions): void;
  function appNavigate(delta: number): void;
  function appNavigate(to: To | number, options?: NavigateOptions) {
    if (typeof to === "number") navigate(to);
    else if (!lId) navigate(to, options);
    else if (typeof to === "string")
      navigate(
        { pathname: to, search: `?${createSearchParams({ lId })}` },
        options
      );
    else if (!to.search)
      navigate({ ...to, search: `?${createSearchParams({ lId })}` }, options);
    else {
      const params = new URLSearchParams(to.search);
      params.set("lId", lId);
      navigate({ ...to, search: `?${params}` }, options);
    }
  }

  return appNavigate;
}
