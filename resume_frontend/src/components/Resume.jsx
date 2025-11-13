import React, { useRef } from "react";
import "daisyui/dist/full.css";
import { FaGithub, FaLinkedin, FaPhone, FaEnvelope } from "react-icons/fa";
import { toPng } from "html-to-image";
import { jsPDF } from "jspdf";

// --- HELPER FUNCTION TO PREVENT CRASHES ---
// This converts whatever the AI sends into a valid list (Array)
const ensureArray = (data) => {
  if (!data) return []; // If null/undefined, return empty list
  if (Array.isArray(data)) return data; // If it's already a list, return it
  if (typeof data === 'string') return [data]; // If it's a string, make it a list of one item
  return []; // Otherwise, return empty list
};

const Resume = ({ data }) => {
  const resumeRef = useRef(null);

  // Safe access to top-level objects
  const safeData = data || {};
  const info = safeData.personalInformation || {};

  // Normalize all list data using our helper
  const skillsList = ensureArray(safeData.skills);
  const experienceList = ensureArray(safeData.experience);
  const educationList = ensureArray(safeData.education);
  const certList = ensureArray(safeData.certifications);
  const projectList = ensureArray(safeData.projects);
  const achievementList = ensureArray(safeData.achievements);
  const languageList = ensureArray(safeData.languages);

  const handleDownloadPdf = () => {
    if (!resumeRef.current) return;
    toPng(resumeRef.current, { quality: 1.0 })
      .then((dataUrl) => {
        const pdf = new jsPDF("p", "mm", "a4");
        const imgProps = pdf.getImageProperties(dataUrl);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        pdf.addImage(dataUrl, "PNG", 0, 0, pdfWidth, pdfHeight);
        pdf.save(`${info.fullName || "Resume"}.pdf`);
      })
      .catch((err) => console.error("Error generating PDF", err));
  };

  if (!data) return <div className="p-10 text-center text-gray-500">No data available to display.</div>;

  return (
    <>
      <div
        ref={resumeRef}
        className="max-w-4xl mx-auto shadow-2xl rounded-lg p-8 space-y-6 bg-white text-gray-800 border border-gray-200"
      >
        {/* --- HEADER --- */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-primary">{info.fullName || "Name Not Provided"}</h1>
          <p className="text-lg text-gray-500">{info.location || ""}</p>

          <div className="flex justify-center flex-wrap gap-4 mt-2">
            {info.email && (
              <a href={`mailto:${info.email}`} className="flex items-center text-secondary hover:underline">
                <FaEnvelope className="mr-2" /> {info.email}
              </a>
            )}
            {info.phoneNumber && (
              <p className="flex items-center text-gray-500">
                <FaPhone className="mr-2" /> {info.phoneNumber}
              </p>
            )}
          </div>

          <div className="flex justify-center flex-wrap gap-4 mt-2">
            {info.gitHub && (
              <a href={info.gitHub} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-700 flex items-center">
                <FaGithub className="mr-2" /> GitHub
              </a>
            )}
            {info.linkedIn && (
              <a href={info.linkedIn} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700 flex items-center">
                <FaLinkedin className="mr-2" /> LinkedIn
              </a>
            )}
          </div>
        </div>

        <div className="divider"></div>

        {/* --- SUMMARY --- */}
        {safeData.summary && (
          <section>
            <h2 className="text-2xl font-semibold text-secondary">Summary</h2>
            <p className="text-gray-700">{safeData.summary}</p>
            <div className="divider"></div>
          </section>
        )}

        {/* --- SKILLS --- */}
        {skillsList.length > 0 && (
          <section>
            <h2 className="text-2xl font-semibold text-secondary">Skills</h2>
            <div className="flex flex-wrap gap-2 mt-2">
              {skillsList.map((skill, index) => (
                <div key={index} className="badge badge-outline badge-lg px-4 py-3">
                  {/* Handle object vs string */}
                  {typeof skill === 'object' ? (skill.title || "Skill") : skill}
                  {typeof skill === 'object' && skill.level && <span className="ml-1 opacity-70">({skill.level})</span>}
                </div>
              ))}
            </div>
            <div className="divider"></div>
          </section>
        )}

        {/* --- EXPERIENCE --- */}
        {experienceList.length > 0 && (
          <section>
            <h2 className="text-2xl font-semibold text-secondary mb-4">Experience</h2>
            {experienceList.map((exp, index) => (
              <div key={index} className="mb-6">
                <div className="flex justify-between items-baseline">
                    <h3 className="text-xl font-bold">{exp.jobTitle || "Job Title"}</h3>
                    <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">{exp.duration || ""}</span>
                </div>
                <p className="text-gray-600 font-medium">
                  {exp.company || "Company"} {exp.location ? `| ${exp.location}` : ""}
                </p>
                <p className="mt-2 text-gray-700 whitespace-pre-line">
                  {exp.responsibility || ""}
                </p>
              </div>
            ))}
            <div className="divider"></div>
          </section>
        )}

        {/* --- EDUCATION --- */}
        {educationList.length > 0 && (
          <section>
            <h2 className="text-2xl font-semibold text-secondary mb-4">Education</h2>
            {educationList.map((edu, index) => (
              <div key={index} className="mb-4">
                <div className="flex justify-between items-center">
                    <h3 className="text-xl font-bold">{edu.degree || "Degree"}</h3>
                    <span className="text-sm font-bold text-primary">{edu.graduationYear || ""}</span>
                </div>
                <p className="text-gray-600">
                  {edu.university || "University"}, {edu.location || ""}
                </p>
              </div>
            ))}
            <div className="divider"></div>
          </section>
        )}

        {/* --- PROJECTS --- */}
        {projectList.length > 0 && (
          <section>
            <h2 className="text-2xl font-semibold text-secondary mb-4">Projects</h2>
            {projectList.map((proj, index) => (
              <div key={index} className="mb-4 p-4 rounded-lg bg-gray-50 border border-gray-100">
                <div className="flex justify-between items-center mb-2">
                    <h3 className="text-xl font-bold">{proj.title || "Project"}</h3>
                    {proj.githubLink && (
                        <a href={proj.githubLink} target="_blank" rel="noopener noreferrer" className="text-blue-500 text-sm hover:underline">
                        View Code
                        </a>
                    )}
                </div>
                <p className="text-gray-700 mb-2">{proj.description || ""}</p>
                {/* Ensure technologies is also an array */}
                {ensureArray(proj.technologiesUsed).length > 0 && (
                    <div className="flex flex-wrap gap-1">
                        {ensureArray(proj.technologiesUsed).map((tech, i) => (
                            <span key={i} className="badge badge-sm badge-ghost">{tech}</span>
                        ))}
                    </div>
                )}
              </div>
            ))}
            <div className="divider"></div>
          </section>
        )}

        {/* --- CERTIFICATIONS --- */}
        {certList.length > 0 && (
          <section>
            <h2 className="text-2xl font-semibold text-secondary mb-4">Certifications</h2>
            <ul className="list-disc list-inside space-y-2">
                {certList.map((cert, index) => (
                <li key={index} className="text-gray-700">
                    <span className="font-bold">{cert.title || "Certificate"}</span> 
                    {cert.issuingOrganization && ` - ${cert.issuingOrganization}`}
                    {cert.year && ` (${cert.year})`}
                </li>
                ))}
            </ul>
            <div className="divider"></div>
          </section>
        )}

        {/* --- LANGUAGES --- */}
        {languageList.length > 0 && (
          <section>
            <h2 className="text-2xl font-semibold text-secondary">Languages</h2>
            <div className="flex gap-4 mt-2">
              {languageList.map((lang, index) => (
                <span key={index} className="text-gray-700 font-medium">
                    {typeof lang === 'object' ? lang.name : lang}
                </span>
              ))}
            </div>
          </section>
        )}
      </div>

      <section className="flex justify-center mt-8 mb-12">
        <button onClick={handleDownloadPdf} className="btn btn-primary btn-lg shadow-lg">
          Download PDF
        </button>
      </section>
    </>
  );
};

export default Resume;