const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {
    AuthenticationError,
    ForbiddenError
} = require('apollo-server-express');
const gravatar = require('../config/gravatar');

const {JWT_SECRET} = require('../config/data');


const Mutation = {
    newNote: async (parent, args, { models }) => {
        let noteValue = {
            content: args.content,
            author: 'Jequex'
        };
        await models.Note.create(noteValue);
        return models.Note.find();
    },
    deleteNote: async (parent, { id }, { models }) => {
        try {
            await models.Note.findOneAndRemove({ _id: id });
            return true;
        } catch(err) {
            return false;
        }
    },
    updateNote: async (parent, { id, content }, { models }) => {
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
    signIn: async (parent, { email, password, usernam }, { models }) => {
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
    }
};

module.exports = Mutation;