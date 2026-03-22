import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { CalendarCheck, Clock, Shield, Star, Stethoscope } from "lucide-react";
import { motion } from "motion/react";
import { useGetDoctors } from "../hooks/useQueries";

const SPECIALTIES = [
  { icon: "🫀", label: "Cardiology" },
  { icon: "🧠", label: "Neurology" },
  { icon: "🦷", label: "Dentistry" },
  { icon: "👁", label: "Ophthalmology" },
  { icon: "🦴", label: "Orthopedics" },
  { icon: "🩺", label: "General Medicine" },
];

const FEATURES = [
  {
    icon: CalendarCheck,
    title: "Easy Scheduling",
    desc: "Book appointments in under 2 minutes with our streamlined 4-step process.",
  },
  {
    icon: Clock,
    title: "Flexible Time Slots",
    desc: "Choose from morning to evening slots every 30 minutes to fit your schedule.",
  },
  {
    icon: Shield,
    title: "Secure & Private",
    desc: "Your medical information is protected with enterprise-grade security.",
  },
];

export function HomePage() {
  const { data: doctors = [], isLoading } = useGetDoctors();

  return (
    <div>
      {/* Hero */}
      <section className="med-hero py-20 md:py-28 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge className="mb-6 bg-primary/10 text-primary border-primary/20 font-medium px-4 py-1.5">
              <Stethoscope className="w-3.5 h-3.5 mr-1.5" />
              Trusted Medical Appointments
            </Badge>
            <h1 className="text-4xl md:text-6xl font-extrabold text-foreground leading-tight mb-5 tracking-tight">
              Book Your Medical
              <br />
              <span className="text-primary">Appointment</span> Today
            </h1>
            <p className="text-lg text-muted-foreground mb-9 max-w-xl mx-auto">
              Connect with top specialists. Choose your time. Get the care you
              deserve — all in a few clicks.
            </p>
            <Link to="/book">
              <Button
                size="lg"
                className="bg-primary hover:bg-navy-dark text-white font-semibold px-10 py-3 rounded-full shadow-lg text-base"
                data-ocid="hero.primary_button"
              >
                Book an Appointment
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Specialties */}
      <section className="bg-white py-14 px-4 border-b border-border">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-wrap justify-center gap-4">
            {SPECIALTIES.map((s) => (
              <Link key={s.label} to="/book">
                <div className="flex items-center justify-center w-14 h-14 rounded-full border border-border bg-white hover:border-primary hover:bg-secondary transition-all cursor-pointer">
                  <span className="text-2xl">{s.icon}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4 bg-background">
        <div className="max-w-5xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl md:text-3xl font-bold text-foreground text-center mb-12"
          >
            Why Choose CarePlus?
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {FEATURES.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-shadow"
              >
                <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <f.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-semibold text-lg text-foreground mb-2">
                  {f.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {f.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Doctors */}
      <section className="py-16 px-4 bg-white border-t border-border">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              Our Specialists
            </h2>
            <Link to="/book">
              <Button
                variant="outline"
                className="border-primary text-primary hover:bg-secondary"
                data-ocid="doctors.primary_button"
              >
                Book Now
              </Button>
            </Link>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="bg-background rounded-2xl p-6 animate-pulse h-48"
                  data-ocid="doctors.loading_state"
                />
              ))}
            </div>
          ) : doctors.length === 0 ? (
            <div
              className="text-center py-12 text-muted-foreground"
              data-ocid="doctors.empty_state"
            >
              <Stethoscope className="w-10 h-10 mx-auto mb-3 opacity-40" />
              <p>No doctors available yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {doctors.slice(0, 6).map((doctor, i) => (
                <motion.div
                  key={String(doctor.id)}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="bg-background rounded-2xl p-5 border border-border hover:border-primary hover:shadow-card transition-all"
                  data-ocid={`doctors.item.${i + 1}`}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-primary font-bold text-lg">
                        {doctor.name.charAt(0)}
                      </span>
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-semibold text-foreground text-sm leading-tight">
                        {doctor.name}
                      </h3>
                      <p className="text-primary text-xs font-medium mt-0.5">
                        {doctor.specialty}
                      </p>
                      <div className="flex items-center gap-1 mt-1.5">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star
                            key={s}
                            className="w-3 h-3 fill-yellow-400 text-yellow-400"
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-muted-foreground text-xs mt-3 leading-relaxed line-clamp-2">
                    {doctor.bio}
                  </p>
                  <Link to="/book">
                    <Button
                      size="sm"
                      variant="outline"
                      className="w-full mt-4 border-primary text-primary hover:bg-secondary text-xs"
                    >
                      Book Appointment
                    </Button>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
