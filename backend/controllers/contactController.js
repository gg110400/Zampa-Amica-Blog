import Contact from '../models/Contact.js';

export const submitContactForm = async (req, res) => {
  const contact = new Contact(req.body);
  try {
    const newContact = await contact.save();
    res.status(201).json(newContact);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateContactStatus = async (req, res) => {
  try {
    const updatedContact = await Contact.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    if (updatedContact) {
      res.json(updatedContact);
    } else {
      res.status(404).json({ message: 'Contact not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};