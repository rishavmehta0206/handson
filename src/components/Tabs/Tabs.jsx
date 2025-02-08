import React, { useState } from 'react';

const Tabs = () => {
  const [selectedTab, setSelectedTab] = useState("Profile");
  const [formData, setFormData] = useState([
    {
      section: "Profile",
      fields: [
        {
          name: "Full Name",
          type: "text",
          value: "",
          error: ""
        },
        {
          name: "Email",
          type: "text",
          value: "",
          error: ""
        },
        {
          name: "Age",
          type: "number",
          value: "",
          error: ""
        }
      ]
    },
    {
      section: "Interest",
      fields: [
        {
          name: "Hobbies",
          type: "text",
          value: "",
          error: ""
        },
        {
          name: "Favorite Books",
          type: "text",
          value: "",
          error: ""
        }
      ]
    },
    {
      section: "Settings",
      fields: [
        {
          name: "Notifications",
          type: "checkbox",
          value: false,
          error: ""
        },
        {
          name: "Theme",
          type: "select",
          options: ["light", "dark"],
          value: "light",
          error: ""
        }
      ]
    }
  ]);

  // const handleInputChange = (sectionIndex, fieldIndex, value) => {
  //   const newFormData = [...formData];
  //   newFormData[sectionIndex].fields[fieldIndex].value = value;
  //   setFormData(newFormData);
  // };


  const handleInputChange = (sectionIndex, fieldIndex, value) => {
    const newFormData = [...formData];
    newFormData[sectionIndex].fields[fieldIndex].value = value;
    console.log(sectionIndex, fieldIndex, value)
    if (value === "") {
      newFormData[sectionIndex].fields[fieldIndex].error = "This field is required";
    } else if (
      newFormData[sectionIndex].fields[fieldIndex].name === "Email" &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
    ) {
      newFormData[sectionIndex].fields[fieldIndex].error = "Invalid email format";
    } else if (
      newFormData[sectionIndex].fields[fieldIndex].name === "Age" &&
      (isNaN(value) || value < 0 || value > 120)
    ) {
      newFormData[sectionIndex].fields[fieldIndex].error = "Invalid age";
    } else {
      newFormData[sectionIndex].fields[fieldIndex].error = "";
    }

    setFormData(newFormData);
  };

  const renderField = (field, sectionIndex, fieldIndex) => {
    switch (field.type) {
      case 'select':
        return (
          <select
            value={field.value}
            onChange={(e) => handleInputChange(sectionIndex, fieldIndex, e.target.value)}
            className="form-select"
          >
            {field.options.map(option => (
              <option key={option} value={option}>
                {option.charAt(0).toUpperCase() + option.slice(1)}
              </option>
            ))}
          </select>
        );
      case 'checkbox':
        return (
          <input
            type="checkbox"
            checked={field.value}
            onChange={(e) => handleInputChange(sectionIndex, fieldIndex, e.target.checked)}
            className="form-checkbox"
          />
        );
      default:
        return (
          <input
            type={field.type}
            value={field.value}
            onChange={(e) => handleInputChange(sectionIndex, fieldIndex, e.target.value)}
            placeholder={field.name}
            className="form-input"
          />
        );
    }
  };

  return (
    <div className="container">
      <div className="wrapper">
        <div className="tabs-container">
          {formData.map((form, index) => (
            <div
              key={form.section}
              onClick={() => setSelectedTab(form.section)}
              className={`tab ${selectedTab === form.section ? 'active' : ''}`}
            >
              {form.section}
            </div>
          ))}
        </div>
        <div className="form-container">
          {formData.map((form, sectionIndex) => (
            <div
              key={form.section}
              className={`form-section ${selectedTab === form.section ? 'vis' : 'hidden'}`}
            >
              {form.fields.map((field, fieldIndex) => (
                <div key={field.name} className="form-field">
                  <label className="field-label">{field.name}</label>
                  {renderField(field, sectionIndex, fieldIndex)}
                  {field.error && <span className="error-message">{field.error}</span>}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <style>
        {
          `
        .container {
          width: 700px;
          background-color: white;
          height: 400px;
          margin: 30px auto;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
          border-radius: 0.2rem;
        }

        .wrapper {
          width: 100%;
          height: 100%;
          padding: 10px;
        }

        .tabs-container {
          display: flex;
          height: 50px;
          gap: 10px;
          align-items: center;
          border-bottom: 1px solid #e0e0e0;
        }

        .tab {
          font-weight: 400;
          background-color: #f0f0f0;
          font-size: larger;
          height: 100%;
          display: flex;
          align-items: center;
          padding: 0 20px;
          border-radius: 6px 6px 0 0;
          cursor: pointer;
          position: relative;
          transition: all 0.1s ease-in-out;
        }

        .tab:hover {
          background-color: #e0e0e0;
        }

        .tab.active {
          font-weight: 500;
          background-color: white;
          border: 1px solid #e0e0e0;
          border-bottom: none;
        }

        .tab.active::after {
          content: '';
          position: absolute;
          bottom: -1px;
          left: 0;
          right: 0;
          height: 2px;
          background-color: #007bff;
        }

        .form-container {
          padding: 20px;
          height: calc(100% - 50px);
          overflow-y: auto;
        }

        .form-section {
          display: none;
        }

        .form-section.vis {
          display: block;
        }

        .form-field {
          margin-bottom: 20px;
        }

        .field-label {
          display: block;
          margin-bottom: 5px;
          font-weight: 500;
          color: #333;
        }

        .form-input,
        .form-select {
          width: 100%;
          padding: 8px 12px;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 14px;
          transition: border-color 0.2s ease;
        }

        .form-input:focus,
        .form-select:focus {
          outline: none;
          border-color: #007bff;
        }

        .form-checkbox {
          padding: 12px 16px;
          border-radius:6px;
          flex:1;
          font-size:12px;
        }

        .form-checkbox:focus {
          outline: none;
          border-color: #007bff;
        }

        .error-message {
          color: #dc3545;
          font-size: 12px;
          margin-top: 4px;
          display: block;
        }

        .hidden {
          display: none;
        }
      `
        }</style>
    </div>
  );
};

export default Tabs;