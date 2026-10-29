import React from "react";
import { ShieldCheck, AlertTriangle, ArrowUpRight } from "lucide-react";

export const FoodSafetyView: React.FC<{
  onNavigate: (view: string) => void;
}> = ({ onNavigate }) => (
  <div className="page-width home-section">
    <span className="eyebrow">Our commitment to wholesome meat</span>
    <h1 className="text-4xl sm:text-5xl mb-8">Quality, health and safety.</h1>
    <p className="text-lg max-w-3xl mb-12">
      KACL applies health and safety standards in the slaughtering and dressing
      of cattle, sheep, goats and pigs, under the scrutiny of Veterinary
      Doctors.
    </p>
    <div className="grid md:grid-cols-2 gap-8">
      <section className="border border-[#dbe1d5] rounded p-8 space-y-4">
        <ShieldCheck className="w-8 h-8 text-[#174b32]" />
        <h2 className="text-2xl">Veterinary inspection</h2>
        <p>
          Veterinary Doctors inspect carcasses and certify those found wholesome
          for consumption. Our trained and qualified butchers provide flaying,
          singeing, dressing and cutting services.
        </p>
      </section>
      <section className="border border-[#dbe1d5] rounded p-8 space-y-4">
        <AlertTriangle className="w-8 h-8 text-[#174b32]" />
        <h2 className="text-2xl">When a carcass is unwholesome</h2>
        <p>
          Any carcass found unwholesome by Veterinary Doctors is condemned,
          confiscated and disposed of in its entirety, rather than offered for
          consumption.
        </p>
      </section>
    </div>
    <button
      className="button-primary mt-10"
      onClick={() => onNavigate("contact")}
    >
      Ask about our services <ArrowUpRight className="w-4 h-4" />
    </button>
  </div>
);
