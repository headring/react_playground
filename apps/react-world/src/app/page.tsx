import { TestSuspension } from "./_components/TestSuspension";

export const fetchAritcle = () => {
  return fetch("https://api.realworld.build/api/articles?limit=10&offset=0");
};

export default function Page() {
  // const data = fetchAritcle();

  return (
    <h1 className="text-3xl font-bold underline">
      <div>Real World - Conduit</div>
      <div>Home, sign, sign up</div>
      <TestSuspension testData="This is a test message" />
    </h1>
  );
}
