const Mutation = {
    newNote: async (parent, args, {models}) => {
        let noteValue = {
            content: args.content,
            author: 'Jequex'
        };
        await models.Note.create(noteValue);
        return models.Note.find();
    }
};

module.exports = Mutation;