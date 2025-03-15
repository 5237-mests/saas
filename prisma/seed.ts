// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

// async function main() {
//   console.log("Seeding database...");

//   // Create categories
//   const trafficRules = await prisma.category.create({
//     data: { name: "Traffic Rules & Regulations" },
//   });

//   const vehicleMechanics = await prisma.category.create({
//     data: { name: "Vehicle Mechanics" },
//   });

//   const defensiveDriving = await prisma.category.create({
//     data: { name: "Defensive Driving" },
//   });

//   const firstAid = await prisma.category.create({
//     data: { name: "First Aid & Emergencies" },
//   });

//   // Create mock tests under categories
//   const trafficTest = await prisma.test.create({
//     data: {
//       title: "Basic Traffic Rules Test",
//       categoryId: trafficRules.id,
//     },
//   });

//   const mechanicsTest = await prisma.test.create({
//     data: {
//       title: "Vehicle Mechanics Basics",
//       categoryId: vehicleMechanics.id,
//     },
//   });

//   // Add questions to tests
//   const trafficQ1 = await prisma.question.create({
//     data: {
//       question: "What does a red traffic light mean?",
//       testId: trafficTest.id,
//       answer: "Stop",
//     },
//   });

//   const trafficQ2 = await prisma.question.create({
//     data: {
//       question: "What should you do when a pedestrian is at a crosswalk?",
//       testId: trafficTest.id,
//       answer: "Stop",
//     },
//   });

//   const mechanicsQ1 = await prisma.question.create({
//     data: {
//       question: "What part of the engine cools it down?",
//       testId: mechanicsTest.id,
//       answer: "Radiator",
//     },
//   });

//   // Add options to questions
//   await prisma.option.createMany({
//     data: [
//       { questionId: trafficQ1.id, option: "Stop" },
//       { questionId: trafficQ1.id, option: "Go" },
//       { questionId: trafficQ1.id, option: "Slow down" },
//       { questionId: trafficQ1.id, option: "Yield" },

//       { questionId: trafficQ2.id, option: "Honk" },
//       { questionId: trafficQ2.id, option: "Speed up" },
//       { questionId: trafficQ2.id, option: "Stop" },
//       { questionId: trafficQ2.id, option: "Ignore" },

//       { questionId: mechanicsQ1.id, option: "Radiator" },
//       { questionId: mechanicsQ1.id, option: "Battery" },
//       { questionId: mechanicsQ1.id, option: "Oil filter" },
//       { questionId: mechanicsQ1.id, option: "Alternator" },
//     ],
//   });

//   // Create students
//   const student1 = await prisma.student.create({
//     data: {
//       name: "John Doe",
//       email: "john.doe@example.com",
//     },
//   });

//   // Create test result
//   await prisma.testResult.create({
//     data: {
//       studentId: student1.id,
//       testId: trafficTest.id,
//       score: 85,
//     },
//   });

//   console.log("✅ Database seeding complete!");
// }

// main()
//   .catch((e) => console.error("Seeding error:", e))
//   .finally(() => prisma.$disconnect());

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Creating Categories
  const trafficSigns = await prisma.category.create({
    data: {
      name: "Traffic Signs",
    },
  });

  const roadSafetyRules = await prisma.category.create({
    data: {
      name: "Road Safety Rules",
    },
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const vehicleMaintenance = await prisma.category.create({
    data: {
      name: "Vehicle Maintenance",
    },
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const drivingTechniques = await prisma.category.create({
    data: {
      name: "Driving Techniques",
    },
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const roadRulesRegulations = await prisma.category.create({
    data: {
      name: "Road Rules and Regulations",
    },
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const firstAid = await prisma.category.create({
    data: {
      name: "First Aid",
    },
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const alcoholDrugsAwareness = await prisma.category.create({
    data: {
      name: "Alcohol and Drugs Awareness",
    },
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const nightDriving = await prisma.category.create({
    data: {
      name: "Night Driving",
    },
  });

  // Creating Questions for Traffic Signs Category
  await prisma.question.createMany({
    data: [
      {
        text: "What does a red octagonal sign mean?",
        options: JSON.stringify([
          "Stop",
          "Yield",
          "Do not enter",
          "Speed limit",
        ]),
        correctAnswer: 0,
        categoryId: trafficSigns.id,
      },
      {
        text: "What does a yellow triangle sign with an exclamation mark indicate?",
        options: JSON.stringify(["Caution", "Stop", "Yield", "Merge"]),
        correctAnswer: 0,
        categoryId: trafficSigns.id,
      },
      {
        text: "What does a blue circular sign indicate?",
        options: JSON.stringify([
          "No entry",
          "Mandatory action",
          "Warning",
          "Speed limit",
        ]),
        correctAnswer: 1,
        categoryId: trafficSigns.id,
      },
    ],
  });

  // Creating Questions for Road Safety Rules Category
  await prisma.question.createMany({
    data: [
      {
        text: "What is the legal speed limit in urban areas?",
        options: JSON.stringify(["30 km/h", "50 km/h", "60 km/h", "100 km/h"]),
        correctAnswer: 1,
        categoryId: roadSafetyRules.id,
      },
      {
        text: "What should you do if you approach a school zone?",
        options: JSON.stringify([
          "Speed up",
          "Slow down",
          "Turn around",
          "Stop immediately",
        ]),
        correctAnswer: 1,
        categoryId: roadSafetyRules.id,
      },
      {
        text: "What does a solid yellow line on the road indicate?",
        options: JSON.stringify([
          "No passing",
          "Speed limit",
          "Pedestrian crossing",
          "Bike lane",
        ]),
        correctAnswer: 0,
        categoryId: roadSafetyRules.id,
      },
    ],
  });

  // Create additional questions for other categories...

  console.log("Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
