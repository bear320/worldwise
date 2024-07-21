import styles from "./Message.module.scss";

function Message({ msg }: { msg: string }) {
  return (
    <p className={styles.message}>
      <span role="img">👋</span> {msg}
    </p>
  );
}

export default Message;
