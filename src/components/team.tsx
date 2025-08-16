"use client";

import React from "react";
import { Linkedin, MapPin, Mail, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

export default function TeamSection() {
  const teamMembers = [
    {
      id: 1,
      name: "Ashutosh Hiskiel",
      role: "CEO",
      profilePic: "https://i.ibb.co/mFqZ6dcd/ashu.jpg",
      linkedInId: "ashutosh-h-52270a286",
      location: "Noida, India",
      email: "enquiry@algoforgestudios.com",
      priority: 1,
    },
    {
      id: 2,
      name: "Aishwarya P.Tripathi",
      role: "Corporate Legal Advisor",
      profilePic: "/images/lawyer.jpg",
      linkedInId: "aishwarya-tripathi-b780a3291",
      location: "Noida, India",
      email: "enquiry@algoforgestudios.com",
      priority: 2,
    },
    {
      id: 3,
      name: "Harshit",
      role: "Data Scientist",
      profilePic: "https://i.ibb.co/tMqZcSPB/IMG-0343.jpg",
      linkedInId: "harshit-bhargave",
       location: "Noida, India",
      email: "enquiry@algoforgestudios.com",
      priority: 3,
    },
    {
      id: 4,
      name: "Pranjal",
      role: "Associate Data Analyst",
      profilePic: "https://i.ibb.co/JF056NP4/Whats-App-Image-2025-08-03-at-19-52-41.jpg",
      linkedInId: "pranjal-marwaha-6149a8278",
       location: "Noida, India",
      email: "enquiry@algoforgestudios.com",
      priority: 4,
    },
    {
      id: 5,
      name: "Samiya",
      role: "Full Stack Developer",
      profilePic: "/images/samiya.jpg",
      linkedInId: "samiya-06100729a",
       location: "Noida, India",
      email: "enquiry@algoforgestudios.com",
      priority: 5,
    },
    {
      id: 6,
      name: "Kapish",
      role: "Associate Data Analyst",
      profilePic: "https://i.ibb.co/cXRKGm2x/Kapish.jpg",
      linkedInId: "kapish-verma-287b33304",
       location: "Noida, India",
      email: "enquiry@algoforgestudios.com",
      priority: 6,
    },
    {
      id: 7,
      name: "Taniya",
      role: "Associate Data Engineer",
      profilePic: "https://i.ibb.co/cXMV12jn/Taniya.jpg",
      linkedInId: "taniya-nagrath-bb5a38323",
       location: "Noida, India",
      email: "enquiry@algoforgestudios.com",
      priority: 7,
    }
  ];

  // Sort team members by priority (role hierarchy)
  const sortedTeamMembers = teamMembers.sort((a, b) => a.priority - b.priority);

  return (
    <section className="py-2 sm:py-12 lg:py-16 bg-gradient-to-br from-black/60 via-gray-900/90 to-black/95">
      <div className="max-w-7xl mx-auto px-3 sm:px-4">
        {/* Clean Header */}
        <div className="text-center mb-8 sm:mb-12">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-cyan-500/10 rounded-full border border-cyan-500/30 text-cyan-400 text-xs sm:text-sm font-medium mb-4 sm:mb-6">
            Meet Our Team
          </span>

          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-3 leading-tight">
            <span className="bg-gradient-to-r from-purple-400 via-cyan-400 to-pink-400 bg-clip-text text-transparent">
              The Dream Team
            </span>
          </h2>

          <p className="text-sm text-white leading-relaxed mb-8 max-w-lg mx-auto">
            Meet the brilliant minds behind our cutting-edge AI/ML solutions.
          </p>
        </div>

        {/* Mobile-optimized Team Grid - 2 cards per row on mobile */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
          {sortedTeamMembers.map((member) => (
            <Card
              key={member.id}
              className="bg-gradient-to-br from-gray-800/40 to-gray-900/60 border border-gray-700/30 rounded-lg sm:rounded-xl overflow-hidden"
            >
              <CardContent className="p-3 sm:p-4 text-center">
                {/* Compact Profile Picture */}
                <div className="relative mb-3 sm:mb-4 mx-auto w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24">
                  {/* Simple border */}
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/60 to-purple-500/60 rounded-full p-[1.5px]">
                    <div className="w-full h-full bg-gray-900 rounded-full"></div>
                  </div>

                  {/* Profile image */}
                  <div className="absolute inset-[2px] rounded-full overflow-hidden">
                    <Image
                      src={member.profilePic}
                      alt={member.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 64px, (max-width: 1024px) 80px, 96px"
                    />
                  </div>
                </div>

                {/* Compact Member Info */}
                <div className="space-y-2 sm:space-y-3">
                  <h3 className="text-sm sm:text-base lg:text-lg font-bold text-white leading-tight">
                    {member.name}
                  </h3>

                  <div className="inline-block px-2 sm:px-3 py-1 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/20 rounded-full">
                    <p className="text-xs text-cyan-300 font-medium truncate">
                      {member.role}
                    </p>
                  </div>

                  {/* Simplified location */}
                  <div className="flex items-center justify-center gap-1 text-xs text-gray-400">
                    <MapPin className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-cyan-400 flex-shrink-0" />
                    <span className="truncate">{member.location}</span>
                  </div>

                  {/* Compact Action Buttons */}
                  <div className="flex gap-1.5 sm:gap-2 justify-center pt-2 sm:pt-3">
                    {member.linkedInId && (
                      <a
                        href={`https://linkedin.com/in/${member.linkedInId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 px-2 sm:px-3 py-1.5 bg-cyan-500/10 border border-cyan-500/20 rounded-lg text-cyan-400 transition-colors duration-300 text-xs font-medium"
                      >
                        <Linkedin className="w-3 h-3" />
                        <span className="hidden sm:inline">LinkedIn</span>
                      </a>
                    )}
                    <a
                      href={`mailto:${member.email}`}
                      className="p-1.5 bg-purple-500/10 border border-purple-500/20 rounded-lg text-purple-400 transition-colors duration-300"
                    >
                      <Mail className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Minimal CTA Section */}
        <div className="text-center mt-8 sm:mt-12">
          <div className="inline-flex flex-col sm:flex-row items-center gap-2 sm:gap-3 p-3 sm:p-4 bg-gradient-to-r from-gray-800/40 to-gray-900/60 border border-gray-700/30 rounded-lg sm:rounded-xl">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg flex items-center justify-center flex-shrink-0">
              <Users className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>

            <div className="text-center sm:text-left">
              <h3 className="text-base sm:text-lg font-semibold text-white">
                Join Our Team
              </h3>
              <p className="text-xs sm:text-sm text-gray-400">
                We're hiring talented individuals
              </p>
            </div>

            <Link href="/careers">
              <Button className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-white font-medium px-4 sm:px-5 py-2 rounded-lg transition-colors duration-300 text-xs sm:text-sm">
                Join Us
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
