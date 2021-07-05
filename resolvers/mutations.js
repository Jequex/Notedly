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
    }
};

module.exports = Mutation;