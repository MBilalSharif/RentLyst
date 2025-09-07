import React, { useState } from 'react';
import { Check, Star, Crown, Zap, Shield, Award } from 'lucide-react';
import '../styles/PremiumPlans.css';
import Footer from './Footer';

const PremiumPlans = () => {
  const [billingCycle, setBillingCycle] = useState('monthly'); // 'monthly' or 'annual'

  const plans = [
    {
      name: "Starter",
      price: {
        monthly: 19,
        annual: 190
      },
      description: "Perfect for individual landlords with a few properties",
      features: [
        "Up to 5 property listings",
        "Basic analytics dashboard",
        "Tenant screening for 3 applicants/month",
        "Standard support response (48h)",
        "Rent collection via bank transfer"
      ],
      popular: false,
      icon: <Star size={24} />
    },
    {
      name: "Professional",
      price: {
        monthly: 49,
        annual: 490
      },
      description: "Ideal for professional landlords with multiple properties",
      features: [
        "Up to 20 property listings",
        "Advanced analytics & reports",
        "Tenant screening for 10 applicants/month",
        "Priority support (24h)",
        "Automated rent collection",
        "Maintenance request tracking",
        "Lease agreement templates"
      ],
      popular: true,
      icon: <Crown size={24} />
    },
    {
      name: "Enterprise",
      price: {
        monthly: 99,
        annual: 990
      },
      description: "For property managers and large portfolio owners",
      features: [
        "Unlimited property listings",
        "Custom analytics dashboard",
        "Unlimited tenant screenings",
        "24/7 dedicated support",
        "Multiple payment gateways",
        "Maintenance coordination service",
        "Custom lease agreements",
        "Team member access",
        "API access"
      ],
      popular: false,
      icon: <Award size={24} />
    }
  ];

  const toggleBillingCycle = () => {
    setBillingCycle(billingCycle === 'monthly' ? 'annual' : 'monthly');
  };

  const calculateSavings = (monthlyPrice, annualPrice) => {
    return Math.round(((monthlyPrice * 12 - annualPrice) / (monthlyPrice * 12)) * 100);
  };

  return (
    <div className="premium-plans-container">
      <div className="plans-header">
        <h2>Upgrade to Premium</h2>
        <p>Choose the plan that works best for your rental business</p>
        
        <div className="billing-toggle">
          <span className={billingCycle === 'monthly' ? 'active' : ''}>Monthly</span>
          <label className="toggle-switch">
            <input 
              type="checkbox" 
              checked={billingCycle === 'annual'} 
              onChange={toggleBillingCycle} 
            />
            <span className="slider"></span>
          </label>
          <span className={billingCycle === 'annual' ? 'active' : ''}>
            Annual <span className="save-badge">Save up to 17%</span>
          </span>
        </div>
      </div>

      <div className="plans-grid">
        {plans.map((plan, index) => (
          <div 
            key={index} 
            className={`plan-card ${plan.popular ? 'popular' : ''}`}
          >
            {plan.popular && (
              <div className="popular-badge">
                <Zap size={14} />
                Most Popular
              </div>
            )}
            
            <div className="plan-header">
              <div className="plan-icon">
                {plan.icon}
              </div>
              <h3>{plan.name}</h3>
              <p>{plan.description}</p>
            </div>

            <div className="plan-price">
              <div className="price-amount">
                ${billingCycle === 'monthly' ? plan.price.monthly : plan.price.annual}
                <span className="price-interval">
                  /{billingCycle === 'monthly' ? 'month' : 'year'}
                </span>
              </div>
              {billingCycle === 'annual' && (
                <div className="annual-savings">
                  Save {calculateSavings(plan.price.monthly, plan.price.annual)}%
                </div>
              )}
            </div>

            <ul className="plan-features">
              {plan.features.map((feature, featureIndex) => (
                <li key={featureIndex}>
                  <Check size={16} />
                  {feature}
                </li>
              ))}
            </ul>

            <button className={`plan-button ${plan.popular ? 'primary' : 'secondary'}`}>
              Get Started
            </button>
          </div>
        ))}
      </div>

      <div className="plans-footer">
        <div className="security-note">
          <Shield size={18} />
          <span>All plans include secure payment processing and data protection</span>
        </div>
      </div>
        <Footer />
    </div>
        
  );
};

export default PremiumPlans;