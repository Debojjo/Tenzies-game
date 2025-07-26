export default function Die (props) {
    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "rgb(177, 177, 177)",
        border: props.isHeld ? "2px solid #59E391" : "1px solid #000"
    };
    return (
         <button style={styles} onClick={() => props.hold(props.id)}>{props.value}</button>
    )
}