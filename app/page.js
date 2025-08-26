"use client";

import { WavyBackground } from "@/components/ui/wavy-background";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MultiSelect } from "@/components/ui/multi-select";
import { useState } from "react";
import { toast } from "react-toastify";
import { ArrowUpRight, Loader } from "lucide-react";

export default function Home() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    domain: [],
    gender: "",
    cgpa: "",
    roll_number: "",
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
        domain: [],
        gender: "",
        cgpa: "",
        roll_number: "",
        performance: "",
      });
    } else {
      toast.error(result.error || "Submission failed");
    }
    setIsSubmitting(false);
  };

  return (
    <WavyBackground waveWidth={35} blur={15} waveOpacity={0.1} speed="fast">
      <main className="min-h-screen">
        <section className="flex justify-center items-center font-[family-name:var(--font-geist-sans)] my-4 mt-10">
          <div className="text-white p-3 max-w-5xl mx-auto">
            <header className="text-center mb-8">
              <h1 className="text-3xl font-bold font-[family-name:var(--font-orbitron)] tracking-wider mb-4">ECESS Audition 2025</h1>
            </header>
            
            <section className="audition-form">
              <h2 className="sr-only">Audition Registration Form</h2>
              <form className="my-3" onSubmit={handleSubmit}>
                <div className="mb-3">
                  <Label htmlFor="name">Name</Label>
                  <Input name="name" value={formData.name} onChange={handleChange} required placeholder="Enter your full name" type="text" maxLength="100" />
                </div>

                <div className="mb-3">
                  <Label htmlFor="email">Email</Label>
                  <Input name="email" value={formData.email} onChange={handleChange} required placeholder="Enter your email" type="email" />
                </div>

                <div className="mb-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 items-start">
                    <div className="w-full">
                      <Label htmlFor="phone">Phone</Label>
                      <Input name="phone" value={formData.phone} onChange={handleChange} required placeholder="Enter your phone number" type="tel" minLength="10" maxLength="10" />
                    </div>
                    <div className="w-full">
                      <Label htmlFor="gender">Gender</Label>
                      <Select name="gender" value={formData.gender} onValueChange={(value) => setFormData({ ...formData, gender: value })} required>
                        <SelectTrigger className="flex h-10 w-full rounded-lg border-2 border-white px-3 py-2 text-base shadow-md transition-colors bg-black/50 text-white hover:bg-gray-800/50 hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white disabled:cursor-not-allowed disabled:opacity-50 md:text-sm">
                          <SelectValue placeholder="Select your gender" className="text-white" />
                        </SelectTrigger>
                        <SelectContent className="bg-black border-2 border-white text-white">
                          <SelectItem value="Male" className="text-white hover:bg-gray-800 focus:bg-gray-800">Male</SelectItem>
                          <SelectItem value="Female" className="text-white hover:bg-gray-800 focus:bg-gray-800">Female</SelectItem>
                          <SelectItem value="Others" className="text-white hover:bg-gray-800 focus:bg-gray-800">Others</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <div className="mb-3">
                  <Label htmlFor="domain">Domain</Label>
                  <MultiSelect 
                    value={formData.domain} 
                    onChange={(value) => setFormData({ ...formData, domain: value })}
                    placeholder="Select your domains"
                  />
                </div>

                <div className="mb-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 items-start">
                    <div className="w-full">
                      <Label htmlFor="cgpa">CGPA</Label>
                      <Input name="cgpa" value={formData.cgpa} onChange={handleChange} required placeholder="Enter your CGPA" type="number" step="0.01" min="5.00" max="10.00" />
                    </div>
                    <div className="w-full">
                      <Label htmlFor="roll_number">Roll number</Label>
                      <Input name="roll_number" value={formData.roll_number} onChange={handleChange} required placeholder="Enter your roll number" type="text" maxLength="8" />
                    </div>
                  </div>
                </div>

                <div className="mb-3">
                  <Label htmlFor="performance">Why do you want to be a part of ECESS?</Label>
                  <Textarea name="performance" value={formData.performance} onChange={handleChange} placeholder="Explain why you want to join ECESS and how can you contribute" maxLength="500" />
                </div>

                <Button className="my-3 text-md w-full shadow-lg hover:shadow-blue-500/50 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-4 rounded-lg flex items-center gap-2 hover:scale-105 transition-transform duration-300" type="submit" disabled={isSubmitting}>
                  {isSubmitting ? <Loader className="animate-spin" /> : (<> Submit <ArrowUpRight /> </>)}
                </Button>
              </form>
            </section>
          </div>
        </section>
      </main>
    </WavyBackground>
  );
}
