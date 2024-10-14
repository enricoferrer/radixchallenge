import User from "../models/User.js";
import { DateTime } from 'luxon';
import Equipment from "../models/Equipment.js"


const dataAtual = DateTime.now().setZone('America/Sao_Paulo');

const resolvers = {
    Query: {
        async userLogin(_, {email, password}){
            const user = await User.findOne({email});
            if (!user){
                throw new Error('Não há nenhum usuario com esse email!');
            }

            const senhaCorreta = (user.password == password);
            if (!senhaCorreta) {
                throw new Error('Senha Incorreta');
            }

            return {
                name: user.name,
                email: user.email,
                createdAt: user.createdAt
            }

        },
        async getEmailDuplicate(_, {email}){
            const duplicado = await User.findOne({email});
            
            if(duplicado) {
                return true;
            } else {
                return false;
            }
            
        },
        async equipment(_, {equipmentId}){
            const [equipamentosLista] = await Equipment.find({equipmentId});
            return {
                equuipmentId: equipamentosLista.equipmentId,
                timestamp: equipamentosLista.timestamp,
                value: equipamentosLista.value
            }
        },
        getEquipment24h: async (_, { filter }) => {
            const query = {};
            
            
            if (filter && filter.timestamp_gte) {
                query.timestamp = { $gte: new Date(filter.timestamp_gte).toISOString() };
            }
      
            
            return await Equipment.find(query).exec();
        }
    },
    Mutation: {
        async createUser(_, {userInput: {name, email, password}}){
            
            const createdUser = new User({
                name: name,
                email: email,
                password: password,
                createdAt: dataAtual.toString()
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
        },
        async createEquipment(_, {input}){
            const novosEquipment = await Equipment.insertMany(input);
            console.log(novosEquipment)
            return novosEquipment.map(equipment => ({
                equipmentId: equipment.equipmentId,
                timestamp: equipment.timestamp,
                value: equipment.value
              }));
        }
    }
}

export default resolvers;