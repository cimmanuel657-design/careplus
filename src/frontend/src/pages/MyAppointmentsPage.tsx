import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  CalendarDays,
  Clock,
  Loader2,
  Search,
  Stethoscope,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import type { Doctor } from "../backend.d";
import { useGetAppointmentsByEmail, useGetDoctors } from "../hooks/useQueries";

function StatusBadge({ status }: { status: string }) {
  const cls =
    status === "confirmed"
      ? "status-badge-confirmed"
      : status === "cancelled"
        ? "status-badge-cancelled"
        : "status-badge-pending";
  return (
    <span
      className={`${cls} inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold capitalize`}
    >
      {status}
    </span>
  );
}

export function MyAppointmentsPage() {
  const [emailInput, setEmailInput] = useState("");
  const [searchEmail, setSearchEmail] = useState("");

  const { data: doctors = [] } = useGetDoctors();
  const {
    data: appointments = [],
    isLoading,
    isFetched,
  } = useGetAppointmentsByEmail(searchEmail);

  const doctorMap = new Map<string, Doctor>(
    doctors.map((d) => [String(d.id), d]),
  );

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    setSearchEmail(emailInput.trim());
  }

  return (
    <div className="min-h-screen bg-background py-10 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-1">
            My Appointments
          </h1>
          <p className="text-muted-foreground">
            Enter your email to view your upcoming and past appointments
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-card p-6 mb-6">
          <form onSubmit={handleSearch} className="flex gap-3">
            <Input
              type="email"
              placeholder="Enter your email address"
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              className="flex-1"
              data-ocid="appointments.search_input"
            />
            <Button
              type="submit"
              className="bg-primary hover:bg-navy-dark text-white gap-2 px-6"
              disabled={!emailInput.trim() || isLoading}
              data-ocid="appointments.primary_button"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Search className="w-4 h-4" />
              )}
              Search
            </Button>
          </form>
        </div>

        {isLoading && (
          <div className="space-y-3" data-ocid="appointments.loading_state">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-24 bg-white rounded-xl animate-pulse" />
            ))}
          </div>
        )}

        {!isLoading &&
          isFetched &&
          searchEmail &&
          appointments.length === 0 && (
            <div
              className="bg-white rounded-2xl shadow-card p-10 text-center"
              data-ocid="appointments.empty_state"
            >
              <CalendarDays className="w-10 h-10 mx-auto mb-3 text-muted-foreground opacity-50" />
              <p className="font-medium text-foreground">
                No appointments found
              </p>
              <p className="text-muted-foreground text-sm mt-1">
                We couldn&apos;t find any appointments for this email address.
              </p>
            </div>
          )}

        {!isLoading && appointments.length > 0 && (
          <div className="space-y-3">
            {appointments.map((appt, i) => {
              const doctor = doctorMap.get(String(appt.doctorId));
              return (
                <motion.div
                  key={String(appt.id)}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 }}
                  className="bg-white rounded-2xl shadow-card p-5 flex flex-col sm:flex-row sm:items-center gap-4"
                  data-ocid={`appointments.item.${i + 1}`}
                >
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Stethoscope className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 flex-wrap">
                      <div>
                        <p className="font-semibold text-foreground">
                          {doctor?.name ?? `Doctor #${String(appt.doctorId)}`}
                        </p>
                        <p className="text-primary text-sm">
                          {doctor?.specialty}
                        </p>
                      </div>
                      <StatusBadge status={String(appt.status)} />
                    </div>
                    <div className="flex items-center gap-4 mt-2 text-muted-foreground text-sm">
                      <span className="flex items-center gap-1">
                        <CalendarDays className="w-3.5 h-3.5" /> {appt.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" /> {appt.timeSlot}
                      </span>
                    </div>
                    {appt.reason && (
                      <p className="text-xs text-muted-foreground mt-1.5 line-clamp-1">
                        Reason: {appt.reason}
                      </p>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
