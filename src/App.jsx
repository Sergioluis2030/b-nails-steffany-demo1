import { useState, useEffect } from "react";
import logo from "./assets/B-Nails-logo.jpg";
import { servicios, testimonios, horariosDisponibles, cardsDestacadas } from "./data/mockData";
import image1 from "./gallery-images/image1.jpeg";
import image2 from "./gallery-images/image2.jpeg";
import image3 from "./gallery-images/image3.jpeg";
import image4 from "./gallery-images/image4.jpeg";
import image5 from "./gallery-images/image5.jpeg";
import image6 from "./gallery-images/image6.jpeg";
import qrYape from "./gallery-images/QR-YAPE.jpg";

const API_BASE = import.meta.env.VITE_API_BASE;

const comprimirImagen = (file, maxDim = 1280, quality = 0.8) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        let { width, height } = img;
        const escala = Math.min(1, maxDim / Math.max(width, height));
        width = Math.round(width * escala);
        height = Math.round(height * escala);
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        canvas.getContext("2d").drawImage(img, 0, 0, width, height);
        canvas.toBlob(
          blob => blob ? resolve(new File([blob], file.name.replace(/\.[^.]+$/, ".jpg"), { type: "image/jpeg" })) : reject(new Error("compresión fallida")),
          "image/jpeg",
          quality
        );
      };
      img.onerror = reject;
      img.src = reader.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

const imagenesGaleria = [
  { id: 1, src: image1, alt: "Manicure diseño 1" },
  { id: 2, src: image2, alt: "Manicure diseño 2" },
  { id: 3, src: image3, alt: "Manicure diseño 3" },
  { id: 4, src: image4, alt: "Manicure diseño 4" },
  { id: 5, src: image5, alt: "Manicure diseño 5" },
  { id: 6, src: image6, alt: "Manicure diseño 6" },
];
function Card({ children, className = "" }) {
  return <div className={`bg-white rounded-2xl shadow-soft border border-cocoa-100/60 p-6 ${className}`}>{children}</div>;
}

function Toast({ msg, onClose }) {
  if (!msg) return null;
  return (
    <div className="fixed bottom-6 right-6 bg-cocoa-700 text-white px-5 py-3 rounded-xl shadow-xl z-50 flex gap-3 items-center">
      <span>💅</span>
      <span className="text-sm">{msg}</span>
      <button onClick={onClose} className="ml-2">✕</button>
    </div>
  );
}

function Badge({ children, className = "bg-cream-100 text-cocoa-700 border-cocoa-200" }) {
  return <span className={`px-2.5 py-1 rounded-full text-[11px] font-semibold border ${className}`}>{children}</span>;
}

function Navbar({ onReservar }) {
  const [menu, setMenu] = useState(false);
  const links = [
    { href: "#inicio", label: "Inicio" },
    { href: "#servicios", label: "Servicios" },
    { href: "#nosotras", label: "Nosotras" },
    { href: "#citas", label: "Citas" },
     { href: "#galeria", label: "Galería" },
    { href: "#contacto", label: "Contacto" },
  ];
  return (
    <header className="fixed top-0 inset-x-0 z-40 bg-cream-50/80 backdrop-blur-lg border-b border-cocoa-100">
      <div className="max-w-6xl mx-auto px-5 h-[76px] flex items-center justify-between">
        <a href="#inicio" className="flex items-center gap-3" onClick={(e) => { e.preventDefault(); onReservar("inicio"); }}>
          <img src={logo} alt="Beautiful Nails Estefany" className="w-11 h-11 rounded-xl object-cover shadow-sm border border-gold-300" />
          <div className="leading-none">
            <p className="font-bold text-cocoa-800 font-display text-[17px]">Beautiful Nails <span className="text-caramel-600">Estefany</span></p>
            <p className="text-[10px] text-cocoa-400 tracking-widest uppercase mt-1">spa &amp; manicure</p>
          </div>
        </a>
        <nav className="hidden md:flex items-center gap-1">
          {links.map(l => (
            <a key={l.href} href={l.href} onClick={(e) => { e.preventDefault(); onReservar(l.href.slice(1)); }} className="px-4 py-2 rounded-xl text-[13.5px] font-medium text-cocoa-500 hover:bg-cream-100 hover:text-cocoa-800 transition">{l.label}</a>
          ))}
        </nav>
        <button onClick={() => { onReservar("citas"); }} className="hidden md:inline-flex bg-gold-450 text-white px-5 py-2.5 rounded-xl text-[13px] font-semibold shadow-[0_4px_16px_rgba(180,138,76,0.35)] hover:bg-gold-550 transition">Reservar cita</button>
        <button onClick={() => setMenu(!menu)} className="md:hidden w-10 h-10 rounded-xl bg-white border border-cocoa-100 flex items-center justify-center text-cocoa-700">{menu ? "✕" : "☰"}</button>
      </div>
      {menu && (
        <nav className="md:hidden bg-cream-50 border-t border-cocoa-100 p-3 space-y-1">
          {links.map(l => (
            <a key={l.href} href={l.href} onClick={(e) => { e.preventDefault(); setMenu(false); onReservar(l.href.slice(1)); }} className="block px-4 py-3 rounded-xl text-[14px] font-medium text-cocoa-600 hover:bg-white transition">{l.label}</a>
          ))}
          <button onClick={() => { setMenu(false); onReservar("citas"); }} className="w-full mt-2 bg-gold-450 text-white py-3 rounded-xl text-[13px] font-semibold">Reservar cita</button>
        </nav>
      )}
    </header>
  );
}

function Hero({ onReservar }) {
  const scrollTo = (id) => onReservar(id);
  return (
    <section id="inicio" className="pt-[76px] relative overflow-hidden bg-gradient-to-b from-cream-100 to-cream-50">
      <div className="absolute -top-24 -right-24 w-[420px] h-[420px] rounded-full bg-gold-200/30 blur-3xl" />
      <div className="absolute bottom-0 -left-32 w-[380px] h-[380px] rounded-full bg-caramel-300/15 blur-3xl" />
      <div className="relative max-w-6xl mx-auto px-5 py-16 lg:py-24 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <Badge className="bg-white border-gold-300 text-caramel-600">✨ Reserva tu cita en minutos</Badge>
          <h1 className="mt-6 font-display text-[40px] lg:text-[54px] font-bold text-cocoa-800 leading-[1.1] tracking-tight">
            Belleza y elegancia para <span className="text-caramel-600">tus uñas</span>
          </h1>
          <p className="mt-6 text-[15px] text-cocoa-500 leading-relaxed max-w-[460px]">
            En Beautiful Nails Estefany convertimos tus manos y pies en una obra de arte.
            Manicure, acrílico, nail art y pedicure spa con productos premium y un
            servicio que te hace sentir especial.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <button onClick={() => scrollTo("citas")} className="bg-gold-450 text-white px-6 py-3.5 rounded-xl font-semibold text-[14px] shadow-[0_6px_20px_rgba(180,138,76,0.35)] hover:bg-gold-550 transition">💅 Reservar ahora</button>
            <button onClick={() => scrollTo("servicios")} className="bg-white text-cocoa-700 px-6 py-3.5 rounded-xl font-semibold text-[14px] border border-cocoa-200 hover:border-cocoa-300 hover:shadow-sm transition">Ver servicios</button>
          </div>
          <div className="mt-12 grid grid-cols-3 gap-4">
            <div className="bg-white/70 backdrop-blur rounded-2xl p-4 border border-cocoa-100"><p className="text-2xl font-bold text-cocoa-800">5+</p><p className="text-[11px] text-cocoa-500 mt-1">Años de experiencia</p></div>
            <div className="bg-white/70 backdrop-blur rounded-2xl p-4 border border-cocoa-100"><p className="text-2xl font-bold text-cocoa-800">2,000+</p><p className="text-[11px] text-cocoa-500 mt-1">Clientas felices</p></div>
            <div className="bg-white/70 backdrop-blur rounded-2xl p-4 border border-cocoa-100"><p className="text-2xl font-bold text-cocoa-800">4.9★</p><p className="text-[11px] text-cocoa-500 mt-1">Calificación promedio</p></div>
          </div>
        </div>
        <div className="relative flex justify-center">
          <div className="absolute -top-6 -left-2 w-20 h-20 rounded-2xl bg-gold-200/60 blur-xl" />
          <Card className="w-full max-w-[380px] p-0 overflow-hidden border-cocoa-100 shadow-[0_24px_48px_rgba(42,34,29,0.12)]">
            <img src={logo} alt="Beautiful Nails Estefany" className="w-full h-[280px] object-cover" />
            <div className="p-6">
              <p className="font-display font-bold text-cocoa-800 text-[20px]">Manicure de ensueño</p>
              <p className="text-[13px] text-cocoa-500 mt-1.5">Con toda la elegancia que mereces. Di adiós a las uñas descuidadas.</p>
              <div className="mt-4 flex items-center justify-between">
                <Badge className="bg-cream-100 text-caramel-600 border-gold-300">Desde S/ 55</Badge>
                <button onClick={() => scrollTo("servicios")} className="text-cocoa-700 text-[13px] font-semibold flex items-center gap-1">Ver servicio →</button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}

function Servicios({ onReservar }) {
  const handleService = (id) => {
    if (typeof onReservar === "function") onReservar("citas", id);
  };
  return (
    <section id="servicios" className="py-20 bg-cream-50">
      <div className="max-w-6xl mx-auto px-5">
        <div className="text-center max-w-[560px] mx-auto">
          <Badge className="bg-white border-gold-300 text-caramel-600">Nuestro menú</Badge>
          <h2 className="mt-5 font-display text-[34px] font-bold text-cocoa-800 tracking-tight">Servicios para consentirte</h2>
          <p className="mt-4 text-[14px] text-cocoa-500 leading-relaxed">Cada servicio incluye higiene profunda, atención personalizada y acabados dignos de revista.</p>
        </div>
        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {servicios.filter(s => !s.personalizado).map(s => (
            <Card key={s.id} className="flex flex-col hover:shadow-md hover:-translate-y-0.5 transition duration-300">
              <div className="flex justify-between items-start">
                <div className="w-12 h-12 rounded-2xl bg-cream-100 border border-cocoa-100 flex items-center justify-center text-[22px]">{s.icon}</div>
                {s.popular && <Badge className="bg-gold-100 text-cocoa-700 border-gold-300">⭐ Popular</Badge>}
              </div>
              <h3 className="mt-4 font-bold text-cocoa-800 text-[16px]">{s.nombre}</h3>
              <p className="mt-2 text-[12.5px] text-cocoa-500 leading-relaxed flex-1">{s.desc}</p>
              <div className="mt-4 flex items-center justify-between">
                <div><p className="text-lg font-bold text-caramel-600">S/ {s.precio}</p><p className="text-[10px] text-cocoa-400 uppercase tracking-wider">⏱ {s.tiempo}</p></div>
                <button onClick={() => handleService(s.id)} className="bg-gold-450 text-white px-4 py-2.5 rounded-xl text-[12.5px] font-semibold hover:bg-gold-550 transition">Reservar</button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function Nosotras() {
  return (
    <section id="nosotras" className="py-20 bg-cocoa-800 text-white relative overflow-hidden">
      <div className="absolute -top-24 right-0 w-[380px] h-[380px] rounded-full bg-gold-400/10 blur-3xl" />
      <div className="absolute -bottom-40 -left-24 w-[420px] h-[420px] rounded-full bg-caramel-500/10 blur-3xl" />
      <div className="relative max-w-6xl mx-auto px-5">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <Badge className="bg-white/10 text-gold-300 border-white/20">Por qué elegirnos</Badge>
            <h2 className="mt-5 font-display text-[34px] font-bold tracking-tight leading-tight">
              Un espacio pensado para tu <span className="text-gold-300">bienestar</span>
            </h2>
            <p className="mt-4 text-[14px] text-white/70 leading-relaxed max-w-[460px]">
              Detrás de Beautiful Nails Estefany hay profesionalismo, cuidado y pasión por los
              detalles. Higiene de primer nivel, productos de calidad y un ambiente que
              invita a relajarte desde que cruzas la puerta.
            </p>
            <div className="mt-8 space-y-4">
              {cardsDestacadas.slice(0, 2).map((c, i) => (
                <div key={i} className="flex gap-4 items-start p-4 rounded-2xl bg-white/5 border border-white/10">
                  <div className="w-11 h-11 rounded-xl bg-gold-400/20 flex items-center justify-center text-[20px]">{c.icon}</div>
                  <div><p className="font-semibold text-[14px]">{c.titulo}</p><p className="text-[12.5px] text-white/60 mt-1">{c.texto}</p></div>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            {cardsDestacadas.slice(2).map((c, i) => (
              <Card key={i} className="bg-white/5 border-white/10 hover:bg-white/10 transition">
                <div className="flex gap-4 items-start">
                  <div className="w-11 h-11 rounded-xl bg-gold-400/20 flex items-center justify-center text-[20px]">{c.icon}</div>
                  <div><p className="font-semibold text-[15px] text-white">{c.titulo}</p><p className="text-[12.5px] text-white/60 mt-1">{c.texto}</p></div>
                </div>
              </Card>
            ))}
            <div className="flex gap-6 p-5 rounded-2xl bg-white/5 border border-white/10">
              <div className="text-center"><p className="text-2xl font-bold text-gold-300">1,200+</p><p className="text-[11px] text-white/60 mt-1">Uñas decoradas</p></div>
              <div className="w-px bg-white/10" />
              <div className="text-center"><p className="text-2xl font-bold text-gold-300">600+</p><p className="text-[11px] text-white/60 mt-1">Pedicures spa</p></div>
              <div className="w-px bg-white/10" />
              <div className="text-center"><p className="text-2xl font-bold text-gold-300">98%</p><p className="text-[11px] text-white/60 mt-1">Clientas que regresan</p></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Galeria() {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <section id="galeria" className="py-20 bg-cream-50">
      <div className="max-w-6xl mx-auto px-5">
        <div className="text-center max-w-[560px] mx-auto">
          <Badge className="bg-white border-gold-300 text-caramel-600">📸 Galería</Badge>
          <h2 className="mt-5 font-display text-[34px] font-bold text-cocoa-800 tracking-tight">
            Nuestros trabajos
          </h2>
          <p className="mt-4 text-[14px] text-cocoa-500 leading-relaxed">
            Descubre algunos de los diseños que hemos creado para nuestras clientas. 
            Cada uña es una obra de arte única.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
          {imagenesGaleria.map((img) => (
            <div 
              key={img.id}
              className="group relative overflow-hidden rounded-2xl cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              onClick={() => setSelectedImage(img)}
            >
              <div className="aspect-square overflow-hidden">
                <img 
                  src={img.src} 
                  alt={img.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Modal para ver imagen ampliada */}
        {selectedImage && (
          <div 
            className="fixed inset-0 z-50 bg-cocoa-950/90 flex items-center justify-center p-4 backdrop-blur-sm"
            onClick={() => setSelectedImage(null)}
          >
            <div className="relative max-w-3xl w-full bg-white rounded-2xl overflow-hidden shadow-2xl">
              <button 
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 shadow-lg flex items-center justify-center text-cocoa-800 hover:bg-white transition z-10"
              >
                ✕
              </button>
              <img 
                src={selectedImage.src} 
                alt={selectedImage.alt}
                className="w-full h-auto max-h-[80vh] object-contain"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function Citas({ selectedService }) {
  const hoy = new Date().toISOString().slice(0, 10);
  const [form, setForm] = useState({ nombre: "", telefono: "", email: "", servicio: "", fecha: hoy, hora: "", notas: "" });
  const [toast, setToast] = useState("");
  const [ocupadas, setOcupadas] = useState([]);
  const [pagoVisible, setPagoVisible] = useState(false);
  const [comprobante, setComprobante] = useState(null);
  const [comprobanteUrl, setComprobanteUrl] = useState("");
  const [horaManual, setHoraManualState] = useState("");

  useEffect(() => {
    if (selectedService) setForm(f => ({ ...f, servicio: String(selectedService) }));
  }, [selectedService]);

  useEffect(() => {
    let activo = true;
    setOcupadas([]);
    if (!form.fecha) return () => { activo = false; };
    (async () => {
      try {
        const resp = await fetch(`${API_BASE}/reservas/horarios/${form.fecha}`);
        if (!resp.ok) return;
        const data = await resp.json();
        const lista = data?.ocupados;
        if (activo && Array.isArray(lista)) setOcupadas(lista);
      } catch { /* backend aún no disponible */ }
    })();
    return () => { activo = false; };
  }, [form.fecha]);

  const set = (k) => (e) => {
    const v = e.target.value;
    setForm(f => ({ ...f, [k]: v }));
  };

  const setHoraManual = (e) => {
    const digitos = e.target.value.replace(/\D/g, "").slice(0, 4);
    let horaOk = "";
    for (let i = 0; i < digitos.length; i++) {
      const d = digitos[i];
      const permitidos =
        i === 0 ? "012"
        : i === 1 ? (horaOk[0] === "2" ? "0123" : "0123456789")
        : i === 2 ? "012345"
        : "0123456789";
      if (permitidos.includes(d)) horaOk += d;
    }
    const texto = horaOk.length > 2 ? `${horaOk.slice(0, 2)}:${horaOk.slice(2)}` : horaOk;
    setHoraManualState(texto);
    setForm(f => ({ ...f, hora: texto.length === 5 ? texto : "" }));
  };

  const validarForm = () => {
    if (!form.nombre || !form.telefono || !form.servicio || !form.fecha || !form.hora || !form.email) {
      setToast("⚠️ Completa nombre, teléfono, correo, servicio, fecha y hora");
      setTimeout(() => setToast(""), 3000);
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setToast("⚠️ Ingresa un correo válido");
      setTimeout(() => setToast(""), 3000);
      return false;
    }
    return true;
  };

  const generar = async (e) => {
    e.preventDefault();
    if (!validarForm()) return;
    try {
      const resp = await fetch(`${API_BASE}/reservas/horarios/${form.fecha}`);
      if (resp.ok) {
        const data = await resp.json();
        const ocup = Array.isArray(data?.ocupados) ? data.ocupados : [];
        setOcupadas(ocup);
        if (ocup.includes(form.hora)) {
          setToast("⚠️ Ese horario ya está ocupado. Elige otro.");
          setTimeout(() => setToast(""), 3000);
          return;
        }
      }
    } catch { /* si el backend falla, seguimos con el flujo normal */ }
    setPagoVisible(true);
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!validarForm()) return;
    if (!comprobante) {
      setToast("⚠️ Adjunta la captura de tu pago Yape");
      setTimeout(() => setToast(""), 3000);
      return;
    }
    const svc = servicios.find(s => String(s.id) === String(form.servicio));

    const formData = new FormData();
    formData.append("nombre", form.nombre);
    formData.append("telefono", form.telefono);
    formData.append("servicio", svc ? svc.nombre : form.servicio);
    formData.append("correo", form.email);
    formData.append("fecha", form.fecha);
    formData.append("horario", form.hora);
    formData.append("notas", form.notas);
    formData.append("fotoPago", comprobante);

    try {
      const resp = await fetch(`${API_BASE}/reservas`, {
        method: "POST",
        body: formData,
      });
      if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
      setOcupadas(o => [...o, form.hora]);
      setToast(`💅 ¡Listo ${form.nombre.split(" ")[0]}! Tu ${svc?.nombre ?? "servicio"} quedó reservado el ${form.fecha} a las ${form.hora}.`);
      setForm({ nombre: "", telefono: "", email: "", servicio: "", fecha: hoy, hora: "", notas: "" });
      setHoraManualState("");
      setComprobante(null);
      setComprobanteUrl("");
      setPagoVisible(false);
    } catch (err) {
      setToast("⚠️ No se pudo enviar la reserva. Inténtalo de nuevo.");
      setTimeout(() => setToast(""), 3000);
    }
  };

  const onFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const comprimido = await comprimirImagen(file);
      setComprobante(comprimido);
      setComprobanteUrl(URL.createObjectURL(comprimido));
    } catch {
      setComprobante(file);
      setComprobanteUrl(URL.createObjectURL(file));
    }
  };

  return (
    <section id="citas" className="py-20 bg-cream-100">
      <div className="max-w-6xl mx-auto px-5">
        <div className="text-center max-w-[560px] mx-auto">
          <Badge className="bg-white border-gold-300 text-caramel-600">📅 Agenda tu cita</Badge>
          <h2 className="mt-5 font-display text-[34px] font-bold text-cocoa-800 tracking-tight">Reserva tu horario</h2>
          <p className="mt-4 text-[14px] text-cocoa-500">Elige tu servicio, el día y la hora que más te convenga. Te esperamos.</p>
        </div>
        <div className="mt-12 grid lg:grid-cols-5 gap-6">
          <Card className="lg:col-span-2 border-cocoa-100">
            <h4 className="font-bold text-cocoa-800 text-[16px]">Información del spa</h4>
            <div className="mt-5 space-y-4">
              <a href="https://maps.app.goo.gl/TfBNu9sdrxGyEsUM8" target="_blank" rel="noopener noreferrer" className="group flex gap-3 items-center p-3.5 rounded-2xl bg-cream-50 border border-cocoa-100 hover:bg-cream-100 hover:border-gold-300 transition cursor-pointer"><span className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-[18px]">📍</span><div className="flex-1"><p className="text-[13px] font-semibold text-cocoa-800">Dirección</p><p className="text-[12px] text-cocoa-500 mt-0.5">calle Los jazmines 107 -  dep 401 urb. el Rocío, Bellavista, Callao </p></div><span className="text-[16px] text-caramel-600 transition-transform duration-300 group-hover:translate-x-1">→</span></a>
              <div className="flex gap-3 items-start p-3.5 rounded-2xl bg-cream-50 border border-cocoa-100"><span className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-[18px]">🕒</span><div><p className="text-[13px] font-semibold text-cocoa-800">Horario</p><p className="text-[12px] text-cocoa-500 mt-0.5">Lunes a sábados de 8 am  a 6 pm </p></div></div>
              <a 
                href="https://wa.me/51922948959?text=Hola%20Beautiful Nails%20Estefany!%20Me%20gustaría%20agendar%20una%20cita%20para%20manicure.%20¿Tienen%20disponibilidad%20esta%20semana?%20💅" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="group flex gap-3 items-center p-3.5 rounded-2xl bg-cream-50 border border-cocoa-100 hover:bg-cream-100 hover:border-gold-300 transition cursor-pointer"
              >
                <span className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-[18px]">📞</span>
                <div className="flex-1">
                  <p className="text-[13px] font-semibold text-cocoa-800">WhatsApp</p>
                  <p className="text-[12px] text-cocoa-500 mt-0.5">+51922948959</p>
                </div>
                <span className="text-[16px] text-caramel-600 transition-transform duration-300 group-hover:translate-x-1">→</span>
              </a>
              <div className="flex gap-3 items-start p-3.5 rounded-2xl bg-cream-50 border border-cocoa-100"><span className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-[18px]">💡</span><div><p className="text-[13px] font-semibold text-cocoa-800">Consejo</p><p className="text-[12px] text-cocoa-500 mt-0.5">Llega 5 min antes para elegir tu tono favorito del catálogo.</p></div></div>
            </div>
          </Card>
          <Card className="lg:col-span-3 border-cocoa-100">
            <form onSubmit={submit} className="space-y-5">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-[12px] font-black text-cocoa-900 tracking-wide">Nombre completo *</label>
                  <input value={form.nombre} onChange={set("nombre")} placeholder="Tu nombre" className="mt-1.5 w-full px-4 py-3 rounded-xl border border-cocoa-200 bg-white focus:ring-2 focus:ring-gold-300/40 focus:border-cocoa-400 outline-none text-[14px] placeholder:text-cocoa-300" />
                </div>
                <div>
                  <label className="text-[12px] font-black text-cocoa-900 tracking-wide">Teléfono *</label>
                  <input value={form.telefono} onChange={set("telefono")} placeholder="55 1234 5678" className="mt-1.5 w-full px-4 py-3 rounded-xl border border-cocoa-200 bg-white focus:ring-2 focus:ring-gold-300/40 focus:border-cocoa-400 outline-none text-[14px] placeholder:text-cocoa-300" />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-[12px] font-black text-cocoa-900 tracking-wide">Servicio *</label>
                  <select value={form.servicio} onChange={set("servicio")} className="mt-1.5 w-full px-4 py-3 rounded-xl border border-cocoa-200 bg-white focus:ring-2 focus:ring-gold-300/40 focus:border-cocoa-400 outline-none text-[14px] placeholder:text-cocoa-300">
                    <option value="">Selecciona un servicio…</option>
                    {[...servicios]
                        .sort((a, b) => (a.personalizado ? -1 : b.personalizado ? 1 : 0))
                        .map(s => (
                          <option key={s.id} value={String(s.id)}>
                            {s.personalizado ? s.nombre : `${s.nombre} — S/ ${s.precio}`}
                          </option>
                        ))}
                  </select>
                </div>
                <div>
                  <label className="text-[12px] font-black text-cocoa-900 tracking-wide">Correo *</label>
                  <input value={form.email} onChange={set("email")} placeholder="tu@email.com" className="mt-1.5 w-full px-4 py-3 rounded-xl border border-cocoa-200 bg-white focus:ring-2 focus:ring-gold-300/40 focus:border-cocoa-400 outline-none text-[14px] placeholder:text-cocoa-300" />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-[12px] font-black text-cocoa-900 tracking-wide">Fecha *</label>
                  <input type="date" min={hoy} value={form.fecha} onChange={set("fecha")} className="mt-1.5 w-full px-4 py-3 rounded-xl border border-cocoa-200 bg-white focus:ring-2 focus:ring-gold-300/40 focus:border-cocoa-400 outline-none text-[14px]" />
                </div>
                <div>
                  <label className="text-[12px] font-black text-cocoa-900 tracking-wide">Horario *</label>
                  <div className="mt-2 grid grid-cols-4 gap-2">
                    {horariosDisponibles.map(h => {
                      const ocupada = ocupadas.includes(h);
                      return (
                        <button type="button" key={h} disabled={ocupada} onClick={() => { setForm(f => ({ ...f, hora: h })); setHoraManualState(""); }} className={`py-2.5 rounded-xl text-[12px] font-semibold border transition ${ocupada ? "bg-cream-100 text-cocoa-300 border-cocoa-100 line-through cursor-not-allowed" : form.hora === h ? "bg-gold-450 text-white border-gold-450 shadow" : "bg-white text-cocoa-600 border-cocoa-200 hover:border-cocoa-400"}`}>
                          {h}
                        </button>
                      );
                    })}
                  <input
                    type="text"
                    inputMode="numeric"
                    maxLength={5}
                    placeholder="hh:mm"
                    value={horaManual}
                    onChange={setHoraManual}
                    className="w-full min-w-0 py-2.5 rounded-xl text-[12px] font-semibold text-center border border-cocoa-200 bg-white text-cocoa-600 placeholder:text-cocoa-300 focus:ring-2 focus:ring-gold-300/40 focus:border-cocoa-400 outline-none transition"
                  />
                  </div>
                </div>
              </div>
              <div>
                <label className="text-[12px] font-black text-cocoa-900 tracking-wide">Notas (opcional)</label>
                <textarea value={form.notas} onChange={set("notas")} placeholder="¿Algún diseño, color o preferencia? Cuéntanos" rows={2} className="mt-1.5 w-full px-4 py-3 rounded-xl border border-cocoa-200 bg-white focus:ring-2 focus:ring-gold-300/40 focus:border-cocoa-400 outline-none text-[14px] placeholder:text-cocoa-300" />
              </div>
              {pagoVisible && (
                <div className="p-5 rounded-2xl border border-gold-300 bg-cream-50">
                  <p className="text-[13px] font-bold text-cocoa-800 mb-4">💛 Paga con Yape y sube tu comprobante</p>
                  <div className="space-y-5">
                    <div className="text-center">
                      <img src={qrYape} alt="QR Yape de Beautiful Nails Estefany" className="w-full h-auto max-h-[380px] object-contain rounded-xl bg-white border border-cocoa-200 p-3" />
                      <p className="mt-2 text-[11px] text-cocoa-500">Escanea el QR y realiza tu pago</p>
                      <p className="mt-0.5 text-[11px] font-semibold text-cocoa-700">922948959 - Estefany Palencia Rondón</p>
                    </div>
                    <div className="w-full">
                      <label htmlFor="comprobante" className={`flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed p-6 cursor-pointer transition text-center ${comprobante ? "border-emerald-400 bg-white" : "border-cocoa-300 bg-white hover:border-gold-400"}`}>
                        {comprobanteUrl ? (
                          <>
                            <img src={comprobanteUrl} alt="Comprobante de pago" className="w-36 h-36 object-contain rounded-lg" />
                            <span className="text-[12px] font-semibold text-emerald-600">✓ {comprobante.name}</span>
                          </>
                        ) : (
                          <>
                            <span className="text-[22px]">📷</span>
                            <span className="text-[12px] text-cocoa-600">Sube la captura de tu pago Yape</span>
                            <span className="text-[11px] text-cocoa-400">PNG o JPG</span>
                          </>
                        )}
                      </label>
                      <input id="comprobante" type="file" accept="image/*" onChange={onFileChange} className="hidden" />
                    </div>
                  </div>
                </div>
              )}
              <button type={comprobante ? "submit" : "button"} onClick={comprobante ? undefined : generar} className={`w-full py-4 rounded-xl font-semibold text-[15px] shadow-[0_6px_20px_rgba(180,138,76,0.35)] transition ${comprobante ? "bg-gold-450 hover:bg-gold-550 text-white" : "bg-cocoa-700 hover:bg-cocoa-800 text-white"}`}>{comprobante ? "Confirmar reserva 💅" : "Generar reserva"}</button>
            </form>
          </Card>
        </div>
      </div>
      <Toast msg={toast} onClose={() => setToast("")} />
    </section>
  );
}

function Contacto() {
  return (
    <footer id="contacto" className="bg-cocoa-950 text-white pt-16">
      <div className="max-w-6xl mx-auto px-5 pb-10">
        <div className="grid md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3">
              <img src={logo} alt="Beautiful Nails Estefany" className="w-12 h-12 rounded-xl object-cover border border-gold-400/40 shadow" />
              <div className="leading-none">
                <p className="font-bold font-display text-[18px]">Beautiful Nails <span className="text-gold-300">Estefany</span></p>
                <p className="text-[10px] text-white/40 tracking-widest uppercase mt-1">spa &amp; manicure</p>
              </div>
            </div>
            <p className="mt-5 text-[13px] text-white/50 leading-relaxed max-w-[340px]">
              Tu espacio de belleza y cuidado personal. Manicure, pedicure y nail art
              con un servicio que te hace sentir única.
            </p>
            <div className="mt-6 flex gap-3">
              {["📷", "🎵", "💬", "📍"].map((i, k) => (
                <button key={k} className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[16px] hover:bg-white/10 transition">{i}</button>
              ))}
            </div>
          </div>
          <div>
            <p className="font-bold text-[13px] uppercase tracking-widest text-white/70">Servicios</p>
            <div className="mt-4 space-y-2.5">
              {servicios.map(s => <button key={s.id} className="block text-[13px] text-white/50 hover:text-gold-300 transition">{s.nombre}</button>)}
            </div>
          </div>
          <div>
            <p className="font-bold text-[13px] uppercase tracking-widest text-white/70">Contacto</p>
            <div className="mt-4 space-y-2.5 text-[13px] text-white/50">
              <p>calle Los jazmines 107 -  dep 401 urb. el Rocío, Bellavista, Callao</p>
              <p>+51 922948959</p>
              <p>Estefanypalencia08@gmail.com</p>
              <p className="pt-2 text-[12px]">Lun - Sáb: 8:00 - 19:00<br />Dom: solo citas previas</p>
            </div>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[11px] text-white/30">© 2026 Beautiful Nails Estefany · Todos los derechos reservados</p>
          <p className="text-[11px] text-white/30">Made with ChechoBeatmaker</p>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  const [pickService, setPickService] = useState(null);
  const scrollTo = (id, servicioId) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    if (servicioId) setPickService(servicioId);
  };
  return (
    <div className="min-h-screen bg-cream-50 font-sans">
      <Navbar onReservar={scrollTo} />
      <Hero onReservar={scrollTo} />
      <Servicios onReservar={scrollTo} />
      <Nosotras />
      <Galeria />
      <Citas selectedService={pickService} />
      <Contacto />
    </div>
  );
}