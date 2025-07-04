import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaUpload, FaClipboard, FaRobot, FaCheckCircle, FaArrowRight, FaSpinner } from 'react-icons/fa';

import ResumeUpload from "./resumeUpload";
import JobForm from "./jobForm";
import OutputPanel from "./outputPanel";

const MainComponent = () => {
  const [jobDesc, setJobDesc] = useState("");
  const [resumeText, setResumeText] = useState("");
  const [currentStep, setCurrentStep] = useState(1);
  const [isResumeUploaded, setIsResumeUploaded] = useState(false);
  const [isJobDescPasted, setIsJobDescPasted] = useState(false);
  const [isGeneratingOutput, setIsGeneratingOutput] = useState(false); // New loading state

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleResumeParsed = (text: string) => {
    setResumeText(text);
    setIsResumeUploaded(!!text);
    if (!!text) {
      setTimeout(() => setCurrentStep(2), 500);
    }
  };

  const handleJobDescChange = (desc: string) => {
    setJobDesc(desc);
    setIsJobDescPasted(!!desc);
  };

  const handleGenerateOutput = () => {
    setIsGeneratingOutput(true);
    
    // Simulate API call or processing delay
    setTimeout(() => {
      setIsGeneratingOutput(false);
      setCurrentStep(3);
    }, 1500); // 1.5 second delay for simulation
  };

  const panelVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: "easeOut" } },
    exit: { opacity: 0, y: -50, scale: 0.95, transition: { duration: 0.4, ease: "easeIn" } },
  };

  const progressStepVariants = {
    active: { scale: 1.1, backgroundColor: "#ff4d4d", color: "#fff", boxShadow: "0 0 15px rgba(255,77,77,0.6)" },
    inactive: { scale: 1, backgroundColor: "#333", color: "#888", boxShadow: "none" },
    completed: { scale: 1.05, backgroundColor: "#00b300", color: "#fff", boxShadow: "0 0 10px rgba(0,179,0,0.4)" },
  };

  const progressTextVariants = {
    active: { color: "#ff4d4d", scale: 1.05, fontWeight: "bold" },
    inactive: { color: "#888", scale: 1, fontWeight: "normal" },
    completed: { color: "#00b300", scale: 1.05, fontWeight: "bold" },
  }

  return (
    <div className="min-h-screen w-full bg-black text-white font-sans py-10 md:py-20 flex flex-col items-center">
      {/* Top Heading */}
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-4xl md:text-6xl font-extrabold mb-10 text-center leading-tight tracking-tighter"
        style={{
          background: 'linear-gradient(90deg, #ff4d4d, #ffb3b3)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        LUZ AI Resume Co-Pilot
      </motion.h1>

      {/* Progress Indicator */}
      <div className="flex justify-center items-center gap-4 md:gap-8 mb-12 w-full max-w-2xl px-6">
        {/* Step 1 */}
        <motion.div
          className="flex flex-col items-center cursor-pointer group"
          onClick={() => setCurrentStep(1)}
          variants={progressStepVariants}
          animate={currentStep === 1 ? "active" : isResumeUploaded ? "completed" : "inactive"}
          transition={{ duration: 0.3 }}
          style={{
            backgroundColor: '#333',
            borderRadius: '9999px',
            width: isMobile ? '40px' : '60px',
            height: isMobile ? '40px' : '60px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: isMobile ? '1.2rem' : '1.8rem',
            transition: 'background-color 0.3s, color 0.3s, transform 0.3s, box-shadow 0.3s',
            position: 'relative',
          }}
        >
          {isResumeUploaded ? <FaCheckCircle /> : <FaUpload />}
          <motion.p
            className="absolute -bottom-8 text-xs md:text-sm whitespace-nowrap"
            variants={progressTextVariants}
            animate={currentStep === 1 ? "active" : isResumeUploaded ? "completed" : "inactive"}
            transition={{ duration: 0.3 }}
          >
            Resume
          </motion.p>
        </motion.div>

        {/* Arrow 1 */}
        <motion.div
          className="text-gray-600 transition-colors duration-300"
          animate={{ color: currentStep > 1 ? '#ff4d4d' : '#4a4a4a' }}
        >
          <FaArrowRight className="text-xl md:text-3xl" />
        </motion.div>

        {/* Step 2 */}
        <motion.div
          className="flex flex-col items-center cursor-pointer group"
          onClick={() => currentStep >= 1 && setCurrentStep(2)}
          variants={progressStepVariants}
          animate={currentStep === 2 ? "active" : isJobDescPasted ? "completed" : "inactive"}
          transition={{ duration: 0.3 }}
          style={{
            backgroundColor: '#333',
            borderRadius: '9999px',
            width: isMobile ? '40px' : '60px',
            height: isMobile ? '40px' : '60px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: isMobile ? '1.2rem' : '1.8rem',
            transition: 'background-color 0.3s, color 0.3s, transform 0.3s, box-shadow 0.3s',
            position: 'relative',
          }}
        >
          {isJobDescPasted ? <FaCheckCircle /> : <FaClipboard />}
          <motion.p
            className="absolute -bottom-8 text-xs md:text-sm whitespace-nowrap"
            variants={progressTextVariants}
            animate={currentStep === 2 ? "active" : isJobDescPasted ? "completed" : "inactive"}
            transition={{ duration: 0.3 }}
          >
            Job Desc
          </motion.p>
        </motion.div>

        {/* Arrow 2 */}
        <motion.div
          className="text-gray-600 transition-colors duration-300"
          animate={{ color: currentStep > 2 ? '#ff4d4d' : '#4a4a4a' }}
        >
          <FaArrowRight className="text-xl md:text-3xl" />
        </motion.div>

        {/* Step 3 */}
        <motion.div
          className="flex flex-col items-center cursor-pointer group"
          onClick={() => currentStep >= 2 && setCurrentStep(3)}
          variants={progressStepVariants}
          animate={currentStep === 3 ? "active" : "inactive"}
          transition={{ duration: 0.3 }}
          style={{
            backgroundColor: '#333',
            borderRadius: '9999px',
            width: isMobile ? '40px' : '60px',
            height: isMobile ? '40px' : '60px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: isMobile ? '1.2rem' : '1.8rem',
            transition: 'background-color 0.3s, color 0.3s, transform 0.3s, box-shadow 0.3s',
            position: 'relative',
          }}
        >
          <FaRobot />
          <motion.p
            className="absolute -bottom-8 text-xs md:text-sm whitespace-nowrap"
            variants={progressTextVariants}
            animate={currentStep === 3 ? "active" : "inactive"}
            transition={{ duration: 0.3 }}
          >
            AI Output
          </motion.p>
        </motion.div>
      </div>

      {/* Main Functional Section */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 w-full">
        <div className="grid md:grid-cols-1 gap-10">
          <AnimatePresence mode="wait">
            {currentStep === 1 && (
              <motion.div
                key="resume-upload"
                variants={panelVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="bg-black p-6 rounded-xl border border-zinc-700 shadow-lg glow-border transition"
                style={{
                  border: currentStep === 1 ? '1px solid #ff4d4d' : '1px solid #zinc-700',
                  boxShadow: currentStep === 1 ? '0 0 30px rgba(255,77,77,0.3)' : '0 10px 15px rgba(0,0,0,0.1)',
                }}
              >
                <h2 className="text-2xl font-semibold mb-4 text-white border-b border-zinc-700 pb-2 flex items-center">
                  <FaUpload className="mr-3 text-red-400" /> Upload Your Resume
                  {isResumeUploaded && <FaCheckCircle className="ml-auto text-green-500 text-xl" />}
                </h2>
                <p className="text-zinc-400 text-sm mb-4">Upload your current resume (PDF, DOCX) and let our AI extract the key details.</p>
                <ResumeUpload onResumeParsed={handleResumeParsed} />
                {isResumeUploaded && (
                    <motion.button
                        className="mt-6 w-full py-3 px-6 bg-red-600 hover:bg-red-700 rounded-lg text-white font-bold text-lg transition-colors flex items-center justify-center"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setCurrentStep(2)}
                    >
                        Next: Job Description <FaArrowRight className="ml-2" />
                    </motion.button>
                )}
              </motion.div>
            )}

            {currentStep === 2 && (
              <motion.div
                key="job-form"
                variants={panelVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="bg-zinc-900 p-6 rounded-xl border border-zinc-700 shadow-lg glow-border transition"
                 style={{
                  border: currentStep === 2 ? '1px solid #ff4d4d' : '1px solid #zinc-700',
                  boxShadow: currentStep === 2 ? '0 0 30px rgba(255,77,77,0.3)' : '0 10px 15px rgba(0,0,0,0.1)',
                }}
              >
                <h2 className="text-2xl font-semibold mb-4 text-white border-b border-zinc-700 pb-2 flex items-center">
                  <FaClipboard className="mr-3 text-red-400" /> Paste Job Description
                  {isJobDescPasted && <FaCheckCircle className="ml-auto text-green-500 text-xl" />}
                </h2>
                <p className="text-zinc-400 text-sm mb-4">Copy and paste the job description from your target role here. The more detail, the better!</p>
                <JobForm onJobDescChange={handleJobDescChange} />
                {isJobDescPasted && (
                    <motion.button
                        className="mt-6 w-full py-3 px-6 bg-red-600 hover:bg-red-700 rounded-lg text-white font-bold text-lg transition-colors flex items-center justify-center"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleGenerateOutput}
                        disabled={isGeneratingOutput}
                    >
                        {isGeneratingOutput ? (
                          <>
                            <FaSpinner className="animate-spin mr-2" />
                            Generating...
                          </>
                        ) : (
                          <>
                            Process.... <FaArrowRight className="ml-2" />
                          </>
                        )}
                    </motion.button>
                )}
              </motion.div>
            )}

            {isGeneratingOutput && (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="bg-zinc-900 p-8 rounded-xl border border-zinc-700 shadow-lg flex flex-col items-center justify-center"
              >
                <FaSpinner className="animate-spin text-4xl text-red-500 mb-4" />
                <h2 className="text-2xl font-semibold mb-2 text-white">Processing Your Data</h2>
                <p className="text-zinc-400 text-center">Our AI is analyzing your resume and job description to provide personalized recommendations.</p>
              </motion.div>
            )}

            {currentStep === 3 && !isGeneratingOutput && (
              <motion.div
                key="output-panel"
                variants={panelVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="bg-zinc-900 p-6 rounded-xl border border-zinc-700 shadow-xl glow-border transition"
                 style={{
                  border: currentStep === 3 ? '1px solid #ff4d4d' : '1px solid #zinc-700',
                  boxShadow: currentStep === 3 ? '0 0 30px rgba(255,77,77,0.3)' : '0 10px 15px rgba(0,0,0,0.1)',
                }}
              >
                <h2 className="text-2xl font-semibold mb-4 text-white border-b border-zinc-700 pb-2 flex items-center">
                  <FaRobot className="mr-3 text-red-400" /> AI Tailored Output
                </h2>
                <p className="text-zinc-400 text-sm mb-4">Review your personalized resume suggestions and insights generated by our advanced AI.</p>
                <OutputPanel resumeText={resumeText} jobDesc={jobDesc} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
};

export default MainComponent;