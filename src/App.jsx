import React, { useState, useEffect, useMemo, useRef } from "react";
import {
  Container,
  Grid,
  Switch,
  FormControlLabel,
  Slider,
  Checkbox,
  Button,
  TextField,
  Alert,
} from "@mui/material";
import Odometer from "react-odometerjs";
import "odometer/themes/odometer-theme-default.css";
import { Line } from "react-chartjs-2";
import { useTable } from "react-table";
import "chart.js/auto";
import SideNav from "./SideNav"; // Ensure you have this component
import Feedback from "./Feedback"; // Ensure you have this component
import "./App.css"; // Include custom styles

const App = () => {
  const [searchInput, setSearchInput] = useState("");
  const [showFeatures, setShowFeatures] = useState([]); // Initially empty
  const [showFeedback, setShowFeedback] = useState(false); // Feedback state

  // Sample data for the chart
  const chartData = useMemo(() => ({
    labels: ["January", "February", "March", "April"],
    datasets: [
      {
        label: "Sales",
        data: [300, 500, 200, 800],
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
      },
    ],
  }), []);

  const [timer, setTimer] = useState(0);
  const [recording, setRecording] = useState(false);

  // Video timer functionality
  useEffect(() => {
    let interval;
    if (recording) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
      }, 1000);
    } else if (!recording && timer !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [recording, timer]);

  // Table-related states and methods using React Table
  const data = useMemo(
    () => [
      { col1: "Row 1", col2: "Data 1" },
      { col1: "Row 2", col2: "Data 2" },
    ],
    []
  );
  const columns = useMemo(
    () => [
      { Header: "Column 1", accessor: "col1" },
      { Header: "Column 2", accessor: "col2" },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  // Chatbot-related states
  const [input, setInput] = useState("");
  const [conversations, setConversations] = useState([
    { text: "Hello! How can I assist you?", type: "bot" },
  ]);
  const messagesEndRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      setConversations([...conversations, { text: input, type: "user" }]);
      setSearchInput(input); // Set search input when sending message
      setInput("");
      // Automatically scroll to the last message
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  };

  // List of available feature names
  const featureNames = [
    "odometer",
    "toggle switch",
    "slider control",
    "checkboxes",
    "alert message",
    "chart graph",
    "video timer",
    "editable table",
    "chatbot interface",
  ];

  // Handle search input and filter features
  useEffect(() => {
    if (searchInput.trim() === "") {
      setShowFeatures([]); // Hide features when input is empty
    } else {
      const searchTerms = searchInput.toLowerCase().split(" ");
      const filteredFeatures = featureNames.filter((feature) => {
        return searchTerms.some((term) => feature.includes(term));
      });
      setShowFeatures(filteredFeatures);
    }
  }, [searchInput]);

  return (
    <Container maxWidth="lg" style={{ marginTop: "20px" }}>
      <div className="app">
        <SideNav onNewChatClick={() => setShowFeedback(true)} />
        <div className="main-content">
          {showFeedback && (
            <div className="chat-container">
              <Feedback />
              <div className="chat-input">
                <form onSubmit={handleSubmit}>
                  <TextField
                    label="Type a message..."
                    variant="outlined"
                    fullWidth
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    style={{ marginTop: "10px" }}
                  >
                    Send
                  </Button>
                </form>
              </div>
              <div className="chatbot-messages">
                {conversations.map((conversation, index) => (
                  <div
                    key={index}
                    className={`chatbot-message ${
                      conversation.type === "bot" ? "bot-message" : "user-message"
                    }`}
                  >
                    {conversation.text}
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            </div>
          )}
          <Grid container spacing={4}>
            {showFeatures.includes("odometer") && (
              <Grid item xs={12} sm={6} md={4}>
                <h3>Odometer Display</h3>
                <Odometer value={1000} format="d" />
                <Button variant="contained">Increment</Button>
              </Grid>
            )}

            {showFeatures.includes("toggle switch") && (
              <Grid item xs={12} sm={6} md={4}>
                <h3>Toggle Switch</h3>
                <FormControlLabel control={<Switch color="primary" />} label="OFF" />
              </Grid>
            )}

            {showFeatures.includes("slider control") && (
              <Grid item xs={12} sm={6} md={4}>
                <h3>Slider Control</h3>
                <Slider aria-labelledby="continuous-slider" valueLabelDisplay="auto" />
              </Grid>
            )}

            {showFeatures.includes("checkboxes") && (
              <Grid item xs={12} sm={6} md={4}>
                <h3>Checkboxes</h3>
                <FormControlLabel control={<Checkbox />} label="Option 1" />
                <FormControlLabel control={<Checkbox />} label="Option 2" />
                <FormControlLabel control={<Checkbox />} label="Option 3" />
              </Grid>
            )}

            {showFeatures.includes("alert message") && (
              <Grid item xs={12} sm={6} md={4}>
                <h3>Alerts</h3>
                <Alert severity="success">This is a success alert!</Alert>
              </Grid>
            )}

            {showFeatures.includes("chart graph") && (
              <Grid item xs={12} md={8}>
                <h3>Chart</h3>
                <Line data={chartData} />
              </Grid>
            )}

            {showFeatures.includes("video timer") && (
              <Grid item xs={12} sm={6} md={4}>
                <h3>Video Timer</h3>
                <div style={{ fontSize: "2em", marginBottom: "10px" }}>
                  00:{(timer % 60).toString().padStart(2, "0")}
                </div>
                <Button
                  variant="contained"
                  color={recording ? "secondary" : "primary"}
                  onClick={() => setRecording(!recording)}
                >
                  {recording ? "Stop Recording" : "Start Recording"}
                </Button>
              </Grid>
            )}

            {showFeatures.includes("editable table") && (
              <Grid item xs={12}>
                <h3>Editable Table</h3>
                <table {...getTableProps()} style={{ width: "100%", border: "1px solid black" }}>
                  <thead>
                    {headerGroups.map((headerGroup) => (
                      <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column) => (
                          <th
                            {...column.getHeaderProps()}
                            style={{
                              padding: "8px",
                              backgroundColor: "#f0f0f0",
                            }}
                          >
                            {column.render("Header")}
                          </th>
                        ))}
                      </tr>
                    ))}
                  </thead>
                  <tbody {...getTableBodyProps()}>
                    {rows.map((row) => {
                      prepareRow(row);
                      return (
                        <tr {...row.getRowProps()}>
                          {row.cells.map((cell) => (
                            <td
                              {...cell.getCellProps()}
                              style={{
                                padding: "8px",
                                border: "1px solid black",
                              }}
                            >
                              {cell.render("Cell")}
                            </td>
                          ))}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </Grid>
            )}

            {showFeatures.includes("chatbot interface") && (
              <Grid item xs={12} sm={6}>
                <h3>Chatbot Interface</h3>
                <div className="chatbot-container">
                  {/* Chatbot rendering will be handled here */}
                </div>
              </Grid>
            )}
          </Grid>
        </div>
      </div>
    </Container>
  );
};

export default App;