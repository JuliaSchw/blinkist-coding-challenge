import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { userId, variation } = req.body;
    try {
      const pageView = await prisma.pageView.create({
        data: {
          userId: parseInt(userId, 10),
          variation,
        },
      });
      return res.status(200).json(pageView);
    } catch (error) {
      console.error("Request error", error);
      res.status(500).json({ error: "Error creating page view" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
