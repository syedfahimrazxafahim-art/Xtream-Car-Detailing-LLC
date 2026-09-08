import React, { useState, useEffect } from 'react';
import { Phone, Mail, MapPin, Send, CheckCircle, Copy, ArrowUpRight, Clock, AlertCircle, Facebook } from 'lucide-react';
import { BUSINESS_INFO, SERVICES_DATA } from '../data/businessData';
import { EstimateFormData } from '../types';

interface BookingSectionProps {
  preselectedService?: string;
}

export const BookingSection: React.FC<BookingSectionProps> = ({ preselectedService }) => {
  const [formData, setFormData] = useState<EstimateFormData>({
    name: '',
    phone: '',
    email: '',
    serviceNeeded: 'Full Detail',
    vehicleDetails: '',
    projectLocationZip: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof EstimateFormData, string>>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  // Update selected service when changed from external CTAs
  useEffect(() => {
    if (preselectedService) {
      setFormData((prev) => ({ ...prev, serviceNeeded: preselectedService }));
    }
  }, [preselectedService]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof EstimateFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof EstimateFormData, string>> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Please provide your name';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Please provide your contact phone number';
    } else if (!/^[0-9+()\s-]{7,20}$/.test(formData.phone.trim())) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Please provide your email address';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.projectLocationZip.trim()) {
      newErrors.projectLocationZip = 'Please provide your San Francisco / Bay Area location or ZIP code';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const generateMailtoUrl = () => {
    const subject = encodeURIComponent(`Estimate Request: ${formData.serviceNeeded} - ${formData.name}`);
    const body = encodeURIComponent(
      `Hello Xtreme Detail LLC,\n\nI would like to request an estimate for automotive detailing:\n\n` +
      `• Name: ${formData.name}\n` +
      `• Phone: ${formData.phone}\n` +
      `• Email: ${formData.email}\n` +
      `• Service Needed: ${formData.serviceNeeded}\n` +
      `• Location / ZIP: ${formData.projectLocationZip}\n` +
      `• Vehicle & Project Details: ${formData.vehicleDetails || 'Standard detailing inquiry'}\n\n` +
      `Thank you!`
    );
    return `mailto:${BUSINESS_INFO.email}?subject=${subject}&body=${body}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    // Launch mail client with prefilled draft
    window.location.href = generateMailtoUrl();
    setIsSubmitted(true);
  };

  const copyDetailsToClipboard = () => {
    const text = 
      `Xtreme Detail LLC Estimate Request\n` +
      `Name: ${formData.name}\n` +
      `Phone: ${formData.phone}\n` +
      `Email: ${formData.email}\n` +
      `Service: ${formData.serviceNeeded}\n` +
      `Location/ZIP: ${formData.projectLocationZip}\n` +
      `Details: ${formData.vehicleDetails}`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <section id="contact" className="py-24 bg-[#050505] text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-neutral-800 gap-6">
          <div>
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#F58220]">
              REQUEST AN ESTIMATE
            </span>
            <h2 className="font-heading font-black italic tracking-tight text-4xl sm:text-5xl lg:text-6xl text-white uppercase mt-1">
              BOOK YOUR DETAIL
            </h2>
          </div>
          <p className="max-w-md text-neutral-400 text-sm leading-relaxed">
            Contact us for a tailored quote. Provide your vehicle information and preferred detailing service below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left: Contact Info & Direct Links */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
            <div>
              <h3 className="font-heading font-black italic text-2xl sm:text-3xl text-white uppercase mb-4">
                GET IN TOUCH DIRECTLY
              </h3>
              <p className="text-neutral-300 text-sm leading-relaxed mb-8">
                We welcome inquiries for luxury cars, sports vehicles, daily drivers, and specialized paint correction projects in San Francisco.
              </p>

              {/* Direct Info Cards */}
              <div className="space-y-4">
                {/* Phone Card */}
                <a
                  href={`tel:${BUSINESS_INFO.phone}`}
                  className="flex items-center gap-4 p-5 rounded-sm bg-[#101010] border border-neutral-800 hover:border-[#F58220] transition-colors group"
                >
                  <div className="w-12 h-12 rounded-sm bg-black border border-neutral-700 flex items-center justify-center shrink-0 group-hover:border-[#FFC400]">
                    <Phone className="w-5 h-5 text-[#FFC400]" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase text-neutral-400 tracking-wider block">
                      Direct Phone
                    </span>
                    <span className="font-heading italic font-bold text-xl text-white group-hover:text-[#F58220] transition-colors">
                      {BUSINESS_INFO.phoneFormatted}
                    </span>
                  </div>
                </a>

                {/* Email Card */}
                <a
                  href={`mailto:${BUSINESS_INFO.email}`}
                  className="flex items-center gap-4 p-5 rounded-sm bg-[#101010] border border-neutral-800 hover:border-[#F58220] transition-colors group cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-sm bg-black border border-neutral-700 flex items-center justify-center shrink-0 group-hover:border-[#F58220]">
                    <Mail className="w-5 h-5 text-[#F58220]" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase text-neutral-400 tracking-wider block">
                      Official Email
                    </span>
                    <span className="text-sm sm:text-base font-semibold text-white break-all group-hover:text-[#FFC400] transition-colors">
                      {BUSINESS_INFO.email}
                    </span>
                  </div>
                </a>

                {/* Facebook Card */}
                <a
                  id="contact-facebook-link"
                  href={BUSINESS_INFO.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-5 rounded-sm bg-[#101010] border border-neutral-800 hover:border-[#1877F2] transition-colors group cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-sm bg-black border border-neutral-700 flex items-center justify-center shrink-0 group-hover:border-[#1877F2]">
                    <Facebook className="w-5 h-5 text-[#1877F2] fill-current" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase text-neutral-400 tracking-wider block">
                      Facebook Page
                    </span>
                    <span className="text-sm sm:text-base font-semibold text-white group-hover:text-[#1877F2] transition-colors">
                      facebook.com/xtremedetail2023
                    </span>
                  </div>
                </a>

                {/* Location Card */}
                <div className="flex items-center gap-4 p-5 rounded-sm bg-[#101010] border border-neutral-800">
                  <div className="w-12 h-12 rounded-sm bg-black border border-neutral-700 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-[#FFC400]" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase text-neutral-400 tracking-wider block">
                      Service Territory
                    </span>
                    <span className="text-base font-semibold text-white">
                      {BUSINESS_INFO.location}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Note on honest transmission */}
            <div className="p-4 rounded-sm bg-[#101010] border border-neutral-850 text-xs text-neutral-400 flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-[#F58220] shrink-0 mt-0.5" />
              <span>
                Submission opens a pre-formatted email draft directed to <strong className="text-white">{BUSINESS_INFO.email}</strong>.
              </span>
            </div>
          </div>

          {/* Right: Estimate Form */}
          <div className="lg:col-span-7 bg-[#101010] border border-neutral-800 p-8 sm:p-10 rounded-sm shadow-2xl">
            {isSubmitted ? (
              <div className="py-8 text-center space-y-6 animate-in fade-in duration-300">
                <div className="w-16 h-16 rounded-full bg-[#F58220]/20 border border-[#F58220] flex items-center justify-center mx-auto text-[#FFC400]">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="font-heading font-black italic text-3xl text-white uppercase">
                    ESTIMATE DRAFT READY
                  </h3>
                  <p className="text-neutral-300 text-sm mt-2 max-w-md mx-auto">
                    Your email client should have opened with the prepared inquiry to <strong className="text-white">{BUSINESS_INFO.email}</strong>.
                  </p>
                </div>

                {/* Summary box */}
                <div className="bg-black/60 border border-neutral-800 p-5 rounded-sm text-left text-xs font-mono text-neutral-300 space-y-1.5 max-w-lg mx-auto">
                  <div><strong>Client:</strong> {formData.name}</div>
                  <div><strong>Phone:</strong> {formData.phone}</div>
                  <div><strong>Email:</strong> {formData.email}</div>
                  <div><strong>Service:</strong> {formData.serviceNeeded}</div>
                  <div><strong>Location / ZIP:</strong> {formData.projectLocationZip}</div>
                  {formData.vehicleDetails && <div><strong>Vehicle:</strong> {formData.vehicleDetails}</div>}
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
                  <button
                    onClick={copyDetailsToClipboard}
                    className="w-full sm:w-auto px-5 py-3 rounded-sm bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-mono uppercase flex items-center justify-center gap-2 border border-neutral-700"
                  >
                    <Copy className="w-4 h-4" />
                    <span>{copied ? 'Copied to Clipboard!' : 'Copy Summary'}</span>
                  </button>

                  <a
                    href={`tel:${BUSINESS_INFO.phone}`}
                    className="w-full sm:w-auto px-5 py-3 rounded-sm bg-gradient-to-r from-[#FFC400] to-[#F58220] text-black font-heading italic font-extrabold text-sm uppercase flex items-center justify-center gap-2"
                  >
                    <Phone className="w-4 h-4" />
                    <span>Call {BUSINESS_INFO.phoneFormatted}</span>
                  </a>
                </div>

                <div className="pt-4">
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="text-xs text-neutral-400 hover:text-white underline"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Name */}
                  <div>
                    <label htmlFor="name" className="block text-xs font-mono uppercase tracking-wider text-neutral-300 mb-2">
                      Your Name <span className="text-[#F58220]">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Michael Rossi"
                      className="w-full px-4 py-3 bg-black border border-neutral-800 rounded-sm text-white placeholder-neutral-600 focus:outline-none focus:border-[#F58220] text-sm transition-colors"
                    />
                    {errors.name && <p className="text-red-400 text-xs mt-1.5">{errors.name}</p>}
                  </div>

                  {/* Phone */}
                  <div>
                    <label htmlFor="phone" className="block text-xs font-mono uppercase tracking-wider text-neutral-300 mb-2">
                      Phone Number <span className="text-[#F58220]">*</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="e.g. 510-927-1390"
                      className="w-full px-4 py-3 bg-black border border-neutral-800 rounded-sm text-white placeholder-neutral-600 focus:outline-none focus:border-[#F58220] text-sm transition-colors"
                    />
                    {errors.phone && <p className="text-red-400 text-xs mt-1.5">{errors.phone}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-xs font-mono uppercase tracking-wider text-neutral-300 mb-2">
                      Email Address <span className="text-[#F58220]">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. name@example.com"
                      className="w-full px-4 py-3 bg-black border border-neutral-800 rounded-sm text-white placeholder-neutral-600 focus:outline-none focus:border-[#F58220] text-sm transition-colors"
                    />
                    {errors.email && <p className="text-red-400 text-xs mt-1.5">{errors.email}</p>}
                  </div>

                  {/* Location / ZIP */}
                  <div>
                    <label htmlFor="projectLocationZip" className="block text-xs font-mono uppercase tracking-wider text-neutral-300 mb-2">
                      Location / ZIP Code <span className="text-[#F58220]">*</span>
                    </label>
                    <input
                      type="text"
                      id="projectLocationZip"
                      name="projectLocationZip"
                      value={formData.projectLocationZip}
                      onChange={handleChange}
                      placeholder="e.g. 94103 / San Francisco"
                      className="w-full px-4 py-3 bg-black border border-neutral-800 rounded-sm text-white placeholder-neutral-600 focus:outline-none focus:border-[#F58220] text-sm transition-colors"
                    />
                    {errors.projectLocationZip && (
                      <p className="text-red-400 text-xs mt-1.5">{errors.projectLocationZip}</p>
                    )}
                  </div>
                </div>

                {/* Service Needed */}
                <div>
                  <label htmlFor="serviceNeeded" className="block text-xs font-mono uppercase tracking-wider text-neutral-300 mb-2">
                    Service Needed <span className="text-[#F58220]">*</span>
                  </label>
                  <select
                    id="serviceNeeded"
                    name="serviceNeeded"
                    value={formData.serviceNeeded}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-black border border-neutral-800 rounded-sm text-white focus:outline-none focus:border-[#F58220] text-sm transition-colors cursor-pointer"
                  >
                    {SERVICES_DATA.map((srv) => (
                      <option key={srv.id} value={srv.name}>
                        {srv.name} — {srv.highlight}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Project / Vehicle Details */}
                <div>
                  <label htmlFor="vehicleDetails" className="block text-xs font-mono uppercase tracking-wider text-neutral-300 mb-2">
                    Vehicle & Project Details
                  </label>
                  <textarea
                    id="vehicleDetails"
                    name="vehicleDetails"
                    rows={4}
                    value={formData.vehicleDetails}
                    onChange={handleChange}
                    placeholder="Vehicle year, make, model, paint condition, or specific focus areas (e.g. swirl removal, leather conditioning, ceramic protection)..."
                    className="w-full px-4 py-3 bg-black border border-neutral-800 rounded-sm text-white placeholder-neutral-600 focus:outline-none focus:border-[#F58220] text-sm transition-colors resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  id="submit-estimate-btn"
                  className="w-full py-4 rounded-sm font-heading italic font-extrabold text-base uppercase tracking-wider text-black bg-gradient-to-r from-[#FFC400] via-[#F58220] to-[#D92820] hover:brightness-110 shadow-[0_0_25px_rgba(245,130,32,0.35)] transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>REQUEST ESTIMATE DRAFT</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
