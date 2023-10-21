import jsonfile from 'jsonfile';
import path from 'path';
import { handleJsonfileError } from '../utils/handleErrors';
const filePath = path.join(__dirname, '../../DB/orders.json');


export const saveOrder = async (order:object) => {
    try {
        const data:Record<string, object[]> = await jsonfile.readFile(filePath);
        const index = data.orders.findIndex(order => order.id === order.id);
        if (index === -1) {
            data.orders.push(order);
            jsonfile.writeFileSync(filePath, data, { spaces: 2 })
            return "The order data has been entered into the system"
        } else {
            throw new Error ("The order already exists")
        }
      } catch (error) {
        return handleJsonfileError(error);
      }
}


  