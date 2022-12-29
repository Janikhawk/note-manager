import { useRouteError } from "react-router-dom";
import Error from "../../components/Error/Error";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);
  return <Error error={error}/>;
}