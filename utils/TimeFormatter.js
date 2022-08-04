const millisecondFormatter = (timeInMs) => `${Math.floor(timeInMs / 1000)}s ${timeInMs % 1000}ms`;
export default millisecondFormatter;