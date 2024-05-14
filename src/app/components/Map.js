import MyMap from "./MapCenteredPlainLeaflet";
export default class Map extends Component {
  state = {
    locations: [],
  };

  async componentDidMount() {
    this.state.locations = await fetch("/api/db", {
      method: "POST",
    });
  }

  render() {
    return (
      <>
        <MyMap />
      </>
    );
  }
}
