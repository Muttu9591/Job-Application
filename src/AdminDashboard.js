import React, { useEffect, useState } from "react";
import moment from "moment";
import axios from "axios";

function AdminDashboard() {
  const [candidates, setCandidates] = useState([]);
  const [jobTitles, setJobTitles] = useState([
    "Frontend Developer",
    "FullStack developer",
    "Devops Engineer",
    "Cloud Infrastructure Engineer"
  ]);
  const [selectedJob, setSelectedJob] = useState("Frontend Developer");

  useEffect(() => {
    axios.get("/users/application-form").then((res) => {
      // console.log(res.data);
      const candidates = res.data;
      setCandidates({ candidates }).catch((err) => {
        console.log(err);
      });
    });
  }, []);

  function changeTitle(title) {
    setJobTitles({ selectedJob: title });
  }

  function handleViewDetails(id) {
    axios.get("/users/application-form/${id}").then((res) => {
      const item = res.data;
      alert(`${item.name}- ${item.email}-${item.contact}`);
    });
  }

  function handleStatus(id, status) {
    axios
      .put(`/users/application-form/update/${id}`, { status })
      .then((res) => {
        const item = res.data;
        alert(`candidate has been ${item.status}`);
        setCandidates((prevState) => ({
          candidates: prevState.candidates.map((cand) => {
            if (cand._id === item._id) {
              return { ...item };
            } else {
              return { ...cand };
            }
          })
        }));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      <div>
        <h2>Admin Dashboard</h2>
        {jobTitles.map((title) => {
          console.log(title);
          return <button onClick={() => changeTitle(title)}>{title}</button>;
        })}
        <h1>{selectedJob}s</h1>
        <p>List of candidates applied for {selectedJob}s job</p>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Technical skills</th>
              <th>Experience</th>
              <th>Applied Date</th>
              <th>View Details</th>
              <th>Update application status</th>
            </tr>
          </thead>
          <tbody>
            {candidates
              .filter((item) => item.jobTitles === selectedJob)
              .map((item) => {
                return (
                  <tr>
                    <td>{item.name}</td>
                    <td>{item.skills}</td>
                    <td>{item.Experience}</td>
                    <td>{moment(item.createAt).format("DD/MM/YYYY")}</td>
                    <td>
                      <button
                        onClick={() => {
                          handleViewDetails(item._id);
                        }}
                      >
                        View Details
                      </button>
                    </td>
                    <td>
                      {item.status === "applied"}? (
                      <div>
                        <button
                          onClick={() => {
                            handleStatus(item._id, "short listed");
                          }}
                        >
                          Short Listed
                        </button>
                        <button
                          onClick={() => {
                            handleStatus(item._id, "rejected");
                          }}
                        >
                          Rejected
                        </button>
                      </div>
                      ) :<button>{item.status}</button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </>
  );
}
export default AdminDashboard;
