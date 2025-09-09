import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();
app.use(cors());

app.get('/getVideo', async (req, res) => {
  const videoUrl = req.query.url;
  if (!videoUrl) return res.status(400).json({ error: "Video URL missing" });

  try {
    const apiKey = process.env.RAPIDAPI_KEY; // Render Environment Variable
    const apiResponse = await fetch(
      `https://tiktok-video-no-watermark2.p.rapidapi.com/video/url?url=${encodeURIComponent(videoUrl)}`,
      {
        method: "GET",
        headers: {
          "x-rapidapi-host": "tiktok-video-no-watermark2.p.rapidapi.com",
          "x-rapidapi-key": apiKey
        }
      }
    );

    const data = await apiResponse.json();
    res.json(data);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
