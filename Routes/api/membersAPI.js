const express = require('express');
const router = express.Router();

const uuid = require('uuid');
const members = require('../../Members');

// Creating a route to get content
router.get('/', (req, res) => {
  res.json(members);
});

// return a single Member
router.get('/:id', (req, res) => {
  // res.send(req.params.id); // returns the id of the member

  // check the record exists
  const found = members.some((member) => member.id === parseInt(req.params.id));
  if (found) {
    // return the record
    res.json(members.filter((member) => member.id === parseInt(req.params.id)));
  } else {
    // throw an error
    res
      .status(400)
      .json({ msg: 'Member Not Found With ID = ' + req.params.id });
  }
});

// Create a new member
router.post('/', (req, res) => {
  const newMember = {
    id: uuid.v4(),
    name: req.body.name,
    age: req.body.age,
  };

  if (!newMember.name || !newMember.age) {
    res
      .status(400)
      .json({ msg: 'Please include name and age for new member.' });
  } else {
    members.push(newMember);
    res.json(members);
  }
});

// Update a Member
router.put('/:id', (req, res) => {
  // res.send(req.params.id); // returns the id of the member

  // check the record exists
  const found = members.some((member) => member.id === parseInt(req.params.id));
  if (found) {
    // update the record
    const updateMember = req.body;
    members.forEach((member) => {
      if (member.id === parseInt(req.params.id)) {
        member.name = updateMember.name ? updateMember.name : member.name;
        member.age = updateMember.age ? updateMember.age : member.age;
        res.status(200).json({ msg: 'Member Updated', member });
      }
    });
  } else {
    // throw an error
    res
      .status(400)
      .json({ msg: 'Member Not Found With ID = ' + req.params.id });
  }
});

module.exports = router;
