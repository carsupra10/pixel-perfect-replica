// Edit all website text here.
import hero from "@/assets/hero.jpg";
import reefer from "@/assets/reefer.jpg";
import factory from "@/assets/factory.jpg";
import opentop from "@/assets/opentop.jpg";
import racks from "@/assets/racks.jpg";

export const company = {
  shortName: "Mission Ocean",
  fullName: "Mission Ocean Shipping and Logistics Pvt Ltd",
  whatsapp: "https://wa.me/919789954332",
  address:
    "New No. 56, Old No. 20, 2nd Floor, Office Portion 2-E, 4th Lane North, Beach Road, Clive Battery, VOC Nagar, Chennai 600 001 (Behind ICICI Bank, Rajaji Salai branch)",
  phone: "044 4661 0262",
  phoneHref: "tel:+914446610262",
  mobile: "97899 54332",
  mobileHref: "tel:+919789954332",
  email: "Operation@missionocean.in",
  mapQuery: "Beach Road, Clive Battery, VOC Nagar, Chennai 600001",
};

export const navLinks = [
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Gallery", href: "#gallery" },
  { label: "Why Us", href: "#why-us" },
  { label: "Contact", href: "#contact" },
];

export const marquee = ["Leasing", "Rental", "Sales", "Logistics", "Custom Solutions"];

export const sections = {
  services: { label: "01 — What We Do", title: "Five ways we support your supply chain" },
  about: { label: "02 — About Us" },
  gallery: { label: "03 — Fabricated Containers", title: "Built for the job", subtitle: "Containers fabricated for specific operational needs." },
  whyUs: { label: "04 — Why Mission Ocean", title: "Why customers choose us" },
  quote: { label: "05 — Get a Quote", title: "Tell us what you need", subtitle: "Our team will get back to you shortly.", success: "Thank you. Our team will contact you shortly." },
  contact: { label: "06 — Contact", title: "Visit or call us" },
};

export const hero_ = {
  image: hero,
  headline: "Containers for every stage of your supply chain",
  subheadline:
    "Lease, rent, or buy reliable containers from Chennai, serving shipping lines, freight forwarders, and exporters.",
};

export const services = [
  { icon: "leasing", title: "Container Leasing", text: "Flexible leasing for short-term or long-term operational needs, helping you control costs." },
  { icon: "rental", title: "Container Rental", text: "Convenient rental for temporary or project-specific requirements." },
  { icon: "sales", title: "Container Sales", text: "Buy containers for shipping, logistics, storage, or business use, sourced by size, type, and condition." },
  { icon: "logistics", title: "Logistics Container Solutions", text: "Practical container solutions that improve operational efficiency and adapt to changing transport and storage needs." },
  { icon: "custom", title: "Customized Solutions", text: "Tailored solutions built around your operational and commercial goals." },
] as const;

export const about = {
  statement: "Mission Ocean Shipping and Logistics Pvt Ltd is a professionally managed company specializing in container leasing, rental, and sales.",
  text: "We provide reliable, flexible container solutions for shipping lines, freight forwarders, logistics companies, exporters, importers, and traders across global supply chains. We believe strong business relationships are built on trust, transparency, reliability, and consistent service.",
  vision: "To become a trusted and leading partner in the global container leasing, rental, and sales industry, delivering reliable, cost-effective, and flexible container solutions that support seamless logistics and international trade.",
  mission: "To provide high-quality, dependable, and flexible container solutions tailored to our customers' needs.",
};

export const gallery = [
  { image: reefer, title: "Reefer Container in Trailer", text: "Refrigerated container mounted on a trailer." },
  { image: factory, title: "Factory Module Container", text: "Container fitted out as a factory module." },
  { image: opentop, title: "Roof-Open Container with Partition", text: "Open-top container with internal partitioning." },
  { image: racks, title: "Storage Rack Container", text: "Container fitted with racks for storage." },
];

export const whyUs = [
  { icon: "reliable", title: "Reliable Container Solutions" },
  { icon: "flexible", title: "Flexible Leasing and Rental Options" },
  { icon: "pricing", title: "Competitive Pricing" },
  { icon: "customer", title: "Customer-Centric Approach" },
  { icon: "professional", title: "Professional Service" },
  { icon: "quality", title: "Quality-Focused Operations" },
  { icon: "relationship", title: "Long-Term Business Relationships" },
  { icon: "integrity", title: "Commitment to Integrity and Transparency" },
] as const;

export const quoteOptions = {
  services: ["Container Leasing", "Container Rental", "Container Sales", "Logistics Container Solutions", "Customized Solution"],
  sizes: ["20ft", "40ft", "Reefer", "Open-top", "Not sure"],
};
