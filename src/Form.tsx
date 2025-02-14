import React, { useEffect, useState } from "react";
import { produce } from "immer";

const Form = () => {
  const [formDetails, setFormDetails] = useState({
    about: { name: "", fatherName: "", motherName: "", dob: "", nationality: "", gender: "" },
    contact: { address: "", phone: "", email: "", alternatePhone: "", linkedin: "" },
    education: { highestQualification: "", university: "", passingYear: "", grade: "" },
    workExperience: { companyName: "", position: "", startDate: "", endDate: "", responsibilities: [] },
    skills: { programmingLanguages: [], frameworks: [], tools: [], softSkills: [] },
    preferences: { jobType: "", remoteWork: null, relocation: null, expectedSalary: "", preferredLocation: "" }
  });

  const [activeTab, setActiveTab] = useState("about");
  const [draftState, setDraftState] = useState("contact");

  const getIndex = (tab) => Object.keys(formDetails).indexOf(tab);

  const checker = (state) => {
    for (const tab in state) {
      for (const input in state[tab]) {
        if (state[tab][input] === "" || state[tab][input] === undefined) {
          return tab;
        }
      }
    }
    return Object.keys(state).slice(-1)[0];
  };

  useEffect(() => {
    setDraftState(checker(formDetails));
  }, [formDetails]);

  return (
    <div className="w-full flex items-center justify-center bg-gray-100 min-h-screen p-6">
      <div className="w-[90%] max-w-[600px] bg-white p-6 rounded-xl shadow-xl">
        {/* Step Indicators */}
        <div className="flex gap-3 mb-6 justify-center">
          {Object.keys(formDetails).map((tab, idx) => (
            <div
              key={idx}
              className={`aspect-square flex justify-center items-center rounded-full w-[35px] text-sm font-bold transition-all
                ${getIndex(draftState) + 1 > idx + 1 ? "bg-green-500 text-white" : "bg-gray-300 text-gray-700"}`}
            >
              {getIndex(draftState) + 1 > idx + 1 ? "✔" : idx + 1}
            </div>
          ))}
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2 mb-6 border-b pb-2">
          {Object.keys(formDetails).map((tab) => (
            <span
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`cursor-pointer px-3 py-1 rounded-md text-sm font-semibold transition-all 
                ${activeTab === tab ? "bg-black text-white" : "bg-gray-200 text-black"}`}
            >
              {tab}
            </span>
          ))}
        </div>

        {/* Form Inputs */}
        <div className="border border-gray-300 rounded-lg p-4">
          <div className="grid grid-cols-2 gap-4">
            {Object.keys(formDetails[activeTab]).map((input) => (
              <div key={input} className="flex flex-col">
                <label className="text-sm font-medium text-gray-600">{input}</label>
                <input
                  className="bg-gray-100 border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-black focus:outline-none"
                  type="text"
                  onChange={(e) => {
                    setFormDetails(
                      produce(formDetails, (draft) => {
                        draft[activeTab][input] = e.target.value;
                      })
                    );
                  }}
                  value={formDetails[activeTab][input]}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex w-full justify-between mt-6">
          <button
            disabled={activeTab === Object.keys(formDetails)[0]}
            onClick={() => setActiveTab(Object.keys(formDetails)[getIndex(activeTab) - 1])}
            className="px-4 py-2 rounded-md bg-gray-300 text-black hover:bg-gray-400 disabled:opacity-50"
          >
            Prev
          </button>
          <button
            disabled={!(getIndex(activeTab) < getIndex(draftState))}
            onClick={() => setActiveTab(Object.keys(formDetails)[getIndex(activeTab) + 1])}
            className="px-4 py-2 rounded-md bg-black text-white hover:bg-gray-800 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Form;