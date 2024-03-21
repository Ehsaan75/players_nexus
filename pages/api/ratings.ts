// pages/api/ratings.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../firebase/firebase'; // Adjust the import path as necessary
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';

interface RatingData {
  userId: string;
  gameId: string;
  overall: number;
  story: number;
  gameplay: number;
  graphics: number;
  audio: number;
  multiplayer: number;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { userId, gameId, overall, story, gameplay, graphics, audio, multiplayer }: RatingData = req.body;

      // Create a reference for a new rating document with a composite key
      const ratingDocRef = doc(db, 'ratings', `${userId}_${gameId}`);

      // Set the data in Firestore, merge: true will update the document or create it if it doesn't exist
      await setDoc(ratingDocRef, {
        userId,
        gameId,
        overall,
        story,
        gameplay,
        graphics,
        audio,
        multiplayer,
        createdAt: serverTimestamp() // Timestamp from Firebase server
      }, { merge: true });

      res.status(200).json({ message: 'Rating submitted successfully' });
    } catch (error) {
      console.error('Error writing document: ', error);
      res.status(500).json({ error: 'Failed to submit rating' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
