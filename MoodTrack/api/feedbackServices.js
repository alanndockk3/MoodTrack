export const sendFeedbackToServer = async (feedback) => {
  try {
    const response = await fetch("http://127.0.0.1:5000/feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(feedback),
    });
    console.log("Feedback sent to server:", feedback);
    return response.json();
  } catch (error) {
    console.error("Error sending feedback to server:", error);
  }
};
