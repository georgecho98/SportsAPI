import { gql } from '@apollo/client';

// export const LOGIN_USER = gql`
//   mutation login($email: String!, $password: String!) {
//     login(email: $email, password: $password) {
//       _id
//       email
      
//     }
//   }
// `;

// export const ADD_USER = gql`
//   mutation addUser($username:String, $email: String!, $password: String!) {
//     addUser(username: $username,email: $email, password: $password) {
//       _id
//       username
//       email
      
     
//     }
//   }
// `;
export const SAVE_TEAM = gql`
  mutation saveTeam($conference:[String] , $division:String, $city:String, $teamId:ID!, $name:String, $full_name:String, $abbreviation:String) {
    saveTeam(conference:$conference , division:$division, city:$city, teamId:$teamId, name:$name, full_name:$full_name, abbreviation:$abbreviation) {
        teamId
        conference
        division
        city
        name
        abbreviation
    }
  }
`;

export const REMOVE_TEAM = gql`
  mutation removeTeam($teamId:ID) {
    removeTeam(teamId:$teamId) {
      _id
      teamId
    }
  }
`;
