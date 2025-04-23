const UsageButton = ({ label, cost, onUse }) => {
    return (
      <button
        onClick={() => onUse(label, cost)}
        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded shadow"
      >
        {label} (-{cost})
      </button>
    );
  };
  
  export default UsageButton;
  