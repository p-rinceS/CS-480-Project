import "./ModelList.css";

// Displays all models as list where models can be selected or deleted
const ModelList = ({ models, updateModelId }) => {
  return (
    <>
      <div className="model-list">
        {models
          .sort((a, b) => b.year - a.year)
          .map((model) => (
            <div key={model.modelId} className="model-list-item">
              <button
                className="select-model"
                onClick={() => updateModelId(model.modelId)}
              >
                <h4 className="model-title">
                  {model.transmission +
                    " " +
                    model.color +
                    " " +
                    model.year +
                    " Model"}
                </h4>
              </button>
              <button className="delete-button">Delete</button>
            </div>
          ))}
      </div>
    </>
  );
};

export default ModelList;
