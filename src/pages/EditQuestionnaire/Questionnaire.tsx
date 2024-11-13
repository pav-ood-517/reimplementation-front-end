import React, { useState } from "react";
import ImportModal from "./ImportModal";
import ExportModal from "./ExportModal";

interface ImportedData {
  title: string;
  data: Array<{
    sequence: number; // defines the order of questions
    question: string; // the question itself
    type: string; // type of question which can be Criterion, DropDown, multiple choice etc..
    weight: number; // defines the weight of the question
    text_area_size: string; // size of the text area in rows and columns
    max_label: string;  // the maximum value, differs according to the type
    min_label: string; // the minimum value, differs according to the type
  }>;
}
const questionTypeArray = ['Criterion','Scale','Cake','Dropdown','Checkbox','TextArea','TextField','UploadFile','SectionHeader','TableHeader','ColumnHeader'];

const Questionnaire = () => {
// Sample data for initial questionnaire
  const initialQuestionnaire = {
    title: "Edit Teammate Review",
    data: [
      {
        sequence: 1.0,
        question: "How many times was this person late to meetings?",
        type: "Criterion",
        weight: 1,
        text_area_size: "50, 30",
        max_label: "almost never",
        min_label: "almost always",
      },
      {
        sequence: 2.0,
        question: "How many times did this person not show up?",
        type: "Criterion",
        weight: 1,
        text_area_size: "50, 30",
        max_label: "almost never",
        min_label: "almost always",
      },
      {
        sequence: 3.0,
        question: "How much did this person offer to do in this project?",
        type: "Criterion",
        weight: 1,
        text_area_size: "50, 30",
        max_label: "100%-80%",
        min_label: "20%-0%",
      },
      {
        sequence: 4.0,
        question: "What fraction of the work assigned to this person did s(he) do?",
        type: "Criterion",
        weight: 1,
        text_area_size: "50, 30",
        max_label: "100%-80%",
        min_label: "20%-0%",
      },
      {
        sequence: 4.5,
        question: "Did this person do assigned work on time?",
        type: "Criterion",
        weight: 1,
        text_area_size: "50, 30",
        max_label: "always",
        min_label: "never",
      },
      {
        sequence: 5.0,
        question: "How much initiative did this person take on this project?",
        type: "Criterion",
        weight: 1,
        text_area_size: "50, 30",
        max_label: "a whole lot",
        min_label: "total deadbeat",
      },
      {
        sequence: 6.0,
        question: "Did this person try to avoid doing any task that was necessary?",
        type: "Criterion",
        weight: 1,
        text_area_size: "50, 30",
        max_label: "not at all",
        min_label: "absolutely",
      },
      {
        sequence: 7.0,
        question: "How many of the useful ideas did this person come up with?",
        type: "Criterion",
        weight: 1,
        text_area_size: "50, 30",
        max_label: "100%-80%",
        min_label: "20%-0%",
      },
      {
        sequence: 8.0,
        question: "What fraction of the coding did this person do?",
        type: "Criterion",
        weight: 1,
        text_area_size: "50, 30",
        max_label: "100%-80%",
        min_label: "20%-0%",
      },
      {
        sequence: 9.0,
        question: "What fraction of the documentation did this person write?",
        type: "Criterion",
        weight: 1,
        text_area_size: "50, 30",
        max_label: "100%-80%",
        min_label: "20%-0%",
      },
      {
        sequence: 11.0,
        question: "How important is this person to the team?",
        type: "Criterion",
        weight: 1,
        text_area_size: "50, 30",
        max_label: "indispensable",
        min_label: "redundant",
      },
      // ... additional questions omitted for brevity
    ],
  };
  // State hooks for questionnaire settings
  const [minScore, setMinScore] = useState(0);
  const [maxScore, setMaxScore] = useState(5);
  const [isReviewPrivate, setIsReviewPrivate] = useState(false);

  // State hooks for questionnaire data and modals
  const [questionnaireData, setQuestionnaireData] = useState(initialQuestionnaire);
  const [isImportModalVisible, setImportModalVisible] = useState(false);
  const [isExportModalVisible, setExportModalVisible] = useState(false);

  // Function to export questionnaire data
  const exportQuestionnaire = () => {
    const dataToExport = JSON.stringify(questionnaireData);
    const blob = new Blob([dataToExport], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const downloadLink = document.createElement("a");
    downloadLink.href = url;
    downloadLink.download = "questionnaire.json";
    downloadLink.click();

    URL.revokeObjectURL(url);
  };

  // Function to handle imported data to update questionnaire
  const handleImportData = (importedData: ImportedData) => {
    setQuestionnaireData(importedData);
  };


  return (
    <div>
      <div>
        <h1 className="mt-4">{initialQuestionnaire.title}</h1>
        {/* Min Score Input */}
        <div className="row m-2">
          <div className="col-6">
            Min item score:
            <input
              className="form-control"
              type="number"
              value={minScore}
              onChange={(e) => setMinScore(parseInt(e.target.value, 10))}
              // Using parseInt to convert the input value to a number
            ></input>
          </div>
        </div>
        {/* Max Score Input */}
        <div className="row m-2">
          <div className="col-6">
            Max item score:
            <input
              className="form-control"
              type="number"
              value={maxScore}
              onChange={(e) => setMaxScore(parseInt(e.target.value, 10))}
              // Using parseInt to convert the input value to a number
            ></input>
          </div>
        </div>
        {/* Privacy Toggle */}
        <div className="row m-2">
          <div className="col-6">
            Is this Teammate review private:{' '} 
            <input
              type="checkbox"
              checked={isReviewPrivate}
              onChange={() => setIsReviewPrivate(!isReviewPrivate)}
            />
          </div>
        </div>
        {/* Update Parameters Button */}
        <div className="row m-2">
          <div className="col-6">
            <button
              type="button"
              style={{ borderColor: "black" }}
              className="btn btn-light m-2"
            >
              Update questionnaire parameters
            </button>
          </div>
        </div>
        <hr />

        {/* Display questionnaire items */}
        <div className="row m-2">
          <div className="col-1">sequence</div>
          <div className="col-3">Question</div>
          <div className="col-1">Type</div>
          <div className="col-1">Weight</div>
          <div className="col-1">Text_area_size</div>
          <div className="col-2">Max_label</div>
          <div className="col-2">Min_label</div>
          <div className="col-1">Action</div>
        </div>
        {/* Iterate over questions */}
        {initialQuestionnaire.data.map((item) => {
          return (
            <div className="row m-2">
              <div className="col-1" >
                <input
                  className="form-control"
                  style={{ borderColor: "black",width: "50px" }}
                  type="text"
                  value={item.sequence}
                  disabled
                />
              </div>
              <div className="col-3">
                <input
                  className="form-control"
                  style={{ borderColor: "black" }}
                  type="text"
                  value={item.question}
                ></input>
              </div>
              <div className="col-1">
              <select
                className="form-select"
                style={{ borderColor: "black" }}
                defaultValue = {item.type}
              >
                {questionTypeArray.map((questionType) => 
                    <option key={questionType} value={questionType}>
                      {questionType}
                    </option>
                  )
                }
              </select>
              </div>
              <div className="col-1">
                <input
                  className="form-control"
                  style={{ borderColor: "black" }}
                  type="number"
                  placeholder="1"
                  pattern="[0-9]*" // Only allow numeric values
                  value={item.weight}
                ></input>
              </div>
              <div className="col-1">
                <input
                  className="form-control"
                  style={{ borderColor: "black" }}
                  type="text"
                  value={item.text_area_size}
                  defaultValue="80, 1"
                ></input>
              </div>
              <div className="col-2">
                <input
                  className="form-control"
                  style={{ borderColor: "black" }}
                  type="text"
                  value={item.max_label}
                ></input>
              </div>
              <div className="col-2">
                <input
                  className="form-control"
                  style={{ borderColor: "black" }}
                  type="text"
                  value={item.min_label}
                ></input>
              </div>              
              <div className="col-1">
              <button
                type="button"
                className="btn btn-light"
              >
                Remove
              </button>  
              </div>
            </div>
          );
        })}
        <br /> 
        {/* Add new question inputs */}
        <div className="row m-2">
        <br /> 
        <div className="col-1">
            <input className="form-control" type="text" placeholder="1"></input>
        </div>
        <div className="col-1">
        <p style={{ fontSize: "18px", paddingLeft: 0, paddingRight: 0 }}>
          more
        </p>
        </div>
        <div className="col-2">
            <select className="form-select">
            <option value="Criterion">Criterion</option>
            <option value="Scale">Scale</option>
            <option value="Cake">Cake</option>
            <option value="Dropdown">Dropdown</option>
            <option value="Checkbox">Checkbox</option>
            <option value="TextArea">TextArea</option>
            <option value="TextField">TextField</option>
            <option value="UploadFile">UploadFile</option>
            <option value="SectionHeader">SectionHeader</option>
            <option value="TableHeader">TableHeader</option>
            <option value="ColumnHeader">ColumnHeader</option>
            </select>
        </div>
        <div className="col-1">
        <p style={{ fontSize: "18px" }}>
        question(s)
        </p>
        </div>
        <div className="col-2">
        <button
            type="button"
            style={{ backgroundColor: "#4d8ac0", borderColor: "#4d8ac0" ,  marginBottom: '20px' }}
            className="btn btn-primary"
          >
            Add Question
          </button> 
          </div>
        </div>
        <br /> 
        {/* Save all questions button */}
        <div className="row m-2">
        <div className="col-2">
          <button
            type="button"
            style={{ backgroundColor: "#4d8ac0", borderColor: "#4d8ac0" }}
            className="btn btn-primary"
          >
            Save all questions
          </button>
        </div>
        </div>
        <div className="row m-2">
        <div className="col-2">
          <button
            type="button"
            style={{ borderColor: "black" }}
            className="btn btn-light"
          >
            Edit/View Advice
          </button>
        </div>
        </div>
        <hr />
        {/* Import/Export Section */}
        <div>
          <div>
            <button
              style={{ color: "#b28b66"}}
              onClick={() => setImportModalVisible(true)}
            >
              Import Questionnaire
            </button>{" "}
            |
            <button
             
              style={{ color: "#b28b66" }}
              onClick={() => setExportModalVisible(true)}
            >
              Export Questionnaire
            </button>
          </div>

          {/* Render import and export modals conditionally */}
          {isImportModalVisible && (
            <ImportModal
              onClose={() => setImportModalVisible(false)}
              onImport={handleImportData}
            />
          )}
          {isExportModalVisible && (
            <ExportModal
              onClose={() => setExportModalVisible(false)}
              onExport={exportQuestionnaire}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Questionnaire;