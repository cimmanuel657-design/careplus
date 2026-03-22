import Array "mo:core/Array";
import Int "mo:core/Int";
import Map "mo:core/Map";

import Nat "mo:core/Nat";
import Runtime "mo:core/Runtime";
import Time "mo:core/Time";
import Text "mo:core/Text";


actor {
  module Appointment {
    public type Status = {
      #pending;
      #confirmed;
      #cancelled;
    };
  };

  type Doctor = {
    id : Nat;
    name : Text;
    specialty : Text;
    bio : Text;
  };

  type Appointment = {
    id : Nat;
    doctorId : Nat;
    patientName : Text;
    patientEmail : Text;
    date : Text;
    timeSlot : Text;
    reason : Text;
    status : Appointment.Status;
    timestamp : Time.Time;
  };

  var nextAppointmentId = 1;

  let doctors = Map.fromIter<Nat, Doctor>([
    (
      1,
      {
        id = 1;
        name = "Dr. Alice Thompson";
        specialty = "Cardiology";
        bio = "Expert in heart health with 15+ years of experience in cardiovascular medicine.";
      },
    ),
    (
      2,
      {
        id = 2;
        name = "Dr. Mark Patel";
        specialty = "Dermatology";
        bio = "Specialist in skin disorders and cosmetic dermatology treatments.";
      },
    ),
    (
      3,
      {
        id = 3;
        name = "Dr. Susan Lee";
        specialty = "Pediatrics";
        bio = "Caring pediatrician focused on children`s health and well-being from infancy to adolescence.";
      },
    ),
    (
      4,
      {
        id = 4;
        name = "Dr. John Kim";
        specialty = "Orthopedics";
        bio = "Experienced in treating bone, joint, and muscle conditions.";
      },
    ),
    (
      5,
      {
        id = 5;
        name = "Dr. Maria Gonzalez";
        specialty = "General Practice";
        bio = "Well-rounded family doctor providing comprehensive primary care.";
      },
    ),
  ].values());

  let appointments = Map.empty<Nat, Appointment>();

  public query ({ caller }) func getDoctors() : async [Doctor] {
    doctors.values().toArray();
  };

  public query ({ caller }) func getDoctor(id : Nat) : async Doctor {
    switch (doctors.get(id)) {
      case (null) { Runtime.trap("Doctor does not exist") };
      case (?doctor) { doctor };
    };
  };

  public shared ({ caller }) func bookAppointment(
    doctorId : Nat,
    patientName : Text,
    patientEmail : Text,
    date : Text,
    timeSlot : Text,
    reason : Text,
  ) : async Nat {
    if (patientName.trim(#char(' ')).size() == 0) {
      Runtime.trap("Patient name cannot be empty");
    };
    if (patientEmail.trim(#char(' ')).size() == 0) {
      Runtime.trap("Patient email cannot be empty");
    };
    if (date.trim(#char(' ')).size() == 0) {
      Runtime.trap("Date cannot be empty");
    };
    if (timeSlot.trim(#char(' ')).size() == 0) {
      Runtime.trap("Time slot cannot be empty");
    };
    if (reason.trim(#char(' ')).size() == 0) {
      Runtime.trap("Reason cannot be empty");
    };

    if (doctors.get(doctorId) == null) {
      Runtime.trap("Doctor does not exist");
    };

    let conflictingAppointment = appointments.values().toArray().find(
      func(appointment) {
        appointment.doctorId == doctorId and appointment.date == date and appointment.timeSlot == timeSlot and (appointment.status == #pending or appointment.status == #confirmed)
      }
    );

    switch (conflictingAppointment) {
      case (null) {};
      case (_) { Runtime.trap("Time slot already booked") };
    };

    let appointment : Appointment = {
      id = nextAppointmentId;
      doctorId;
      patientName;
      patientEmail;
      date;
      timeSlot;
      reason;
      status = #pending;
      timestamp = Time.now();
    };

    appointments.add(nextAppointmentId, appointment);
    nextAppointmentId += 1;
    appointment.id;
  };

  public query ({ caller }) func getAppointmentsByEmail(email : Text) : async [Appointment] {
    appointments.values().toArray().filter(func(appointment) { appointment.patientEmail == email });
  };

  public query ({ caller }) func getAllAppointments() : async [Appointment] {
    appointments.values().toArray();
  };

  public shared ({ caller }) func updateAppointmentStatus(id : Nat, status : Appointment.Status) : async () {
    switch (appointments.get(id)) {
      case (null) { Runtime.trap("Appointment does not exist") };
      case (?appointment) {
        let updatedAppointment = {
          id = appointment.id;
          doctorId = appointment.doctorId;
          patientName = appointment.patientName;
          patientEmail = appointment.patientEmail;
          date = appointment.date;
          timeSlot = appointment.timeSlot;
          reason = appointment.reason;
          status;
          timestamp = appointment.timestamp;
        };
        appointments.add(id, updatedAppointment);
      };
    };
  };
};
