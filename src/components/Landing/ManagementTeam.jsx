import React from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const teamMembers = [
  {
    name: "John Doe",
    position: "CEO",
    image: "/team-1.jpg",
  },
  {
    name: "Jane Smith",
    position: "CFO",
    image: "/team-2.jpg",
  },
  {
    name: "Mike Johnson",
    position: "COO",
    image: "/team-3.jpg",
  },
  {
    name: "Sarah Lee",
    position: "CTO",
    image: "/team-4.jpg",
  },
];

const ManagementTeam = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">
          Our Management Team
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card>
                <CardHeader>
                  <Avatar className="w-24 h-24 mx-auto">
                    <AvatarImage src={member.image} alt={member.name} />
                    <AvatarFallback>
                      {member.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                </CardHeader>
                <CardContent className="text-center">
                  <CardTitle>{member.name}</CardTitle>
                  <CardDescription>{member.position}</CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ManagementTeam;
