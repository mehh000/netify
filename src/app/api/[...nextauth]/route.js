// pages/api/telegram.js
import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

const botToken = '7284102937:AAFEFp3JhAjUQv80XtFUiA9kPOUwXJj2HSY';
const apiUrl = `https://api.telegram.org/bot${botToken}`;

const getUpdates = async () => {
  const response = await axios.get(`${apiUrl}/getUpdates`);
  return response.data;
};

export default async (req = NextApiRequest, res = NextApiResponse) => {
  if (req.method === 'GET') {
    try {
      const updates = await getUpdates();
      res.status(200).json(updates);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch data from Telegram API' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};
