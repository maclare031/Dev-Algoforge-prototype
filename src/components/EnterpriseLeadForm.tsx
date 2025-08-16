"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Shield, Zap } from "lucide-react";
import * as z from "zod";
import toast from "react-hot-toast";

const formSchema = z.object({
  formType: z.literal("EnterpriseSolutions").or(z.literal("EnterpriseDemo")),
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  phone: z
    .string()
    .min(10, { message: "Phone must be at least 10 digits." }),
  goal: z.string().min(1, { message: "Please specify your goal." }),
  preferredTime: z.string().optional(),
  experienceLevel: z.string().min(1, { message: "Select your experience." }),
});

type FormSchema = z.infer<typeof formSchema>;

interface EnterpriseLeadFormProps {
  formType: "EnterpriseSolutions" | "EnterpriseDemo";
  onSuccess?: () => void;
}

export function EnterpriseLeadForm({ formType, onSuccess }: EnterpriseLeadFormProps) {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      formType,
      name: "",
      email: "",
      phone: "",
      goal: "",
      preferredTime: "",
      experienceLevel: "",
    },
  });

  const { handleSubmit, register, formState } = form;
  const { errors, isSubmitting } = formState;

  const onSubmit = async (values: FormSchema) => {
    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) throw new Error("Submission failed");
      toast.success("Submitted successfully!");
      form.reset();
      if (onSuccess) {
        // Small delay to allow user to see the success message
        setTimeout(() => {
          onSuccess();
        }, 1500);
      }
    } catch (error) {
      toast.error("Submission failed. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2 px-3 py-2">
      <input type="hidden" {...register("formType")} value={formType} />

      <input
        type="text"
        {...register("name")}
        placeholder="Full Name *"
        className="bg-gray-800/70 border border-gray-600/60 text-white text-xs rounded-lg py-2 px-2"
      />
      <input
        type="email"
        {...register("email")}
        placeholder="Email *"
        className="bg-gray-800/70 border border-gray-600/60 text-white text-xs rounded-lg py-2 px-2"
      />
      <input
        type="tel"
        {...register("phone")}
        placeholder="Phone *"
        className="bg-gray-800/70 border border-gray-600/60 text-white text-xs rounded-lg py-2 px-2"
      />
      <input
        type="text"
        {...register("goal")}
        placeholder="What’s your business goal? *"
        className="bg-gray-800/70 border border-gray-600/60 text-white text-xs rounded-lg py-2 px-2"
      />
      <input
        type="text"
        {...register("preferredTime")}
        placeholder="Preferred time (optional)"
        className="bg-gray-800/70 border border-gray-600/60 text-white text-xs rounded-lg py-2 px-2"
      />
      <select
        {...register("experienceLevel")}
        className="bg-gray-800/70 border border-gray-600/60 text-white text-xs rounded-lg py-2 px-2"
      >
        <option value="">Experience Level *</option>
        <option value="Beginner">Beginner</option>
        <option value="Intermediate">Intermediate</option>
        <option value="Advanced">Advanced</option>
        <option value="Expert">Expert</option>
      </select>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-cyan-500 hover:bg-cyan-600 text-xs font-bold py-2 px-2 rounded-lg mt-2 flex items-center justify-center gap-1 shadow-none"
      >
        {isSubmitting ? (
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            <span>Processing…</span>
          </div>
        ) : (
          <>
            <Zap className="w-4 h-4" />
            <span>Submit</span>
          </>
        )}
      </Button>

      <div className="flex items-center justify-center gap-2 mt-1 text-[10px] text-gray-400">
        <Shield className="w-3 h-3" />
        <span>Secure</span>
        <span className="h-1 w-1 bg-gray-600 rounded-full" />
        <span>No Spam</span>
      </div>
    </form>
  );
}
