const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const {
    AuthenticationError,
    ForbiddenError
} = require('apollo-server-express');
const gravatar = require('../config/gravatar');

const {JWT_SECRET} = require('../config/data');
const { notes } = require('./query');


const Mutation = {
    newNote: async (parent, args, { models, user }) => {
        if (!user) {
            throw new AuthenticationError('You must be signed in to create a note');
        }
        
        await models.Note.create({
            content: args.content,
            author: mongoose.Types.ObjectId(user.id)
        });
        return models.Note.find();
    },
    deleteNote: async (parent, { id }, { models, user }) => {
        if (!user) {
            throw new AuthenticationError('You need to sign in');
        }

        const note = models.Note.findById(id);

        if (note && String(notes.author) !== user.id) {
            throw new ForbiddenError("You don't have the neccessary authorization");
        }
        
        try {
            await note.remove();
            return true;
        } catch(err) {
            return false;
        }
    },
    updateNote: async (parent, { id, content }, { models, user }) => {
        if (!user) {
            throw new AuthenticationError('You need to sign in');
        }

        const note = models.Note.findById({ id });
        if(note && String(note.author) !== user.id){
            throw new ForbiddenError("you don't have the neccessary authentication")
        }

        try {
            return await models.Note.findOneAndUpdate(
                { _id: id },
                { $set: { content } },
                { new: true }
            );
        } catch (err) {
            return "error occured while updating";
        }
    },
    signUp: async (parent, { email, password, username }, { models }) => {
        email = email.trim().toLowerCase();
        const avatar = gravatar(email);
        const hashed = await bcrypt.hash(password, 10);

        try {
            const user = await models.User.create({
                username,
                email,
                avatar,
                password: hashed
            });

            return jwt.sign({ id: user._id }, JWT_SECRET);
        } catch (err) {
            console.error(err);
            throw new Error("Error Creating Account");
        }
    },
    signIn: async (parent, { email, password, username }, { models }) => {
        if (email) {
            email.trim().toLowerCase();
        }

        const user = await models.User.findOne({
            $or: [{ email }, { username }]
        });

        if (!user) {
            throw new AuthenticationError("Error Signing in");
        }

        const valid = bcrypt.compare(password, user.password);
        if (!valid) {
            throw new AuthenticationError("Error Signing in");
        }

        return jwt.sign({ id: user._id }, JWT_SECRET);
    },
    toggleFavorite: async (parent, { id }, { models, user }) => {
        if (!user) {
            throw new AuthenticationError("You need to sign in");
        }

        let noteCheck = await models.Note.findById(id);
        const hasUser = noteCheck.favoritedBy.indexOf(user.id);

        if (hasUser >= 0) {
            return await models.Note.findByIdAndUpdate(id, {
                $pull: {
                    favoritedBy: mongoose.Types.ObjectId(user.id)
                },
                $inc: {
                    favoriteCount: -1
                }
            }, {
                new: true
            }
            );
        } else {
            return await models.Note.findByIdAndUpdate(id, {
                $push: {
                    favoritedBy: mongoose.Types.ObjectId(user.id)
                },
                $inc: {
                    favoriteCount: 1
                }
            }, {
                new: true
            });
        }
    }
};

module.exports = Mutation;