import { gql, useQuery } from "@apollo/client";
import { getUser } from "./graphql/query/query";

function App() {
  const { data, loading, error } = useQuery(gql(getUser));
  if (error) return <div>Error</div>;
  console.log(data);
  return <div>{loading ? <div>Loading</div> : <div>App</div>}</div>;
}

export default App;
