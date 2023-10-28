import jsonfile from 'jsonfile';
import path from 'path';
import { handleJsonfileError } from '../utils/handleErrors';
const filePath = path.join(__dirname, '../../DB/orders.json');
import {editCredit} from "../users/services/usersApiService"

interface User{
  _id: string,
  isAdmin: boolean,
  iat: number
}

export const saveOrder = async (order:object, user:{email:string, password:string}) => {
    try {
        const data:Record<string, object[]> = await jsonfile.readFile(filePath);
        const amount = order.purchase_units[0].amount.value
        
        const index = data.orders.findIndex(order => order.id === order.id);
        if (index === -1) { 
          
          const massage = await editCredit(user.email, 1.00)
          if (massage !== null){
            return massage
          }
          data.orders.push(order);
            jsonfile.writeFileSync(filePath, data, { spaces: 2 })
            return "success - The order data has been entered into the system"
        } else {
            return "We checked, this order has already been entered into the system before and used"
        }
      } catch (error) {        
        return handleJsonfileError(error);
      }
}


  