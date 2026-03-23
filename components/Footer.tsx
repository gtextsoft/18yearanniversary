const Footer = () => (
  <footer className="py-12 bg-charcoal border-t border-gold/10">
    <div className="container mx-auto px-4 text-center">
      <div className="inline-flex items-center gap-2 mb-6 opacity-60 hover:opacity-100 transition-opacity">
        <div className="w-8 h-8 rounded-full border border-gold/30 flex items-center justify-center text-[10px] font-bold text-gold">18</div>
        <span className="font-body text-[10px] uppercase tracking-widest text-warm-white">Celebrating 18 Years of Excellence</span>
      </div>
      <p className="font-display text-2xl font-bold text-warm-white mb-2">
        Sapphire<span className="text-gradient-gold">City</span>
      </p>
      <p className="font-body text-xs text-warm-white/30 max-w-sm mx-auto leading-relaxed">
        © {new Date().getFullYear()} Sapphire Group (A Gtext Company). All rights reserved. <br />
        Integrity. Transparency. Security.
      </p>
    </div>
  </footer>
);

export default Footer;
