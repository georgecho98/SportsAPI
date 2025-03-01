import { Schema } from 'mongoose';


// This is a subdocument schema, it won't become its own model but we'll use it as the schema for the User's `savedBooks` array in User.js
const teamSchema = new Schema({
  teamId:
    {
      type: String,
      required: true
    },
  
  conference: {
    type: String,
    required: true,
  },
  // saved book id from GoogleBooks
  division: {
    type: String,
    required: true,
  },
  city: {
    type: String,
  },
  name: {
    type: String,
  },
  full_name: {
    type: String,
  },
  abbreviation: {
    type: String,
  }
});


const Team = model('teamSchema',teamSchema);

export default Team;
