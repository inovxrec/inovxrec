require('dotenv').config();
const mongoose = require('mongoose');
const Project = require('./models/Project');
const Event = require('./models/Event');
const TeamMember = require('./models/TeamMember');
const Statistic = require('./models/Statistic');

const projects = [
    {
        title: "MarketSentry AI",
        category: "AI_&_DATA",
        description: "A high-performance sentiment analysis engine for real-time market prediction. Uses advanced NLP to process global news feeds and social media trends.",
        tech: ["Next.js", "Python", "TensorFlow", "Redis"],
        image: "/marketsentry_ai_project_inovx_1772303830388.png",
        color: "bg-blue-500"
    },
    {
        title: "ChainLedger",
        category: "BLOCKCHAIN",
        description: "Decentralized supply chain management for SMEs. Enhances transparency and traceability from manufacturer to consumer using smart contracts.",
        tech: ["Solidity", "Ether.js", "React", "PostgreSQL"],
        image: "/chainledger_project_inovx_1772303847959.png",
        color: "bg-amber-500"
    }
];

const events = [
    {
        date: "March 15, 2025",
        title: "InovX Launchpad",
        description: "The official kickoff event for the new semester. Meet the core team, learn about our upcoming projects, and join the most innovative community on campus.",
        location: "Main Auditorium",
        category: "Community",
        color: "bg-blue-500",
        image: "/launchpad_event_inovx_1772302454467.png"
    }
];

const team = [
    {
        name: "Alex Rivera",
        role: "Club President",
        bio: "Visionary leader with a passion for bridging the gap between hardware engineering and venture capital.",
        socials: { linkedin: "#" },
        order: 1
    },
    {
        name: "Sarah Chen",
        role: "Tech Director",
        bio: "Full-stack architect specializing in high-concurrency systems and decentralized networks.",
        socials: { github: "#" },
        order: 2
    }
];

const stats = [
    { label: "Members", value: 500, suffix: "+", order: 1 },
    { label: "Projects Launched", value: 50, suffix: "+", order: 2 },
    { label: "Events Hosted", value: 200, suffix: "+", order: 3 },
    { label: "Industry Partners", value: 12, suffix: "+", order: 4 }
];

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to MongoDB for seeding...");

        await Project.deleteMany({});
        await Project.insertMany(projects);
        console.log("Projects seeded!");

        await Event.deleteMany({});
        await Event.insertMany(events);
        console.log("Events seeded!");

        await TeamMember.deleteMany({});
        await TeamMember.insertMany(team);
        console.log("Team members seeded!");

        await Statistic.deleteMany({});
        await Statistic.insertMany(stats);
        console.log("Statistics seeded!");

        console.log("Seeding completed successfully!");
        process.exit();
    } catch (error) {
        console.error("Error seeding database:", error);
        process.exit(1);
    }
};

seedDB();
