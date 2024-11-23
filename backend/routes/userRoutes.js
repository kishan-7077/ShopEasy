const express = require("express");
const router = express.Router();
const { StatusCodes } = require("http-status-codes");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;

const User = require("../models/userModel");

// get all the users
router.get("/", async (req, res) => {
	try {
		const users = await User.find();
		res.json({ users });
	} catch (error) {
		console.error("Error fetching user details");
	}
});

// get specific user details
router.post("/details", async (req, res) => {
	const userId = req.body;
	try {
		const user = await User.findOne({ _id: userId });
		res.json({
			userId: user._id,
			userName: user.userName,
			email: user.email,
		});
	} catch (error) {
		res.status(404).json(error);
	}
});

router.post("/signup", async (req, res) => {
	const { userName, email, password } = req.body;
	try {
		const hashedPassword = await bcrypt.hash(password, 10);

		const newUser = new User({
			userName: userName,
			email: email,
			password: hashedPassword,
		});

		await newUser.save();

		const token = jwt.sign({ userId: newUser._id }, JWT_SECRET);

		res
			.status(StatusCodes.CREATED)
			.json({ message: "User created successfully", token });
	} catch (error) {
		res
			.status(StatusCodes.INTERNAL_SERVER_ERROR)
			.json({ message: "Error in creating user" });
		console.log("error creating user");
	}
});

router.post("/login", async (req, res) => {
	const { email, password } = req.body;

	// console.log(email, password);

	try {
		const user = await User.findOne({ email: email });
		if (user) {
			const isPasswordValid = await bcrypt.compare(password, user.password);
			if (!isPasswordValid) {
				return res
					.status(StatusCodes.UNAUTHORIZED)
					.json({ message: "Password incorrect" });
			}

			const token = jwt.sign({ userId: user._id }, JWT_SECRET);

			res
				.status(StatusCodes.OK)
				.json({ message: "Logged in successfully", token });
		} else {
			res.status(StatusCodes.NOT_FOUND).json("invalid email");
		}
	} catch (error) {
		res
			.status(StatusCodes.INTERNAL_SERVER_ERROR)
			.json({ message: "Error during login" });
		console.error("Error during login:", error);
	}
});

router.post("/logout", (req, res) => {
	// To "logout," the client must remove the token.
	// You can optionally handle token blacklisting or expiration here.
	res.status(StatusCodes.OK).json({ message: "Logged out successfully" });
});

// Middleware to verify JWT
const authenticateToken = (req, res, next) => {
	const token = req.headers["authorization"]?.split(" ")[1];
	console.log("Token Received:", token);

	if (!token) {
		return res
			.status(StatusCodes.UNAUTHORIZED)
			.json({ message: "No token provided" });
	}

	jwt.verify(token, JWT_SECRET, (err, decoded) => {
		if (err) {
			console.error("JWT Verification Error:", err.message);
			return res
				.status(StatusCodes.FORBIDDEN)
				.json({ message: "Invalid token" });
		}

		console.log("Decoded Token:", decoded);
		req.user = decoded; // Attach the user info to the request
		next();
	});
};

router.get("/isAuthorized", authenticateToken, (req, res) => {
	res.status(StatusCodes.OK).json({
		message: "User Successfully Authenticated",
		userId: req.user.userId,
	});
});

module.exports = router;
