import { axios } from '../Instance';

const getClients = async () => {
    
    try {
        const response = await axios.get('clients');
        return response.data;
    } catch (error) {
        throw new Error(error);
    }
};

const createClient = async (client) => {
    try {
        const response = await axios.post('clients/save', client);
        return response.data;
    } catch (error) {
        throw new Error(error);
    }
};

const getClientById = async (clientId) => {
    try {
        const response = await axios.get(`clients/${clientId}`);
        return response.data;
    } catch (error) {
        throw new Error(error);
    }
};

const updateClient = async (clientId, client) => {
    try {
        const response = await axios.put(`clients/${clientId}`, client);
        return response.data;
    } catch (error) {
        throw new Error(error);
    }
};

const deleteClient = async (clientId) => {
    try {
        const response = await axios.delete(`clients/${clientId}`);
        return response.data;
    } catch (error) {
        throw new Error(error);
    }
};

export { getClients, createClient, getClientById, updateClient, deleteClient };
