import React from "react";
import "./Feedback.css"; // Include custom styles

const Feedback = () => (
  <div className="feedback">
    <div className="feedback-message">
      <h3>EUREKA</h3>
      <p>Your feedback is important for us.</p>
    </div>
    <table className="feedback-table">
      <thead>
        <tr>
          <th>Question</th>
          <th>User's Response</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1. How satisfied are you with our service? (1-5)</td>
          <td><input style={{borderRadius: "none"}}/></td>
        </tr>
        <tr>
          <td>2. What do you like most about our service?</td>
          <td><input/></td>
        </tr>
        <tr>
          <td>3. What improvements would you suggest?</td>
          <td><input/></td>
        </tr>
        <tr>
          <td>4. How likely are you to recommend us? (1-10)</td>
          <td><input/></td>
        </tr>
        <tr>
          <td>5. Any additional comments or suggestions?</td>
          <td><input/></td>
        </tr>
      </tbody>
    </table>
  </div>
);

export default Feedback;
