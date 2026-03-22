import { Mail, MapPin, Phone } from "lucide-react";

const CONTACT_EMAIL = "harithapaadiri@gmail.com";

export function ContactPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold text-foreground mb-2">Contact Us</h1>
      <p className="text-muted-foreground mb-10">
        Have questions about your appointment or need support? Reach out to us
        directly.
      </p>

      <div className="space-y-6">
        <a
          href={`mailto:${CONTACT_EMAIL}`}
          className="flex items-center gap-4 p-5 rounded-xl border border-border bg-white hover:border-primary hover:shadow-sm transition-all group"
        >
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
            <Mail className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Email</p>
            <p className="font-semibold text-foreground group-hover:text-primary transition-colors">
              {CONTACT_EMAIL}
            </p>
          </div>
        </a>

        <div className="flex items-center gap-4 p-5 rounded-xl border border-border bg-white">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
            <Phone className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Phone</p>
            <p className="font-semibold text-foreground">Available via email</p>
          </div>
        </div>

        <div className="flex items-center gap-4 p-5 rounded-xl border border-border bg-white">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
            <MapPin className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Location</p>
            <p className="font-semibold text-foreground">Tirupati, India</p>
          </div>
        </div>
      </div>

      <div className="mt-10 p-6 rounded-xl bg-primary/5 border border-primary/20">
        <h2 className="font-semibold text-foreground mb-1">
          Send us a message
        </h2>
        <p className="text-sm text-muted-foreground mb-4">
          Click below to compose an email directly to our team.
        </p>
        <a
          href={`mailto:${CONTACT_EMAIL}?subject=CarePlus%20Inquiry`}
          className="inline-flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-primary/90 transition-colors"
        >
          <Mail className="w-4 h-4" />
          Email Us Now
        </a>
      </div>
    </div>
  );
}
