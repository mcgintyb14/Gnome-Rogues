// const router = require('express').Router();
// const { Character, Hand } = require('../../models');
// const { generateUniqueId } = require('../../utils/uniequeid');

// router.post('/submit-form', async (req, res) => {
//     try {
//         // Extract form data from the request body
//         const { username, password, email, characterName } = req.body;

//         // Create a new User entry
//         const newUser = await User.create({ username, password, email });

//         // Create a new Character entry associated with the user
//         const newCharacter = await Character.create({ name: characterName, UserId: newUser.id });

//         // Redirect the user to a confirmation page or any other page
//         res.redirect('/confirmation');
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ error: 'Failed to process the form submission' });
//     }
// });
