import type { Request, Response } from 'express';
// import user model
import Team from '../models/Team.js';
// import sign token function from auth
import { signToken } from '../services/auth.js';

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
    { $pull: { savedTeam: { teamId: req.params.teamId } } },
    { new: true }
  );
  if (!updatedUser) {
    return res.status(404).json({ message: "Couldn't find Team with this id!" });
  }
  return res.json(updatedTeam);
};
