import { prisma } from "../lib/prisma";
import { hashPassword } from "better-auth/crypto";
import { randomUUID } from "crypto";

async function main() {
  console.log("Starting seed sequence...");

  // 1. Seed Projects
  // console.log("Seeding projects...");
  // await prisma.project.deleteMany(); // Clear existing
  // for (const project of projectsData) {
  //   await prisma.project.create({
  //     data: {
  //       title: project.title,
  //       description: project.description,
  //       image: project.image,
  //       techStack: JSON.stringify(project.techStack),
  //       githubUrl: project.githubUrl,
  //       demoUrl: project.demoUrl,
  //       featured: project.featured,
  //     },
  //   });
  // }
  // console.log(`Seeded ${projectsData.length} projects.`);

  // // 2. Seed Skills
  // console.log("Seeding skills...");
  // await prisma.skill.deleteMany(); // Clear existing
  // for (const skill of skillsData) {
  //   await prisma.skill.create({
  //     data: {
  //       name: skill.name,
  //       category: skill.category,
  //       logo: skill.logo || "",
  //     },
  //   });
  // }
  // console.log(`Seeded ${skillsData.length} skills.`);

  // 3. Create Admin User (directly via Prisma)
  console.log("Seeding admin user...");
  try {
    const hashedPassword = await hashPassword("password123");
    await prisma.user.upsert({
      where: { email: "admin@example.com" },
      update: {},
      create: {
        id: randomUUID(),
        email: "admin@example.com",
        name: "Admin User",
        emailVerified: false,
        createdAt: new Date(),
        updatedAt: new Date(),
        accounts: {
          create: [
            {
              id: randomUUID(),
              providerId: "credential",
              accountId: "admin@example.com",
              password: hashedPassword,
              createdAt: new Date(),
              updatedAt: new Date(),
            },
          ],
        },
      },
    });
    console.log("Admin user seeded successfully.");
  } catch (error) {
    console.error("Failed to seed admin user:", error);
  }

  console.log("Seed sequence completed.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
