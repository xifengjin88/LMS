const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const categories = [
  { name: "Arts and Humanities" },
  { name: "Business and Management" },
  { name: "Computer Science" },
  { name: "Data Science" },
  { name: "Design" },
  { name: "Economics and Finance" },
  { name: "Education" },
  { name: "Engineering" },
  { name: "Environmental Studies" },
  { name: "Health and Medicine" },
  { name: "History" },
  { name: "Language Learning" },
  { name: "Law" },
  { name: "Life Sciences" },
  { name: "Literature" },
  { name: "Marketing" },
  { name: "Mathematics" },
  { name: "Music" },
  { name: "Personal Development" },
  { name: "Philosophy" },
  { name: "Physical Sciences" },
  { name: "Psychology" },
  { name: "Social Sciences" },
  { name: "Sports and Fitness" },
  { name: "Technology" },
];
async function main() {
  try {
    await prisma.category.createMany({
      data: categories,
    });
    console.log("success");
  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
