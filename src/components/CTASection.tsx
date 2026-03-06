import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ArrowRight, Zap, DollarSign, Headphones } from "lucide-react";

const CTASection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    const subject = encodeURIComponent("Consulta desde EficiencIA");
    const body = encodeURIComponent(
      `Nombre: ${formData.name}\nEmail: ${formData.email}\nMensaje: ${formData.message}`
    );
    window.open(`mailto:contacto@eficiencia.com?subject=${subject}&body=${body}`);
  };

  return (
    <section id="contacto" className="py-24 bg-secondary">
      <div ref={ref} className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-foreground leading-tight mb-6">
              ¿Listo para que tu negocio opere en otro nivel?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Contanos en qué parte de tu operación querés ganar tiempo o escala.
              Una conversación de 30 minutos puede cambiar cómo trabajás el resto
              del año.
            </p>

            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Zap size={16} className="text-primary" />
                Implementación Rápida
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <DollarSign size={16} className="text-primary" />
                Sin Cuota de Inicio
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Headphones size={16} className="text-primary" />
                Soporte Local
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <form
              onSubmit={handleSubmit}
              className="bg-card border border-border rounded-xl p-8 shadow-sm"
            >
              <div className="space-y-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1.5">
                    Nombre completo
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    maxLength={100}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring placeholder:text-muted-foreground"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1.5">
                    Email corporativo
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    maxLength={255}
                    placeholder="nombre@empresa.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring placeholder:text-muted-foreground"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground mb-1.5">
                    ¿Qué proceso querés mejorar?
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    required
                    maxLength={1000}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring placeholder:text-muted-foreground resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                >
                  Hablemos hoy
                  <ArrowRight size={18} />
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
