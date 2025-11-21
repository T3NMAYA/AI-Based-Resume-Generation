import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ResumePreview from "../components/Resume"; // Ensure this path is correct
<<<<<<< HEAD
import { FaArrowLeft } from "react-icons/fa";
=======
>>>>>>> 4482c68a67f4e62e20870c820870ee7c5d8dbcf9

function Resume() {
  const location = useLocation();
  const navigate = useNavigate();
  const [resumeData, setResumeData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Safety Check: Did we get here from the Dashboard?
    if (!location.state || !location.state.resumeData) {
        console.warn("No resume data found in navigation state.");
        // If we are just refreshing the page, we lose the state. 
        // In a real app, you might fetch by ID here. For now, go back.
        navigate("/dashboard"); 
        return;
    }

    try {
      // 2. Parse the data
      // The backend sends the resume data as a JSON string inside the 'resume' object
      const parsedData = JSON.parse(location.state.resumeData);
      
      console.log("Successfully parsed resume data:", parsedData);
      
      if (!parsedData) {
          throw new Error("Resume data is empty");
      }

      setResumeData(parsedData);
    } catch (err) {
      console.error("Failed to load resume:", err);
      setError("Could not load resume data. " + err.message);
    } finally {
      setLoading(false);
    }
  }, [location, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-100">
        <div className="flex flex-col items-center gap-4">
            <span className="loading loading-spinner loading-lg text-primary"></span>
            <p className="text-gray-400">Loading Resume...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center text-error bg-base-100 gap-4">
            <h2 className="text-2xl font-bold">Error</h2>
            <p>{error}</p>
            <button onClick={() => navigate("/dashboard")} className="btn btn-primary">
                Back to Dashboard
            </button>
        </div>
    );
  }

  // Only render the preview if we have data
  return (
<<<<<<< HEAD
    <div className="min-h-screen bg-base-100 py-8 relative">
        {/* Close/Back Button */}
        <div className="container mx-auto px-4 mb-4">
            <button 
                onClick={() => navigate("/dashboard")} 
                className="btn btn-outline text-white gap-2 hover:btn-primary"
            >
                <FaArrowLeft /> Back to Dashboard
            </button>
        </div>

=======
    <div className="min-h-screen bg-base-100 py-8">
>>>>>>> 4482c68a67f4e62e20870c820870ee7c5d8dbcf9
      <ResumePreview data={resumeData} />
    </div>
  );
}

export default Resume;