import { gql } from '@apollo/client';

export const QUERY_TEAM = gql`
  query team($_id:String) {
    team(_id:$_id) {
      _id
      teamId
      conference
      division
      city
      name
      full_name
      abbreviation
 
    }
  }
`;

