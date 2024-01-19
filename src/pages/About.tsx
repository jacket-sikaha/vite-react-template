import { Link } from "react-router-dom";
import { useAppSelector } from "../store/hook";

export default function About() {
  const count = useAppSelector((state) => state.counter.value);
  return (
    <>
      <main>
        <h2>Who are we?</h2>
        <p>That feels like an existential question, don't you think?</p>
        <div>{count}</div>
      </main>
      <nav>
        <Link to="/">Home</Link>
      </nav>
    </>
  );
}
