import express from "express";
import User from "../../models//Schemas.js";
import { TopologyDescriptionChangedEvent } from "mongodb";

const router = express.Router();

// GET user by id
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// add coins to user

router.post("/:id/add-coins", async (req, res) => {
  try {
    const { amount } = req.body;
    if (amount <= 0) return res.status(400).json({ message: "Invalid Amount" });

    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.coins += amount;
    await user.save();
    res.json({ coins: user.coins });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// spend coins
router.post("/:id/spend-coins", async (req, res) => {
  try {
    const { amount } = req.body;
    if (amount <= 0) return res.status(400).json({ message: "Invalid amount" });

    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.coins < amount) {
      return res.status(400).json({ message: "Not enough coins" });
    }

    user.coins -= amount;
    await user.save();
    res.json({ coins: user.coins });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//get inventory
router.get("/:id/inventory", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user.inventory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// generate item to a users inventory
router.post("/:id/inventory", async (req, res) => {
  try {
    const { creator, text, image, currentOwner } = req.body;
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.inventory.push({ creator, text, image, currentOwner });
    await user.save();

    res.json(user.inventory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// burn item
router.delete("/:id/inventory/:itemId", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.inventory = user.inventory.filter(
      (item) => item._id.toString() !== req.params.itemId
    );

    await user.save();
    res.json(user.inventory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//transfer item
router.post("/transfer-item", async (req, res) => {
  try {
    const { itemId, fromUserId, toUserId } = req.body;

    if (!itemId || !fromUserId || !toUserId) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const fromUser = await User.findById(fromUserId);
    const toUser = await User.findById(toUserId);

    if (!fromUser || !toUser) {
      return res.status(404).json({
        message: "One or both users not found",
      });
    }

    const itemIndex = fromUser.inventory.findIndex(
      (item) => item._id.toString() === itemId
    );

    if (itemIndex === -1) {
      return res
        .status(404)
        .json({ message: "Item not found in sender's inventory" });
    }

    const [item] = fromUser.inventory.splice(itemIndex, 1);

    item.currentOwner = toUser._id.toString();
    toUser.inventory.push(item);

    await fromUser.save();
    await toUser.save();

    res.json({
      message: "Item transferred successfully",
      fromUserInventory: fromUser.inventory,
      toUserInventory: toUser.inventory,
      newOwnerId: toUser._id,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// new user experiment !remove this later
router.post("/", async (req, res) => {
  try {
    const { username } = req.body;

    if (!username)
      return res.status(400).json({ message: "Username is required" });

    const user = await User.create({ username, coins: 50, inventory: [] });

    res.status(201).json(user);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: "Username already exists" });
    }
    res.status(500).json({ message: error.message });
  }
});

export default router;
