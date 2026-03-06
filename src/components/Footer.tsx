import logo from "@/assets/logo-eficiencia.jpeg";

const Footer = () => {
  return (
    <footer className="border-t border-border py-12">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <img src={logo} alt="EficiencIA" className="h-8 w-8 rounded-lg object-cover" />
          <span className="font-semibold font-['Space_Grotesk']">
            Eficienc<span className="text-gradient">IA</span>
          </span>
        </div>

        <nav className="flex gap-6 text-sm text-muted-foreground">
          <a href="#home" className="hover:text-foreground transition-colors">Home</a>
          <a href="#nosotros" className="hover:text-foreground transition-colors">Nosotros</a>
          <a href="#servicios" className="hover:text-foreground transition-colors">Servicios</a>
        </nav>

        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} EficiencIA. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
