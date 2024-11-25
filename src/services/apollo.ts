import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
export const client = new ApolloClient({
  uri: "https://countries.trevorblades.com/graphql",
  cache: new InMemoryCache()
});

export const GET_COUNTRIES = gql`
  query GetCountries {
    countries {
      code
      name
      capital
      continent {
        name
        code
      }
      languages {
        name
        code
      }
      currency
      emoji
      states {
        name
        code
      }
      native
      phone
    }
  }
`;

