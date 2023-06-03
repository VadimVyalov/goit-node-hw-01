const fs = require("fs").promises;
const path = require("path");
const short = require("short-uuid");

const contactPath = path.join(__dirname, "./db/contacts.json");
/**
 * Show list contacts from file "./db/contacts.json"
 */
const listContacts = async () => {
  try {
    const data = await fs.readFile(contactPath, "utf-8");
    const contacts = JSON.parse(data);
    console.table(contacts);
  } catch (error) {
    console.log(error);
  }
};
/**
 * Show unique contact by id
 * @param {string} contactId - search contact id
 *
 */
const getContactById = async (contactId) => {
  try {
    const data = await fs.readFile(contactPath, "utf8");
    const contacts = JSON.parse(data);
    console.table(contacts.filter((item) => item.id === contactId));
  } catch (error) {
    console.log(error);
  }
};
/**
 * remove unique  contact by id
 * @param {string} contactId - search contact id
 *
 */
const removeContact = async (contactId) => {
  try {
    const data = await fs.readFile(contactPath, "utf-8");
    const filterContacts = JSON.parse(data).filter(
      (item) => item.id !== contactId
    );
    await fs.writeFile(contactPath, JSON.stringify(filterContacts));
    console.log("Контакт видалено ");
  } catch (error) {
    console.log(error);
  }
};
/**
 * append new contact to file "./db/contacts.json"
 * @param {string} name - name new contact
 * @param {string} email - email new contact
 * @param {string} phone - phone new contact
 *
 */
const addContact = async (name, email, phone) => {
  try {
    const data = await fs.readFile(contactPath, "utf-8");
    const contacts = JSON.parse(data);
    const newContact = {
      id: short.generate(),
      name,
      email,
      phone,
    };
    contacts.push(newContact);
    await fs.writeFile(contactPath, JSON.stringify(contacts));
    console.log("Контакт додано ");
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
