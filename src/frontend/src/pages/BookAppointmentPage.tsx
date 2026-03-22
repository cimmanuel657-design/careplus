import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Loader2,
  User2,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import type { Doctor } from "../backend.d";
import { useBookAppointment, useGetDoctors } from "../hooks/useQueries";

const TIME_SLOTS: string[] = [];
for (let h = 9; h < 17; h++) {
  TIME_SLOTS.push(`${h > 12 ? h - 12 : h}:00 ${h >= 12 ? "PM" : "AM"}`);
  TIME_SLOTS.push(`${h > 12 ? h - 12 : h}:30 ${h >= 12 ? "PM" : "AM"}`);
}
TIME_SLOTS.push("5:00 PM");

const STEPS = [
  { num: 1, label: "Select Doctor", icon: User2 },
  { num: 2, label: "Date & Time", icon: CalendarDays },
  { num: 3, label: "Your Info", icon: Clock3 },
  { num: 4, label: "Confirm", icon: CheckCircle2 },
];

export function BookAppointmentPage() {
  const { data: doctors = [], isLoading } = useGetDoctors();
  const bookMutation = useBookAppointment();

  const [step, setStep] = useState(1);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [patientName, setPatientName] = useState("");
  const [patientEmail, setPatientEmail] = useState("");
  const [reason, setReason] = useState("");
  const [appointmentId, setAppointmentId] = useState<bigint | null>(null);

  const today = new Date().toISOString().split("T")[0];

  async function handleConfirm() {
    if (!selectedDoctor) return;
    try {
      const id = await bookMutation.mutateAsync({
        doctorId: selectedDoctor.id,
        patientName,
        patientEmail,
        date: selectedDate,
        timeSlot: selectedTime,
        reason,
      });
      setAppointmentId(id);
      setStep(5);
    } catch (e) {
      console.error(e);
    }
  }

  if (step === 5 && appointmentId !== null) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-3xl shadow-booking p-10 max-w-md w-full text-center"
          data-ocid="booking.success_state"
        >
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-5">
            <CheckCircle2 className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Appointment Booked!
          </h2>
          <p className="text-muted-foreground mb-5">
            Your appointment has been successfully scheduled.
          </p>
          <div className="bg-background rounded-xl p-4 text-left space-y-2 mb-6">
            <p className="text-sm">
              <span className="font-semibold text-foreground">
                Appointment ID:
              </span>{" "}
              <span className="text-primary font-mono">
                #{String(appointmentId)}
              </span>
            </p>
            <p className="text-sm">
              <span className="font-semibold text-foreground">Doctor:</span>{" "}
              {selectedDoctor?.name}
            </p>
            <p className="text-sm">
              <span className="font-semibold text-foreground">Date:</span>{" "}
              {selectedDate}
            </p>
            <p className="text-sm">
              <span className="font-semibold text-foreground">Time:</span>{" "}
              {selectedTime}
            </p>
            <p className="text-sm">
              <span className="font-semibold text-foreground">Patient:</span>{" "}
              {patientName}
            </p>
          </div>
          <Button
            className="w-full bg-primary hover:bg-navy-dark text-white"
            onClick={() => {
              setStep(1);
              setSelectedDoctor(null);
              setSelectedDate("");
              setSelectedTime("");
              setPatientName("");
              setPatientEmail("");
              setReason("");
              setAppointmentId(null);
            }}
            data-ocid="booking.primary_button"
          >
            Book Another Appointment
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-10 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-1">
            Book an Appointment
          </h1>
          <p className="text-muted-foreground">
            Complete the steps below to schedule your visit
          </p>
        </div>

        {/* Steps indicator */}
        <div className="flex items-center justify-center gap-2 md:gap-4 mb-8">
          {STEPS.map((s, i) => (
            <div key={s.num} className="flex items-center gap-2 md:gap-4">
              <div
                className={`step-pill ${step >= s.num ? (step > s.num ? "done" : "active") : ""}`}
              >
                <div className="step-num">
                  {step > s.num ? <Check className="w-4 h-4" /> : s.num}
                </div>
                <span
                  className={`hidden md:block text-sm font-medium ${step === s.num ? "text-foreground" : "text-muted-foreground"}`}
                >
                  {s.label}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div
                  className={`w-8 h-0.5 rounded-full transition-colors ${step > s.num ? "bg-primary" : "bg-border"}`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Main card */}
        <div className="bg-white rounded-3xl shadow-booking p-6 md:p-8">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
              >
                <h2 className="text-xl font-bold text-foreground mb-5">
                  Select a Doctor
                </h2>
                {isLoading ? (
                  <div
                    className="grid grid-cols-1 gap-3"
                    data-ocid="step1.loading_state"
                  >
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="h-24 bg-background rounded-xl animate-pulse"
                      />
                    ))}
                  </div>
                ) : doctors.length === 0 ? (
                  <div
                    className="text-center py-10 text-muted-foreground"
                    data-ocid="step1.empty_state"
                  >
                    <p>No doctors available.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {doctors.map((doc, i) => (
                      <button
                        type="button"
                        key={String(doc.id)}
                        className={`doctor-card text-left w-full ${selectedDoctor?.id === doc.id ? "selected" : ""}`}
                        onClick={() => setSelectedDoctor(doc)}
                        onKeyDown={(e) =>
                          e.key === "Enter" && setSelectedDoctor(doc)
                        }
                        data-ocid={`step1.item.${i + 1}`}
                      >
                        <div className="flex items-start gap-3">
                          <div className="w-11 h-11 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                            <span className="text-primary font-bold">
                              {doc.name.charAt(0)}
                            </span>
                          </div>
                          <div className="min-w-0">
                            <p className="font-semibold text-foreground text-sm">
                              {doc.name}
                            </p>
                            <p className="text-primary text-xs font-medium">
                              {doc.specialty}
                            </p>
                            <p className="text-muted-foreground text-xs mt-1 line-clamp-2">
                              {doc.bio}
                            </p>
                          </div>
                          {selectedDoctor?.id === doc.id && (
                            <Check className="w-5 h-5 text-primary flex-shrink-0" />
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
              >
                <h2 className="text-xl font-bold text-foreground mb-5">
                  Select Date & Time
                </h2>
                <div className="mb-6">
                  <Label className="text-sm font-medium mb-2 block">
                    Appointment Date
                  </Label>
                  <Input
                    type="date"
                    min={today}
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="max-w-xs"
                    data-ocid="step2.input"
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium mb-3 block">
                    Available Time Slots
                  </Label>
                  <div className="flex flex-wrap gap-2">
                    {TIME_SLOTS.map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        className={`time-slot ${selectedTime === slot ? "selected" : ""}`}
                        onClick={() => setSelectedTime(slot)}
                        data-ocid="step2.toggle"
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
              >
                <h2 className="text-xl font-bold text-foreground mb-5">
                  Patient Information
                </h2>
                <div className="space-y-4">
                  <div>
                    <Label
                      htmlFor="patientName"
                      className="text-sm font-medium mb-1.5 block"
                    >
                      Full Name *
                    </Label>
                    <Input
                      id="patientName"
                      placeholder="Enter your full name"
                      value={patientName}
                      onChange={(e) => setPatientName(e.target.value)}
                      data-ocid="step3.input"
                    />
                  </div>
                  <div>
                    <Label
                      htmlFor="patientEmail"
                      className="text-sm font-medium mb-1.5 block"
                    >
                      Email Address *
                    </Label>
                    <Input
                      id="patientEmail"
                      type="email"
                      placeholder="Enter your email"
                      value={patientEmail}
                      onChange={(e) => setPatientEmail(e.target.value)}
                      data-ocid="step3.input"
                    />
                  </div>
                  <div>
                    <Label
                      htmlFor="reason"
                      className="text-sm font-medium mb-1.5 block"
                    >
                      Reason for Visit *
                    </Label>
                    <Textarea
                      id="reason"
                      placeholder="Briefly describe your symptoms or reason for the visit..."
                      rows={4}
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                      data-ocid="step3.textarea"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
              >
                <h2 className="text-xl font-bold text-foreground mb-5">
                  Review & Confirm
                </h2>
                <div className="bg-background rounded-2xl p-5 space-y-3 mb-6">
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-sm text-muted-foreground">
                      Doctor
                    </span>
                    <span className="text-sm font-semibold text-foreground">
                      {selectedDoctor?.name}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-sm text-muted-foreground">
                      Specialty
                    </span>
                    <span className="text-sm font-medium text-primary">
                      {selectedDoctor?.specialty}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-sm text-muted-foreground">Date</span>
                    <span className="text-sm font-semibold text-foreground">
                      {selectedDate}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-sm text-muted-foreground">Time</span>
                    <span className="text-sm font-semibold text-foreground">
                      {selectedTime}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-sm text-muted-foreground">
                      Patient
                    </span>
                    <span className="text-sm font-semibold text-foreground">
                      {patientName}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-sm text-muted-foreground">Email</span>
                    <span className="text-sm font-semibold text-foreground">
                      {patientEmail}
                    </span>
                  </div>
                  <div className="py-2">
                    <span className="text-sm text-muted-foreground block mb-1">
                      Reason
                    </span>
                    <span className="text-sm text-foreground">{reason}</span>
                  </div>
                </div>
                {bookMutation.isError && (
                  <p
                    className="text-destructive text-sm mb-4"
                    data-ocid="booking.error_state"
                  >
                    Failed to book appointment. Please try again.
                  </p>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
            <Button
              variant="outline"
              onClick={() => setStep((s) => Math.max(1, s - 1))}
              disabled={step === 1}
              className="gap-2"
              data-ocid="booking.secondary_button"
            >
              <ChevronLeft className="w-4 h-4" />
              Back
            </Button>

            {step < 4 ? (
              <Button
                className="bg-primary hover:bg-navy-dark text-white gap-2"
                onClick={() => setStep((s) => s + 1)}
                disabled={
                  (step === 1 && !selectedDoctor) ||
                  (step === 2 && (!selectedDate || !selectedTime)) ||
                  (step === 3 && (!patientName || !patientEmail || !reason))
                }
                data-ocid="booking.primary_button"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </Button>
            ) : (
              <Button
                className="bg-primary hover:bg-navy-dark text-white gap-2"
                onClick={handleConfirm}
                disabled={bookMutation.isPending}
                data-ocid="booking.submit_button"
              >
                {bookMutation.isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Booking...
                  </>
                ) : (
                  <>
                    Confirm Booking <Check className="w-4 h-4" />
                  </>
                )}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
