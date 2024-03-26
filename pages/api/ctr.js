// pages/api/ctr.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      // Fetch unique page views per variation
      const pageViews = await prisma.pageView.groupBy({
        by: ['variation'],
        _count: {
          userId: true,
        },
      });

      // Fetch unique clicks per variation
      const clicks = await prisma.click.groupBy({
        by: ['variation'],
        _count: {
          userId: true,
        },
      });

      // Calculate CTR for each variation
      const ctrs = pageViews.map((view) => {
        const click = clicks.find((click) => click.variation === view.variation);
        return {
          variation: view.variation,
          ctr: click ? (click._count.userId / view._count.userId) : 0,
        };
      });

      return res.status(200).json(ctrs);
    } catch (error) {
      console.error('Request error', error);
      res.status(500).json({ error: 'Error fetching CTR data' });
    }
  } else {
    // Handle any requests other than GET
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
