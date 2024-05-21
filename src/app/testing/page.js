import DynamicMap from "../components/DynamicMap";
import "../style/page.css";

// `app/page.js` is the UI for the `/` URL
export default function Page() {
  return (
    <>
      <h1>Hello, Home page!</h1>
      <DynamicMap longitude={-61} latitude={-21}/>
    </>
  );
}
