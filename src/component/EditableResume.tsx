import { useReducer, useState } from 'react';

type ExperienceItem = {
  title: string;
  company: string;
  dates: string;
  details: string;
};

type EducationItem = {
  degree: string;
  institution: string;
  year: string;
};

type Qualifications = {
  education: EducationItem[];
  certifications: string[];
  skills: string[];
};

type AiOutput = {
  summary: string;
  resume: string[];
  coverLetter: string;
  linkedIn: string;
  experience: ExperienceItem[];
  qualifications: Qualifications;
};

type Action =
  | { type: 'UPDATE_FIELD'; field: keyof AiOutput; value: any }
  | { type: 'UPDATE_EXPERIENCE'; index: number; field: keyof ExperienceItem; value: string }
  | { type: 'ADD_EXPERIENCE' }
  | { type: 'REMOVE_EXPERIENCE'; index: number }
  | { type: 'UPDATE_EDUCATION'; index: number; field: keyof EducationItem; value: string }
  | { type: 'ADD_EDUCATION' }
  | { type: 'REMOVE_EDUCATION'; index: number }
  | { type: 'UPDATE_CERTIFICATION'; index: number; value: string }
  | { type: 'ADD_CERTIFICATION' }
  | { type: 'REMOVE_CERTIFICATION'; index: number }
  | { type: 'UPDATE_SKILL'; index: number; value: string }
  | { type: 'ADD_SKILL' }
  | { type: 'REMOVE_SKILL'; index: number };

const reducer = (state: AiOutput, action: Action): AiOutput => {
  switch (action.type) {
    case 'UPDATE_FIELD':
      return { ...state, [action.field]: action.value };
    case 'UPDATE_EXPERIENCE':
      return {
        ...state,
        experience: state.experience.map((item, idx) =>
          idx === action.index ? { ...item, [action.field]: action.value } : item
        ),
      };
    case 'ADD_EXPERIENCE':
      return {
        ...state,
        experience: [...state.experience, { title: '', company: '', dates: '', details: '' }],
      };
    case 'REMOVE_EXPERIENCE':
      return {
        ...state,
        experience: state.experience.filter((_, idx) => idx !== action.index),
      };
    case 'ADD_EDUCATION':
      return {
        ...state,
        qualifications: {
          ...state.qualifications,
          education: [...state.qualifications.education, { degree: '', institution: '', year: '' }],
        },
      };
    case 'UPDATE_EDUCATION':
      return {
        ...state,
        qualifications: {
          ...state.qualifications,
          education: state.qualifications.education.map((edu, idx) =>
            idx === action.index ? { ...edu, [action.field]: action.value } : edu
          ),
        },
      };
    case 'REMOVE_EDUCATION':
      return {
        ...state,
        qualifications: {
          ...state.qualifications,
          education: state.qualifications.education.filter((_, idx) => idx !== action.index),
        },
      };
    case 'ADD_CERTIFICATION':
      return {
        ...state,
        qualifications: {
          ...state.qualifications,
          certifications: [...state.qualifications.certifications, ''],
        },
      };
    case 'UPDATE_CERTIFICATION':
      return {
        ...state,
        qualifications: {
          ...state.qualifications,
          certifications: state.qualifications.certifications.map((cert, idx) =>
            idx === action.index ? action.value : cert
          ),
        },
      };
    case 'REMOVE_CERTIFICATION':
      return {
        ...state,
        qualifications: {
          ...state.qualifications,
          certifications: state.qualifications.certifications.filter((_, idx) => idx !== action.index),
        },
      };
    case 'ADD_SKILL':
      return {
        ...state,
        qualifications: {
          ...state.qualifications,
          skills: [...state.qualifications.skills, ''],
        },
      };
    case 'UPDATE_SKILL':
      return {
        ...state,
        qualifications: {
          ...state.qualifications,
          skills: state.qualifications.skills.map((skill, idx) =>
            idx === action.index ? action.value : skill
          ),
        },
      };
    case 'REMOVE_SKILL':
      return {
        ...state,
        qualifications: {
          ...state.qualifications,
          skills: state.qualifications.skills.filter((_, idx) => idx !== action.index),
        },
      };
    default:
      return state;
  }
};

const EditOutputModal = () => {
  const [state, dispatch] = useReducer(reducer, {
    summary: '',
    resume: [],
    coverLetter: '',
    linkedIn: '',
    experience: [],
    qualifications: {
      education: [],
      certifications: [],
      skills: [],
    },
  });

  const [isEditMode, setIsEditMode] = useState(true);
  const [editingExperienceIdx, setEditingExperienceIdx] = useState<number | null>(null);

  return (
    <div className="p-6 space-y-8 text-gray-800 max-w-3xl mx-auto">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Resume Details</h2>
        <button
          className="text-blue-600 border px-3 py-1 rounded"
          onClick={() => {
            setIsEditMode((prev) => !prev);
            setEditingExperienceIdx(null);
          }}
        >
          {isEditMode ? 'View' : 'Edit'}
        </button>
      </div>

      {/* LinkedIn */}
      <section>
        <h3 className="text-xl font-semibold mb-2">LinkedIn</h3>
        {isEditMode ? (
          <input
            placeholder="LinkedIn URL"
            value={state.linkedIn}
            onChange={(e) => dispatch({ type: 'UPDATE_FIELD', field: 'linkedIn', value: e.target.value })}
            className="w-full p-2 border rounded"
          />
        ) : (
          <div className="p-2 border rounded bg-gray-50">{state.linkedIn || <span className="text-gray-400">No LinkedIn URL</span>}</div>
        )}
      </section>

      {/* Experience */}
      <section>
        <h3 className="text-xl font-semibold mb-2">Experience</h3>
        {state.experience.map((exp, idx) => (
          <div
            key={idx}
            className="border p-4 rounded space-y-2 mb-4 cursor-pointer"
            onClick={() => {
              if (!isEditMode && editingExperienceIdx === null) setEditingExperienceIdx(idx);
            }}
          >
            {(isEditMode || editingExperienceIdx === idx) ? (
              <>
                <input
                  placeholder="Title"
                  value={exp.title}
                  onChange={(e) =>
                    dispatch({ type: 'UPDATE_EXPERIENCE', index: idx, field: 'title', value: e.target.value })
                  }
                  className="w-full p-2 border rounded"
                />
                <input
                  placeholder="Company"
                  value={exp.company}
                  onChange={(e) =>
                    dispatch({ type: 'UPDATE_EXPERIENCE', index: idx, field: 'company', value: e.target.value })
                  }
                  className="w-full p-2 border rounded"
                />
                <input
                  placeholder="Dates"
                  value={exp.dates}
                  onChange={(e) =>
                    dispatch({ type: 'UPDATE_EXPERIENCE', index: idx, field: 'dates', value: e.target.value })
                  }
                  className="w-full p-2 border rounded"
                />
                <textarea
                  placeholder="Details"
                  value={exp.details}
                  onChange={(e) =>
                    dispatch({ type: 'UPDATE_EXPERIENCE', index: idx, field: 'details', value: e.target.value })
                  }
                  className="w-full p-2 border rounded resize-y"
                />
                <div className="flex gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      dispatch({ type: 'REMOVE_EXPERIENCE', index: idx });
                      setEditingExperienceIdx(null);
                    }}
                    className="text-red-600 text-sm"
                  >
                    Remove
                  </button>
                  {editingExperienceIdx === idx && !isEditMode && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditingExperienceIdx(null);
                      }}
                      className="text-blue-600 text-sm"
                    >
                      Done
                    </button>
                  )}
                </div>
              </>
            ) : (
              <div>
                <div className="font-semibold">{exp.title}</div>
                <div>{exp.company}</div>
                <div className="text-sm text-gray-500">{exp.dates}</div>
                <div className="mt-2">{exp.details}</div>
              </div>
            )}
          </div>
        ))}
        {(isEditMode || editingExperienceIdx !== null) && (
          <button onClick={() => dispatch({ type: 'ADD_EXPERIENCE' })} className="text-blue-600">
            + Add Experience
          </button>
        )}
      </section>

      {/* Education */}
      <section>
        <h3 className="text-xl font-semibold mb-2">Education</h3>
        {state.qualifications.education.map((edu, idx) => (
          <div key={idx} className="border p-4 rounded space-y-2 mb-4">
            {isEditMode ? (
              <>
                <input
                  placeholder="Degree"
                  value={edu.degree}
                  onChange={(e) =>
                    dispatch({ type: 'UPDATE_EDUCATION', index: idx, field: 'degree', value: e.target.value })
                  }
                  className="w-full p-2 border rounded"
                />
                <input
                  placeholder="Institution"
                  value={edu.institution}
                  onChange={(e) =>
                    dispatch({ type: 'UPDATE_EDUCATION', index: idx, field: 'institution', value: e.target.value })
                  }
                  className="w-full p-2 border rounded"
                />
                <input
                  placeholder="Year"
                  value={edu.year}
                  onChange={(e) =>
                    dispatch({ type: 'UPDATE_EDUCATION', index: idx, field: 'year', value: e.target.value })
                  }
                  className="w-full p-2 border rounded"
                />
                <button
                  onClick={() => dispatch({ type: 'REMOVE_EDUCATION', index: idx })}
                  className="text-red-600 text-sm"
                >
                  Remove
                </button>
              </>
            ) : (
              <div>
                <div className="font-semibold">{edu.degree}</div>
                <div>{edu.institution}</div>
                <div className="text-sm text-gray-500">{edu.year}</div>
              </div>
            )}
          </div>
        ))}
        {isEditMode && (
          <button onClick={() => dispatch({ type: 'ADD_EDUCATION' })} className="text-blue-600">
            + Add Education
          </button>
        )}
      </section>

      {/* Certifications */}
      <section>
        <h3 className="text-xl font-semibold mb-2">Certifications</h3>
        {state.qualifications.certifications.map((cert, idx) => (
          <div key={idx} className="flex items-center gap-2 mb-2">
            {isEditMode ? (
              <>
                <input
                  value={cert}
                  onChange={(e) =>
                    dispatch({ type: 'UPDATE_CERTIFICATION', index: idx, value: e.target.value })
                  }
                  className="flex-1 p-2 border rounded"
                />
                <button
                  onClick={() => dispatch({ type: 'REMOVE_CERTIFICATION', index: idx })}
                  className="text-red-600 text-sm"
                >
                  Remove
                </button>
              </>
            ) : (
              <div>{cert}</div>
            )}
          </div>
        ))}
        {isEditMode && (
          <button onClick={() => dispatch({ type: 'ADD_CERTIFICATION' })} className="text-blue-600">
            + Add Certification
          </button>
        )}
      </section>

      {/* Skills */}
      <section>
        <h3 className="text-xl font-semibold mb-2">Skills</h3>
        {state.qualifications.skills.map((skill, idx) => (
          <div key={idx} className="flex items-center gap-2 mb-2">
            {isEditMode ? (
              <>
                <input
                  value={skill}
                  onChange={(e) =>
                    dispatch({ type: 'UPDATE_SKILL', index: idx, value: e.target.value })
                  }
                  className="flex-1 p-2 border rounded"
                />
                <button
                  onClick={() => dispatch({ type: 'REMOVE_SKILL', index: idx })}
                  className="text-red-600 text-sm"
                >
                  Remove
                </button>
              </>
            ) : (
              <div>{skill}</div>
            )}
          </div>
        ))}
        {isEditMode && (
          <button onClick={() => dispatch({ type: 'ADD_SKILL' })} className="text-blue-600">
            + Add Skill
          </button>
        )}
      </section>
    </div>
  );
};

export default EditOutputModal;