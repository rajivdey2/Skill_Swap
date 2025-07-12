// ------------------ IMPORTS ------------------
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // Load .env for MONGO_URI and PORT

const app = express();
app.use(cors());
app.use(express.json());

// ------------------ DATABASE CONNECTION ------------------
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ Mongo Error:", err));

// ------------------ USER MODEL ------------------
const userSchema = new mongoose.Schema({
  name: String,
  location: String,
  profilePhoto: String, // URL (optional)
  skillsOffered: [String],
  skillsWanted: [String],
  availability: String, // Example: "weekends", "evenings"
  isPublic: { type: Boolean, default: true },
  isBanned: { type: Boolean, default: false },
  feedbacks: [String]
});

const User = mongoose.model('User', userSchema);

// ------------------ SWAP MODEL ------------------
const swapSchema = new mongoose.Schema({
  requester: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  skillOffered: String,
  skillWanted: String,
  status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' }
});

const Swap = mongoose.model('Swap', swapSchema);

// ------------------ ROUTES ------------------

// 🟢 Create a user profile
app.post('/create-user', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create user' });
  }
});

// 🟢 Get all public users or search by skill
app.get('/users', async (req, res) => {
  try {
    const skill = req.query.skill;
    const filter = { isPublic: true, isBanned: false };
    if (skill) {
      filter.$or = [
        { skillsOffered: skill },
        { skillsWanted: skill }
      ];
    }
    const users = await User.find(filter);
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// 🟢 Create a swap request
app.post('/request-swap', async (req, res) => {
  try {
    const swap = new Swap(req.body);
    await swap.save();
    res.status(201).json(swap);
  } catch (err) {
    res.status(500).json({ error: 'Swap creation failed' });
  }
});

// 🟢 Get all swap requests for a user
app.get('/swap-requests/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const swaps = await Swap.find({
      $or: [{ requester: userId }, { receiver: userId }]
    }).populate('requester receiver', 'name');
    res.json(swaps);
  } catch (err) {
    res.status(500).json({ error: 'Could not fetch swaps' });
  }
});

// 🟡 Accept or reject swap
app.patch('/swap/:id', async (req, res) => {
  try {
    const swap = await Swap.findByIdAndUpdate(req.params.id, {
      status: req.body.status
    }, { new: true });
    res.json(swap);
  } catch (err) {
    res.status(500).json({ error: 'Could not update swap' });
  }
});

// 🔴 Delete unaccepted swap
app.delete('/swap/:id', async (req, res) => {
  try {
    const swap = await Swap.findById(req.params.id);
    if (swap.status === 'pending') {
      await Swap.findByIdAndDelete(req.params.id);
      res.json({ message: 'Swap deleted' });
    } else {
      res.status(400).json({ error: 'Only pending swaps can be deleted' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete swap' });
  }
});

// 🌟 Submit feedback after swap
app.post('/feedback/:userId', async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.params.userId, {
      $push: { feedbacks: req.body.feedback }
    });
    res.json({ message: 'Feedback submitted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to submit feedback' });
  }
});

// ------------------ ADMIN ROUTES ------------------

// 🔐 Ban a user
app.patch('/admin/ban/:userId', async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.params.userId, { isBanned: true });
    res.json({ message: 'User banned' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to ban user' });
  }
});

// 🔐 Reject inappropriate skills (clears the lists)
app.patch('/admin/clear-skills/:userId', async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.params.userId, {
      skillsOffered: [],
      skillsWanted: []
    });
    res.json({ message: 'Skills cleared' });
  } catch (err) {
    res.status(500).json({ error: 'Could not clear skills' });
  }
});

// 🔐 Get reports
app.get('/admin/reports', async (req, res) => {
  try {
    const users = await User.find();
    const swaps = await Swap.find();
    res.json({ users, swaps });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch reports' });
  }
});

// ------------------ START SERVER ------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
