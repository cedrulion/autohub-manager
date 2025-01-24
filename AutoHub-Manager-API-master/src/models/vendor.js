import mongoose from "mongoose";

const vendorSchema = new mongoose.Schema({
  businessname: String,
  address: String, 
  regno: Number, 
  businessemail: String, 
  role: {
    type: String,
    default: "VENDOR",
  },
  password: String, 
});

const Vendor = mongoose.model("VENDOR", vendorSchema);

export default Vendor;
