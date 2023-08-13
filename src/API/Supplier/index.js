import { axios } from '../Instance'
import { getToken } from '../token-service/token';

const getSupplier = async () => {
    try {
        const response = await axios.get('suppliers', {
            headers: {
                Authorization: getToken(),
            }
        });
        return response.data;
    } catch (error) {
        throw new Error(error);
    }
};


const createSupplier = async (supplier) => {
    try {
        const response = await axios.post('suppliers/save', supplier);
        return response.data;
    } catch (error) {
        throw new Error(error);

    }

}

const supplierLogin = async (supplier) => {
    try {
        const response = await axios.post('suppliers/login', supplier);
        return response.data;
    } catch (error) {
        throw new Error(error);

    }

}



const getSupplierById = async (supplierId) => {
    try {
        const response = await axios.get(`suppliers/${supplierId}`);
        return response.data;
    } catch (error) {
        throw new Error(error);
    }

}


const updateSupplier = async (supplierId, supplier) => {
    try {
        const response = await axios.put(`suppliers/update/${supplierId}`, supplier);
        return response.data;
    } catch (error) {
        throw new Error(error);
    }
}


const deleteSupplier = async (supplierId) => {
    try {
        const response = await axios.delete(`suppliers/delete/${supplierId}`);
        return response.data;
    } catch (error) {
        throw new Error(error);
    }
}


export { getSupplier, createSupplier, updateSupplier, getSupplierById, deleteSupplier, supplierLogin };