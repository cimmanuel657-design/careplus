import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  CalendarDays,
  Clock,
  Loader2,
  RefreshCw,
  Stethoscope,
  User,
} from "lucide-react";
import { motion } from "motion/react";
import { toast } from "sonner";
import { Status } from "../backend.d";
import type { Doctor } from "../backend.d";
import {
  useGetAllAppointments,
  useGetDoctors,
  useUpdateAppointmentStatus,
} from "../hooks/useQueries";

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

export function AdminPage() {
  const {
    data: appointments = [],
    isLoading,
    refetch,
  } = useGetAllAppointments();
  const { data: doctors = [] } = useGetDoctors();
  const updateMutation = useUpdateAppointmentStatus();

  const doctorMap = new Map<string, Doctor>(
    doctors.map((d) => [String(d.id), d]),
  );

  async function handleStatusChange(id: bigint, status: string) {
    let s: Status;
    if (status === "confirmed") s = Status.confirmed;
    else if (status === "cancelled") s = Status.cancelled;
    else s = Status.pending;

    try {
      await updateMutation.mutateAsync({ id, status: s });
      toast.success("Status updated");
    } catch {
      toast.error("Failed to update status");
    }
  }

  return (
    <div className="min-h-screen bg-background py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Admin Dashboard
            </h1>
            <p className="text-muted-foreground mt-1">
              Manage all appointments and their statuses
            </p>
          </div>
          <Button
            variant="outline"
            onClick={() => refetch()}
            className="gap-2 border-primary text-primary hover:bg-secondary"
            data-ocid="admin.secondary_button"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            {
              label: "Total",
              count: appointments.length,
              color: "text-primary",
            },
            {
              label: "Confirmed",
              count: appointments.filter(
                (a) => String(a.status) === "confirmed",
              ).length,
              color: "text-green-600",
            },
            {
              label: "Pending",
              count: appointments.filter((a) => String(a.status) === "pending")
                .length,
              color: "text-yellow-600",
            },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-white rounded-xl p-4 shadow-card text-center"
            >
              <p className={`text-2xl font-bold ${stat.color}`}>{stat.count}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

        {isLoading ? (
          <div
            className="bg-white rounded-2xl shadow-card p-10 text-center"
            data-ocid="admin.loading_state"
          >
            <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto" />
            <p className="text-muted-foreground mt-3">
              Loading appointments...
            </p>
          </div>
        ) : appointments.length === 0 ? (
          <div
            className="bg-white rounded-2xl shadow-card p-10 text-center"
            data-ocid="admin.empty_state"
          >
            <CalendarDays className="w-10 h-10 mx-auto mb-3 text-muted-foreground opacity-50" />
            <p className="font-medium text-foreground">No appointments yet</p>
          </div>
        ) : (
          <div className="space-y-3">
            {appointments.map((appt, i) => {
              const doctor = doctorMap.get(String(appt.doctorId));
              return (
                <motion.div
                  key={String(appt.id)}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className="bg-white rounded-2xl shadow-card p-5"
                  data-ocid={`admin.item.${i + 1}`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Stethoscope className="w-4 h-4 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between flex-wrap gap-2">
                        <div>
                          <p className="font-semibold text-foreground text-sm">
                            {doctor?.name ?? `Doctor #${String(appt.doctorId)}`}
                          </p>
                          <p className="text-primary text-xs">
                            {doctor?.specialty}
                          </p>
                        </div>
                        <StatusBadge status={String(appt.status)} />
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-1 mt-2">
                        <span className="flex items-center gap-1 text-muted-foreground text-xs">
                          <User className="w-3 h-3" /> {appt.patientName}
                        </span>
                        <span className="flex items-center gap-1 text-muted-foreground text-xs">
                          <CalendarDays className="w-3 h-3" /> {appt.date}
                        </span>
                        <span className="flex items-center gap-1 text-muted-foreground text-xs">
                          <Clock className="w-3 h-3" /> {appt.timeSlot}
                        </span>
                        <span className="text-xs text-muted-foreground truncate">
                          {appt.patientEmail}
                        </span>
                      </div>
                    </div>
                    <div className="flex-shrink-0">
                      <Select
                        defaultValue={String(appt.status)}
                        onValueChange={(val) =>
                          handleStatusChange(appt.id, val)
                        }
                      >
                        <SelectTrigger
                          className="w-36 text-sm"
                          data-ocid="admin.select"
                        >
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="confirmed">Confirmed</SelectItem>
                          <SelectItem value="cancelled">Cancelled</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
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
