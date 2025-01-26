// /home/hassanjan/smit-hackathon-frontend/src/components/AdminDashboard/AppointmentModal.jsx

import React from "react";
import { Button } from "@/components/ui/button";

const AppointmentModal = ({
  showModal,
  setShowModal,
  appointmentDetails,
  setAppointmentDetails,
  handleModalSubmit,
}) => {
  if (!showModal) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Appointment Details</h2>
        <div className="mb-4">
          <label className="block mb-2">Date:</label>
          <input
            type="date"
            value={appointmentDetails.date}
            onChange={(e) =>
              setAppointmentDetails({
                ...appointmentDetails,
                date: e.target.value,
              })
            }
            className="p-2 border rounded w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Time:</label>
          <input
            type="time"
            value={appointmentDetails.time}
            onChange={(e) =>
              setAppointmentDetails({
                ...appointmentDetails,
                time: e.target.value,
              })
            }
            className="p-2 border rounded w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Location:</label>
          <input
            type="text"
            value={appointmentDetails.location}
            onChange={(e) =>
              setAppointmentDetails({
                ...appointmentDetails,
                location: e.target.value,
              })
            }
            className="p-2 border rounded w-full"
          />
        </div>
        <div className="flex justify-end">
          <Button onClick={() => setShowModal(false)} className="mr-2">
            Cancel
          </Button>
          <Button onClick={handleModalSubmit}>Submit</Button>
        </div>
      </div>
    </div>
  );
};

export default AppointmentModal;
