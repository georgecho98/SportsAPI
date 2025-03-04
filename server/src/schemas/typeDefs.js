
const typeDefs =` 
    type Query {
        me(_id: ID!): User 
    }

    type AllTeam {
        _id: ID!
        username: String
        email: String
       }

    type Team {
        teamId: ID!
        conference: String
        division: String
        city: String
        name: String
        full_name: String
        abbreviation: String
    }

    
    
    type Auth{
        token: String
        user: User
    
    }
    
    type Mutation {
        
        saveTeam(conference:String, division:String, city:String, teamId: ID!, name:String, full_name:String, abbreviation:String):User
        removeTeam(teamId: ID!):User
    
    }`;

export default typeDefs;