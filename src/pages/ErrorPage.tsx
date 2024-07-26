import { useRouteError } from "react-router-dom";
import styles from "./ErrorPage.module.scss";

const ErrorPage = () => {
  const error = useRouteError();
  console.error(error);

  return (
    <div className={styles.errorPage}>
      <section>
        <h1>Oops!</h1>
        <h2>Sorry, an unexpected error has occurred.</h2>
        <h2>Error: {(error as { statusText?: string }).statusText || (error as Error).message}</h2>
      </section>
    </div>
  );
};

export default ErrorPage;
