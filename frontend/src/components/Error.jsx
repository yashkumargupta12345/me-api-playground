const ErrorMessage = ({ error, onRetry }) => {
  return (
    <div className="max-w-md mx-auto mt-8">
      <div className="bg-red-900/50 border border-red-500 rounded-lg p-6 text-center">
        <div className="text-red-400 text-4xl mb-4">⚠️</div>
        <h3 className="text-red-300 font-semibold text-lg mb-2">Oops! Something went wrong</h3>
        <p className="text-red-200 mb-4">{error}</p>
        {onRetry && (
          <button 
            onClick={onRetry}
            className="btn-primary"
          >
            Try Again
          </button>
        )}
      </div>
    </div>
  );
};

export default ErrorMessage;