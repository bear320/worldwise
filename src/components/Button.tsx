import styles from "./Button.module.scss";

const Button = ({
  children,
  type,
  onClick,
}: {
  children: string;
  type?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}) => {
  return (
    <button className={`${styles.btn} ${styles[type!]}`} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
