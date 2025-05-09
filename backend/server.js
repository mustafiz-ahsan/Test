import express from "express";
import dotenv from "dotenv";
import path from "path";
import UsersModel from "./models/user.model.js";

import { connectDB } from "./config/db.js";

// import productRoutes from "./routes/product.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

app.use(express.json()); // allows us to accept JSON data in the req.body

app.use(express.urlencoded({ extended: true }));

// app.use("/api/products", productRoutes);

// if (process.env.NODE_ENV === "production") {
// 	app.use(express.static(path.join(__dirname, "/frontend/dist")));
// 	app.get("*", (req, res) => {
// 		res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
// 	});
// }



app.get('/api/users', async (req, res) => {
    try {
        const users = await UsersModel.find();
		console.log(users);
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ✅ Create a new user
app.post('/api/users', async (req, res) => {
    try { 
		console.log(req.body);
        const { Profile_type, Email, Password } = req.body;
        const newUser = new UsersModel({ Profile_type, Email, Password });
        await newUser.save();
        res.status(201).json(newUser);
	
    }	
	 catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// ✅ Update a user
app.put('/api/users/:id', async (req, res) => {
    try {
		
        const updatedUser = await UsersModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(updatedUser);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// ✅ Delete a user
app.delete('/api/users/:id', async (req, res) => {
    try {
		console.log(req.params.id);
        const deletedUser = await UsersModel.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'User deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});































app.listen(PORT, () => {
	connectDB();
	console.log("Server started at http://localhost:" + PORT);
});
