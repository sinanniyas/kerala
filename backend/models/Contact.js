import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: String,
  travelDate: Date,
  travelers: Number,              // new
  destination: String,            // new
  budget: String,                 // new
  purpose: String,                // new
  newsletter: { type: Boolean, default: false }, // new
  message: { type: String, required: true },
}, { timestamps: true });

const Contact = mongoose.model("Contact", contactSchema);

export default Contact;
