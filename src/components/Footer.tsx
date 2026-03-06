import logo from "@/assets/logo-eficiencia.jpeg";

const Footer = () => {
  return (
    <footer className="border-t border-border py-8">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <img src={logo} alt="EficiencIA" className="h-7 w-7 rounded-lg object-cover" />
          <span className="font-bold text-foreground">EficiencIA</span>
        </div>

        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} EficiencIA. Todos los derechos reservados.
        </p>

        <div className="flex gap-4 text-sm text-muted-foreground">
          <a href="#" className="hover:text-primary transition-colors">LinkedIn</a>
          <a href="#" className="hover:text-primary transition-colors">X (Twitter)</a>
          <a href="#" className="hover:text-primary transition-colors">Instagram</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
