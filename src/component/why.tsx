import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
const WhyOurAIResume = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true, // Animation only plays once when component enters view
    threshold: 0.2,    // Trigger when 20% of the component is visible
  });

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3, // Delay between children animations
      },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  const featureVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.7, ease: 'easeOut' } },
  };

  // --- Inline Styles for Responsiveness and Modern Look ---
  const sectionStyle: React.CSSProperties = {
    backgroundColor: '#000', // Dark background for contrast and premium feel
    color: '#fff',
    padding: isMobile ? '4rem 1.5rem' : '8rem 4rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    overflow: 'hidden', // Hide overflow from animations
    position: 'relative',
    minHeight: '80vh',
  };

  const headingStyle: React.CSSProperties = {
    fontSize: isMobile ? '2.5rem' : '4.5rem',
    fontWeight: 'bold',
    marginBottom: isMobile ? '1rem' : '2rem',
    lineHeight: 1.1,
    letterSpacing: isMobile ? '-0.05em' : '-0.03em', // Tighter kerning for bold headings
    maxWidth: '1000px',
    background: 'linear-gradient(90deg, #ff4d4d, #ffb3b3)', // Red gradient for "crazy" feel
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  };

  const subHeadingStyle: React.CSSProperties = {
    fontSize: isMobile ? '1.1rem' : '1.5rem',
    color: '#ccc',
    marginBottom: isMobile ? '3rem' : '4rem',
    maxWidth: '800px',
    lineHeight: 1.6,
  };

  const featuresGridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: isMobile ? '2rem' : '3rem',
    maxWidth: '1200px',
    width: '100%',
    position: 'relative',
    zIndex: 2, // Ensure features are above any background effects
  };

  const featureCardStyle: React.CSSProperties = {
    backgroundColor: 'rgba(255, 255, 255, 0.08)', // Subtle translucent card
    borderRadius: '15px',
    padding: isMobile ? '1.5rem' : '2.5rem',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
    backdropFilter: 'blur(5px)', // Glassmorphism effect
    WebkitBackdropFilter: 'blur(5px)',
    textAlign: 'left', // Text left-aligned in cards
  };

  const featureIconStyle: React.CSSProperties = {
    fontSize: isMobile ? '2.5rem' : '3.5rem',
    marginBottom: '1rem',
    display: 'block',
    // Could add more dynamic color here if needed
  };

  const featureTitleStyle: React.CSSProperties = {
    fontSize: isMobile ? '1.5rem' : '2rem',
    fontWeight: 'bold',
    marginBottom: '0.8rem',
    color: '#ff4d4d', // Red accent for titles
  };

  const featureDescriptionStyle: React.CSSProperties = {
    fontSize: isMobile ? '0.95rem' : '1.1rem',
    color: '#aaa',
    lineHeight: 1.5,
  };

  return (
    <motion.section
      ref={ref}
      style={sectionStyle}
      variants={containerVariants}
      initial="hidden"
      animate={controls}
    >
      {/* Background circles for "crazy" effect */}
      <motion.div
        style={{
          position: 'absolute',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          backgroundColor: 'rgba(255, 0, 0, 0.1)',
          filter: 'blur(100px)',
          zIndex: 0,
          top: '10%',
          left: '5%',
        }}
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 180, 0],
          x: ['-5%', '5%', '-5%'],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        style={{
          position: 'absolute',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          backgroundColor: 'rgba(255, 100, 0, 0.08)',
          filter: 'blur(120px)',
          zIndex: 0,
          bottom: '15%',
          right: '8%',
        }}
        animate={{
          scale: [1, 0.9, 1],
          rotate: [0, -180, 0],
          x: ['5%', '-5%', '5%'],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: 'linear', delay: 2 }}
      />
      {/* End background circles */}

      <motion.h2 style={headingStyle} variants={textVariants}>
        Unlock Your Career Potential
      </motion.h2>
      <motion.p style={subHeadingStyle} variants={textVariants}>
        Stop struggling with traditional resume builders. Luz AI-powered 
        platform crafts a professional resume that gets you noticed, effortlessly.
      </motion.p>

      <motion.div style={featuresGridStyle}>
        {[
          {
            icon: '✨', // Sparkles for AI magic
            title: 'AI-Powered Optimization',
            description: 'Our intelligent algorithms analyze job descriptions to tailor your resume for maximum impact and applicant tracking system (ATS) compatibility.',
          },
          {
            icon: '⏱️', // Stopwatch for speed
            title: 'Build in Minutes, Not Hours',
            description: 'Say goodbye to tedious formatting. Get a stunning, industry-standard resume generated quickly and efficiently.',
          },
          {
            icon: '🎨', // Palette for design
            title: 'Stunning, Modern Designs',
            description: 'Choose from a gallery of professionally designed templates that are fully customizable to reflect your unique style and brand.',
          },
          {
            icon: '🧠', // Brain for smart insights
            title: 'Smart Content Suggestions',
            description: 'Stuck on what to write? Our AI provides smart suggestions for bullet points and accomplishments, ensuring your skills shine.',
          },
        ].map((feature, index) => (
          <motion.div
            key={index}
            style={featureCardStyle}
            variants={featureVariants}
            whileHover={{ scale: 1.03, transition: { duration: 0.2 } }} // Subtle hover effect
            whileTap={{ scale: 0.98 }} // Tap/click effect
          >
            <span style={featureIconStyle}>{feature.icon}</span>
            <h3 style={featureTitleStyle}>{feature.title}</h3>
            <p style={featureDescriptionStyle}>{feature.description}</p>
          </motion.div>
        ))}
      </motion.div>

      <motion.button
        style={{
          marginTop: isMobile ? '3rem' : '5rem',
          padding: isMobile ? '1rem 2rem' : '1.2rem 2.8rem',
          fontSize: isMobile ? '1.1rem' : '1.4rem',
          fontWeight: 'bold',
          backgroundColor: '#ff4d4d', // Red primary button
          color: '#fff',
          border: 'none',
          borderRadius: '50px', // Pill-shaped button
          cursor: 'pointer',
          boxShadow: '0 8px 25px rgba(255, 77, 77, 0.4)',
          transition: 'background-color 0.3s ease, transform 0.2s ease',
          zIndex: 2,
        }}
        whileHover={{ backgroundColor: '#e60000', scale: 1.05 }} // Darker red on hover
        whileTap={{ scale: 0.95 }}
        variants={textVariants} // Use text variants for button entrance
        onClick={() => {
          // Example: navigate to the builder page
          console.log('Start Building Resume!');
          // Add your navigation logic here, e.g., navigate('/build-resume');
        }}
      >
        <Link to="/main">
          Start Building Your AI Resume
        </Link>
      </motion.button>
    </motion.section>
  );
};

export default WhyOurAIResume;