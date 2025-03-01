
// import user model
import Team from '../models/Team.js';
// import sign token function from auth
import { signToken } from '../services/auth.js';

// // get a single user by either their id or their username
// export const getTeam = async (req, res) => {
//   const foundUser = await User.findOne({
//     $or: [{ _id: req.user ? req.user._id : req.params.id }, { username: req.params.username }],
//   });

//   if (!foundUser) {
//     return res.status(400).json({ message: 'Cannot find a user with this id!' });
//   }

//   return res.json(foundUser);
// };

// // create a user, sign a token, and send it back (to client/src/components/SignUpForm.js)
// export const createUser = async (req, res) => {
//   const user = await User.create(req.body);

//   if (!user) {
//     return res.status(400).json({ message: 'Something is wrong!' });
//   }
//   const token = signToken(user.username, user.password, user._id);
//   return res.json({ token, user });
// };

// // login a user, sign a token, and send it back (to client/src/components/LoginForm.js)
// // {body} is destructured req.body
// export const login = async (req, res) => {
//   const user = await User.findOne({ $or: [{ username: req.body.username }, { email: req.body.email }] });
//   if (!user) {
//     return res.status(400).json({ message: "Can't find this user" });
//   }

//   const correctPw = await user.isCorrectPassword(req.body.password);

//   if (!correctPw) {
//     return res.status(400).json({ message: 'Wrong password!' });
//   }
//   const token = signToken(user.username, user.password, user._id);
//   return res.json({ token, user });
// };

// save a book to a user's `savedBooks` field by adding it to the set (to prevent duplicates)
// user comes from `req.user` created in the auth middleware function
export const saveTeam = async (req, res) => {
  try {
    const updatedTeam = await Team.findOneAndUpdate(
      { _id: req.Team._id },
      { $addToSet: { savedTeam: req.body } },
      { new: true, runValidators: true }
    );
    return res.json(updatedTeam);
  } catch (err) {
    console.log(err);
    return res.status(400).json(err);
  }
};

// remove a book from `savedBooks`
export const deleteTeam = async (req, res) => {
  const updatedTeam = await User.findOneAndUpdate(
    { _id: req.Team._id },
    { $pull: { savedTeam: { teamId: req.params.tId } } },
    { new: true }
  );
  if (!updatedUser) {
    return res.status(404).json({ message: "Couldn't find Team with this id!" });
  }
  return res.json(updatedTeam);
};
