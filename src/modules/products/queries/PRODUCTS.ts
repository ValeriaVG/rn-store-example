import {gql} from 'lib/graphql';
export default gql`
  query($after: ID, $limit: Int) {
    items {
      id
      article
      title
      description
      price
      parameters {
        label
        value
      }
    }
    nextAfter
  }
`;
