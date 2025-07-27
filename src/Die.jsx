export default function Die(props) {
  const styles = {
    backgroundColor: props.isClicked ? "#59E391" : "rgb(177, 177, 177)",
    border: props.isClicked ? "2px solid #59E391" : "1px solid #000"
  };

  return (
    <button
      style={styles}
      className={props.rolling ? "die roll" : "die"}
      onClick={() => props.hold(props.id)}
    >
      {props.value}
    </button>
  );
}
