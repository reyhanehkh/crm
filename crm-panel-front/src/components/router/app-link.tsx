import {
  Link,
  LinkProps,
  useSearchParams,
  createSearchParams,
} from "react-router-dom";

export default function AppLink({ to, className, children }: LinkProps) {
  const [params] = useSearchParams();
  const lId = params.get("lId");
  if (typeof to === "number")
    return <Link to={to} className={className} children={children} />;
  else if (!lId)
    return <Link to={to} className={className} children={children} />;
  else if (typeof to === "string")
    return (
      <Link
        to={{ pathname: to, search: `?${createSearchParams({ lId })}` }}
        className={className}
        children={children}
      />
    );
  else if (!to.search)
    return (
      <Link
        to={{ ...to, search: `?${createSearchParams({ lId })}` }}
        className={className}
        children={children}
      />
    );
  else {
    const params = new URLSearchParams(to.search);
    params.set("lId", lId);
    return (
      <Link
        to={{ ...to, search: `?${params}` }}
        className={className}
        children={children}
      />
    );
  }
}
