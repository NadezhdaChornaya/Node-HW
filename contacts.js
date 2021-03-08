const { uuid } = require('uuidv4');
const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.join(__dirname, './db/contacts.json');


const listContacts = async () => {
    try {
        const contacts = await (fs.readFile(contactsPath))
        console.table(JSON.parse(contacts));
    } catch (error) {
        console.log(error)
    }
}

const getContactById = async (contactId) => {
    try {
        const contacts = await (fs.readFile(contactsPath))
        const contact = JSON.parse(contacts).find(item =>
            item.id === contactId)
        console.table(contact)
    } catch (error) {
        console.log(error)
    }
}

const removeContact = async (contactId) => {
    try {
        const contacts = await (fs.readFile(contactsPath))
        const arr = JSON.parse(contacts);
        const contact = arr.filter(item =>
            item.id !== contactId)
        await fs.writeFile(contactsPath, JSON.stringify(contact))
        console.table(contact)
    } catch (error) {
        console.log(error)
    }
}


const addContact = async (name, email, phone) => {
    try {
        const newContact = {
            id: uuid(),
            name,
            email,
            phone,
        }
        const contacts = await (fs.readFile(contactsPath))
        const newContactsList = [...JSON.parse(contacts), newContact];
        await fs.writeFile(contactsPath, JSON.stringify(newContactsList));
        console.table(newContactsList)
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
};