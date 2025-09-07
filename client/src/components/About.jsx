import React from 'react';
import '../styles/About.css';
import Navbar from './NavBar';
import Footer from './Footer';
import {
    Users,
    Shield,
    Home,
    Star,
    Award,
    Heart,
    Clock,
    CheckCircle,
    ArrowRight
} from 'lucide-react';

// Import team member images (you'll need to add these images to your project)
// For now, I'm using placeholder URLs - replace with your actual image paths

import JohnDoeImg from '../assets/Member1.png';
import MichaelChenImg from '../assets/Member2.png';
import DavidRodriguezImg from '../assets/Member3.png';

const AboutPage = () => {
    const teamMembers = [
        {
            id: 1,
            name: "Mr. John Doe",
            role: "CEO & Founder",
            bio: "Real estate expert with 15+ years experience in property management.",
            stats: "Listed 5,000+ properties",
            image: JohnDoeImg // Use imported image or path to image
        },
        {
            id: 2,
            name: "Michael Chen",
            role: "CTO",
            bio: "Tech innovator specializing in real estate platforms and AI solutions.",
            stats: "Built 10+ rental platforms",
            image: MichaelChenImg // Use imported image or path to image
        },
        {
            id: 3,
            name: "David Rodriguez",
            role: "Head of Customer Success",
            bio: "Dedicated to ensuring every client finds their perfect rental home.",
            stats: "Helped 2,000+ families",
            image: DavidRodriguezImg // Use imported image or path to image
        }
    ];

    const milestones = [
        { year: "2018", title: "Company Founded", description: "Started with a vision to revolutionize rental experiences" },
        { year: "2020", title: "1000 Properties", description: "Reached milestone of 1000 verified rental listings" },
        { year: "2022", title: "Mobile App Launch", description: "Released our award-winning mobile application" },
        { year: "2023", title: "1K Users", description: "Welcomed our Thousandth user to the platform" }
    ];

    return (
        <div className="about-page">
            <Navbar />
            
            {/* Hero Section */}
            <section className="about-hero">
                <div className="container">
                    <h1 className="hero-title">Our Story</h1>
                    <p className="hero-subtitle">
                        Revolutionizing the way people find their perfect rental homes since 2018
                    </p>
                </div>
            </section>

            {/* Mission Section */}
            <section className="mission-section">
                <div className="container">
                    <div className="section-header">
                        <h2>Our Mission</h2>
                        <p className="section-description">
                            To make renting simple, transparent, and enjoyable for everyone
                        </p>
                    </div>

                    <div className="mission-grid">
                        <div className="mission-card">
                            <div className="mission-icon">
                                <Home size={40} />
                            </div>
                            <h3>Find Your Home</h3>
                            <p>Helping you discover properties that truly feel like home</p>
                        </div>

                        <div className="mission-card">
                            <div className="mission-icon">
                                <Shield size={40} />
                            </div>
                            <h3>Trust & Safety</h3>
                            <p>Every listing is thoroughly verified for your peace of mind</p>
                        </div>

                        <div className="mission-card">
                            <div className="mission-icon">
                                <Heart size={40} />
                            </div>
                            <h3>Community Focus</h3>
                            <p>Building relationships between landlords and tenants</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="team-section">
                <div className="container">
                    <div className="section-header">
                        <h2>Meet Our Team</h2>
                        <p className="section-description">
                            The passionate people behind RentLyst's success
                        </p>
                    </div>

                    <div className="team-grid">
                        {teamMembers.map(member => (
                            <div className="team-card" key={member.id}>
                                <div className="team-card-inner">
                                    <div className="team-card-front">
                                        <div className="member-image">
                                            <img src={member.image} alt={member.name} />
                                        </div>
                                        <h3>{member.name}</h3>
                                        <p className="role">{member.role}</p>
                                    </div>
                                    <div className="team-card-back">
                                        <p>{member.bio}</p>
                                        <div className="member-stats">
                                            <Star size={16} />
                                            <span>{member.stats}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="stats-section">
                <div className="container">
                    <div className="stats-grid">
                        <div className="stat-card">
                            <h3>5000+</h3>
                            <p>Properties Listed</p>
                        </div>
                        <div className="stat-card">
                            <h3>2K+</h3>
                            <p>Happy Renters</p>
                        </div>
                        <div className="stat-card">
                            <h3>95%</h3>
                            <p>Satisfaction Rate</p>
                        </div>
                        <div className="stat-card">
                            <h3>24/7</h3>
                            <p>Customer Support</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Timeline Section */}
            <section className="timeline-section">
                <div className="container">
                    <div className="section-header">
                        <h2>Our Journey</h2>
                        <p className="section-description">
                            Key milestones in our company's history
                        </p>
                    </div>

                    <div className="timeline">
                        {milestones.map((milestone, index) => (
                            <div className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`} key={index}>
                                <div className="timeline-content">
                                    <div className="timeline-year">{milestone.year}</div>
                                    <h3>{milestone.title}</h3>
                                    <p>{milestone.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta-section">
                <div className="container">
                    <h2>Ready to find your perfect rental?</h2>
                    <p>Join millions of happy renters who found their home through RentEasy</p>
                    <button className="cta-button">
                        <a style={{ color: 'white' }} href="/rent">
                            Browse Properties <ArrowRight size={18} />
                        </a>
                    </button>
                </div>
            </section>
            <Footer />
        </div>
        
    );
};

export default AboutPage;