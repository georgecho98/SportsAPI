
import { saveTeam, deleteTeam } from '../controllers/user-controller.js';
import  Team from '../models/Team.js';
import { signToken, AuthenticationError } from '../services/auth.js';


const resolvers = {
    Query: {
        me: async (_parent, _args, context) => {

            if (context.user) {

                const userData = await User.findOne({ _id: context.user._id }).select('-__v -password');
                return userData;
            }
            throw new AuthenticationError('User not authenticated');
        },
    },


    Mutation: {


        saveTeam: async (_parent, {saveTeamData }, context) => {
            if (context.user) {
                const team = await Team.findOneAndUpdate(
                    { _id: context.team._id },
                    { $addToSet: { saveTeam } },
                    { new: true }
                );

                return team;
            }
            throw new AuthenticationError('You need to be logged in!');
        },

        removeTeam: async (_parent, { teamId }, context)=> {
            if (context) {
                const removeB = await Team.findOneAndUpdate(
                    { _id: context.team._id },
                    { $pull: { savedTeam: { teamId } } },
                    { new: true }
                );


                return removeB;
            }
            throw new AuthenticationError('You need to be logged');
        }

    }

}

export default resolvers;

        // addUser: async (_parent, _args) => {
        //     const user = await User.create(_args)
        //     const token = signToken(user.username, user.email, user._id)
        //     return { user, token };
        // },

        // login: async (_parent, _args) => {

        //     const user = await User.findOne({ email: _args.email })
        //     if (!user) {
        //         throw new AuthenticationError('Could not authenticate user.');
        //     }

        //     // Check if the provided password is correct
        //     const correctPw = await user.isCorrectPassword(_args.password);

        //     // If the password is incorrect, throw an AuthenticationError
        //     if (!correctPw) {
        //         throw new AuthenticationError('Could not authenticate user.');
        //     }
        //     const token = signToken(user.username, user.email, user._id)
        //     return { user, token };
        // },        // addUser: async (_parent, _args) => {
        //     const user = await User.create(_args)
        //     const token = signToken(user.username, user.email, user._id)
        //     return { user, token };
        // },

        // login: async (_parent, _args) => {

        //     const user = await User.findOne({ email: _args.email })
        //     if (!user) {
        //         throw new AuthenticationError('Could not authenticate user.');
        //     }

        //     // Check if the provided password is correct
        //     const correctPw = await user.isCorrectPassword(_args.password);

        //     // If the password is incorrect, throw an AuthenticationError
        //     if (!correctPw) {
        //         throw new AuthenticationError('Could not authenticate user.');
        //     }
        //     const token = signToken(user.username, user.email, user._id)
        //     return { user, token };
        // },