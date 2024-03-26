import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const pageViews = await prisma.pageView.groupBy({
        by: ["variation"],
        _count: {
          userId: true,
        },
      });

      const clicks = await prisma.click.groupBy({
        by: ["variation"],
        _count: {
          userId: true,
        },
      });

      const ctrs = pageViews.map((view) => {
        const click = clicks.find(
          (click) => click.variation === view.variation
        );
        return {
          variation: view.variation,
          ctr: click ? click._count.userId / view._count.userId : 0,
        };
      });

      return res.status(200).json(ctrs);
    } catch (error) {
      console.error("Request error", error);
      res.status(500).json({ error: "Error fetching CTR data" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
