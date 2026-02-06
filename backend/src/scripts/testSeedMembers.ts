import dotenv from "dotenv";
import mongoose from "mongoose";

import Member from "../models/Member";

dotenv.config();

//
// TESTING ONLY!!!
//

const sampleMembers = [
  {
    name: "Alice Guo",
    location: "United States",
    role: "Director of Operations",
    linkedin: "https://linkedin.com/in/johndoe",
    email: "john@example.com",
    headshot: "/imgs/donorHero.png",
  },
  {
    name: "Sylvie Tran",
    location: "United States",
    role: "Senior Manager",
    linkedin: "https://linkedin.com/in/johndoe",
    email: "john@example.com",
    headshot: "/imgs/donorHero.png",
  },
  {
    name: "Alice Guo",
    location: "United States",
    role: "Director of Operations",
    linkedin: "https://linkedin.com/in/johndoe",
    email: "john@example.com",
    headshot: "/imgs/donorHero.png",
  },
  {
    name: "Sylvie Tran",
    location: "United States",
    role: "Senior Manager",
    linkedin: "https://linkedin.com/in/johndoe",
    email: "john@example.com",
    headshot: "/imgs/donorHero.png",
  },
  {
    name: "Alice Guo",
    location: "United States",
    role: "Director of Operations",
    linkedin: "https://linkedin.com/in/johndoe",
    email: "john@example.com",
    headshot: "/imgs/donorHero.png",
  },
  {
    name: "Jeff Antony",
    location: "Italy",
    role: "Lead Developer",
    linkedin: "https://linkedin.com/in/johndoe",
    email: "john@example.com",
    headshot: "/imgs/donorHero.png",
  },
  {
    name: "Alice Guo",
    location: "China",
    role: "Data Scientist",
    linkedin: "https://linkedin.com/in/johndoe",
    email: "john@example.com",
    headshot: "/imgs/donorHero.png",
  },
  {
    name: "Sylvie Tran",
    location: "India",
    role: "UX Designer",
    linkedin: "https://linkedin.com/in/johndoe",
    email: "john@example.com",
    headshot: "/imgs/donorHero.png",
  },
  {
    name: "Jeff Antony",
    location: "Spain",
    role: "UX Designer",
    linkedin: "https://linkedin.com/in/johndoe",
    email: "john@example.com",
    headshot: "/imgs/donorHero.png",
  },
  {
    name: "Alice Guo",
    location: "Australia",
    role: "UX Designer",
    linkedin: "https://linkedin.com/in/johndoe",
    email: "john@example.com",
    headshot: "/imgs/donorHero.png",
  },
];

const seedDB = async () => {
  if (!process.env.MONGO_URI) {
    console.error("MONGO_URI is missing in .env");
    process.exit(1);
  }

  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.info("Connected to MongoDB");

    const deleteResult = await Member.deleteMany({});
    console.info(`Cleared ${deleteResult.deletedCount} existing members.`);

    const insertResult = await Member.insertMany(sampleMembers);
    console.info(`Inserted ${insertResult.length} new members successfully.`);

    await mongoose.disconnect();
    console.info("Disconnected");
    process.exit(0);
  } catch (err) {
    console.error("Error seeding database:", err);
    process.exit(1);
  }
};

void seedDB();
