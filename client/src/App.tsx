import { gql, useLazyQuery, useQuery } from "@apollo/client";
import { getUser } from "./graphql/query/query";

function App() {
  const [fetchUser, { data, loading, error }] = useLazyQuery(gql(getUser));
  if (error) return <div>Error</div>;
  console.log(data);
  return (
    <>
      {loading ? (
        <div>Loading</div>
      ) : (
        <div>
          {data?.users.map((user) => (
            <p>{user.name}</p>
          ))}
          <button onClick={() => fetchUser()}>Fetch User</button>
        </div>
      )}
    </>
  );
}

export default App;
