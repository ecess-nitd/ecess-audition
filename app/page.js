"use client";

import { WavyBackground } from "@/components/ui/wavy-background";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "react-toastify";
import { ArrowUpRight, Loader } from "lucide-react";

export default function Home() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    section: "",
    roll_number: "",
    hall_number: "",
    performance: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const response = await fetch("/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const result = await response.json();

    if (response.ok) {
      toast.success(result.message);
      setFormData({
        name: "",
        email: "",
        phone: "",
        section: "",
        roll_number: "",
        hall_number: "",
        performance: "",
      });
    } else {
      toast.error(result.error || "Submission failed");
    }
    setIsSubmitting(false);
  };

  return (
    <WavyBackground waveWidth={35} blur={15} waveOpacity={0.1} speed="fast">
      <div className="flex justify-center items-center font-[family-name:var(--font-geist-sans)] my-4 mt-10">
        <div className="text-white p-3">
          <p className="text-3xl font-bold font-[family-name:var(--font-orbitron)] tracking-wider">Exordium 2025</p>
          {/* <p className="text-lg text-slate-300">
          These audition questions are designed to evaluate your skills, creativity, and problem-solving abilities.
        </p> */}
          <form className="my-3" onSubmit={handleSubmit}>
            <Label htmlFor="name">Name</Label>
            <Input name="name" value={formData.name} onChange={handleChange} required placeholder="Enter your full name" type="text" maxLength="100" />

            <div className="flex flex-col md:flex-row md:space-x-3">
              <div className="flex-1">
                <Label htmlFor="email">Email</Label>
                <Input name="email" value={formData.email} onChange={handleChange} required placeholder="Enter your email" type="email" />
              </div>
              <div className="flex-1">
                <Label htmlFor="phone">Phone</Label>
                <Input name="phone" value={formData.phone} onChange={handleChange} required placeholder="Enter your phone number" type="tel" minLength="10" maxLength="10" />
              </div>
            </div>

            <div className="flex flex-col md:flex-row md:space-x-3">
              <div className="flex-1">
                <Label htmlFor="section">Section</Label>
                <Input name="section" value={formData.section} onChange={handleChange} required placeholder="Enter your section" type="text" maxLength="1" />
              </div>
              <div className="flex-1">
                <Label htmlFor="roll_number">Roll number</Label>
                <Input name="roll_number" value={formData.roll_number} onChange={handleChange} required placeholder="Enter your roll number" type="text" maxLength="8" />
              </div>
            </div>

            <Label htmlFor="hall_number">Hall Number</Label>
            <Input name="hall_number" value={formData.hall_number} onChange={handleChange} required placeholder="Enter your hall number" type="number" min="1" max="14" />

            <div className="my-3">
              <Label htmlFor="performance">Willing to stage any performance, if yes, then what?</Label>
              <Textarea name="performance" value={formData.performance} onChange={handleChange} placeholder="Enter your answer" maxLength="500" />
            </div>

            <Button className="my-3 text-md w-full shadow-lg hover:shadow-blue-500/50 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-4 rounded-lg flex items-center gap-2 hover:scale-105 transition-transform duration-300" type="submit" disabled={isSubmitting}>
              {isSubmitting ? <Loader className="animate-spin" /> : (<> Submit <ArrowUpRight /> </>)}
            </Button>
          </form>
        </div>
      </div>
    </WavyBackground>
  );
}
