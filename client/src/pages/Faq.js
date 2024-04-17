import React from 'react';
import '../pages/FAQpage.css'; // Import CSS file for styling

function FAQPage() {
  const faqs = [
    {
      question: 'What is BudgetBod?',
      answer: 'BudgetBod is a platform that helps users plan budget-friendly meals based on their dietary preferences. It also tracks fitness and calories.',
    },
    {
      question: 'How does BudgetBod work?',
      answer: 'Users input their dietary preferences and BudgetBod generates meal plans that fit those preferences while staying within their budget. It also tracks their fitness activities and calorie intake.',
    },
    {
      question: 'Is BudgetBod free to use?',
      answer: 'Yes, BudgetBod is currently free to use for all users.',
    },
    {
      question: 'Can I customize my meal plans?',
      answer: 'Yes, BudgetBod allows users to customize their meal plans based on dietary restrictions, preferences, and budget constraints.',
    },
    {
      question: 'How can I track my fitness activities?',
      answer: 'BudgetBod provides a fitness tracker feature where users can log their workouts, set fitness goals, and track their progress over time.',
    },
  ];

  return (
    <div className="faq-container">
      <h1>FAQ</h1>
      {faqs.map((faq, index) => (
        <div key={index} className="faq-item">
          <h3>{faq.question}</h3>
          <p>{faq.answer}</p>
        </div>
      ))}
    </div>
  );
}

export default FAQPage;
