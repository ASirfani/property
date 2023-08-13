
import { axios } from '../Instance'

const adminLogin = async (admin) => {
    try {
        const response = await axios.post('admin/login', admin);
        return response.data;
    } catch (error) {
        throw new Error(error);
    }


}



export {adminLogin}