import fetch from 'node-fetch';

export async function handler(event, context) {
  const videoUrl = event.queryStringParameters.url;

  if (!videoUrl) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Video URL missing" }),
    };
  }

  try {
    const apiResponse = await fetch(
      `https://tiktok-video-no-watermark2.p.rapidapi.com/video/url?url=${encodeURIComponent(videoUrl)}`,
      {
        method: "GET",
        headers: {
          "x-rapidapi-host": "tiktok-video-no-watermark2.p.rapidapi.com",
          "x-rapidapi-key": process.env.RAPIDAPI_KEY // Netlify Environment variable
        }
      }
    );

    const data = await apiResponse.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };

  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
}