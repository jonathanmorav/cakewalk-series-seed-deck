import { Deck } from "./components/Deck";
import { slides } from "./deck/slides";

export default function App() {
  return <Deck slides={slides} />;
}
