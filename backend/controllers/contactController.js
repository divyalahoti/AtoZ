import Contact from "../models/contactModel.js";

export const submitContact = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // 🔹 Save to MongoDB
    const newContact = new Contact({
      name,
      email,
      message,
    });

    await newContact.save();

    res.status(200).json({
      success: true,
      message: "Message saved successfully",
    });

  } catch (error) {
    console.error("Contact Error:", error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};