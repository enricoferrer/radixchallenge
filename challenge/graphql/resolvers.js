import User from "../models/User.js";


const resolvers = {
    Query: {
        async user(_, {ID}){
            return await User.findByID(ID)
        }
    },
    Mutation: {
        async createUser(_, {userInput: {name, email, password}}){
            const createdUser = new User({
                name: name,
                email: email,
                password: password,
                createdAt: new Date().toISOString()
            });

            const res = await createdUser.save();  // MongoDB salva aqui

            return {
                id: res.id,
                ...res._doc
            }
        },
        async deleteUser(_, {ID}){
            const foiDeletado = (await User.deleteOne({_id: ID})).deletedCount;
            return foiDeletado // se 1 = foi, se 0 = não foi
        },
        async editUser(_, {email, editUserInput: {password}}) {
            const foiEditado = (await User.updateOne({email: email}, {password: password})).modifiedCount;
            return foiEditado // se 1 = foi, se 0 = não foi
        }
    }
}

export default resolvers;