
'use server';

import { z } from 'zod';
import { db } from '@/lib/firebase';
import { collection, addDoc, getDocs, query, orderBy, serverTimestamp, Timestamp, doc, deleteDoc, updateDoc } from 'firebase/firestore';

const contactSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email.' }),
  subject: z.string().min(1, { message: 'Please select a subject.' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters.' }),
});

type FormState = {
  message: string;
  errors?: {
    name?: string[];
    email?:string[];
    subject?: string[];
    message?: string[];
  };
  success: boolean;
};

/**
 * Submits contact form data to the 'Messages' collection in Firestore.
 * It validates the data against a schema before saving.
 * @param {z.infer<typeof contactSchema>} data - The contact form data.
 * @returns {Promise<FormState>} A state object indicating success or failure.
 */
export async function submitContactForm(
  data: z.infer<typeof contactSchema>
): Promise<FormState> {
  const parsed = contactSchema.safeParse(data);

  if (!parsed.success) {
    return {
      message: 'Failed to save message. Please check your input.',
      errors: parsed.error.flatten().fieldErrors,
      success: false,
    };
  }

  try {
    await addDoc(collection(db, 'Messages'), {
      ...parsed.data,
      createdAt: serverTimestamp(),
      read: false,
    });

    return { message: 'Your message has been sent successfully!', success: true };
  } catch (e: any) {
    console.error('Failed to save message to Firestore:', e);
    const errorMessage = e.message || 'An unknown error occurred.';
    return { message: `Error saving message: ${errorMessage}. Please try again later.`, success: false };
  }
}

/**
 * Verifies if the provided password matches the admin password in environment variables.
 * This is used to protect the admin panel.
 * @param {string} password - The password to verify.
 * @returns {Promise<{success: boolean; error?: string}>} An object indicating if authentication was successful.
 */
export async function verifyAdminPassword(password: string): Promise<{success: boolean; error?: string}> {
    if (password === process.env.ADMIN_PASSWORD) {
        return { success: true };
    } else {
        return { success: false, error: 'Invalid password.' };
    }
}

export interface Message {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
  read: boolean;
}

/**
 * Fetches all messages from the 'Messages' collection in Firestore, ordered by creation date.
 * This is for the admin panel to display received messages.
 * @returns {Promise<{ messages?: Message[]; error?: string; }>} An object containing messages or an error.
 */
export async function getMessages(): Promise<{ messages?: Message[]; error?: string; }> {
  try {
    const messagesCollection = collection(db, 'Messages');
    const q = query(messagesCollection, orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    const messagesData = querySnapshot.docs.map(doc => {
      const data = doc.data();
      const createdAtTimestamp = data.createdAt as Timestamp;
      return {
        id: doc.id,
        name: data.name,
        email: data.email,
        subject: data.subject,
        message: data.message,
        read: data.read || false,
        createdAt: createdAtTimestamp ? createdAtTimestamp.toDate().toISOString() : new Date().toISOString(),
      };
    });
    return { messages: messagesData };
  } catch (err: any) {
    console.error('Error fetching messages from server action:', err);
    return { error: 'Failed to load messages: ' + err.message };
  }
}

/**
 * Deletes a specific message from the Firestore 'Messages' collection.
 * This is an administrative action.
 * @param {string} id - The ID of the message to delete.
 * @returns {Promise<{ success: boolean; error?: string }>} An object indicating success or failure.
 */
export async function deleteMessage(id: string): Promise<{ success: boolean; error?: string }> {
  try {
    await deleteDoc(doc(db, 'Messages', id));
    return { success: true };
  } catch (err: any) {
    console.error('Error deleting message:', err);
    return { success: false, error: err.message };
  }
}

/**
 * Toggles the 'read' status of a message in the Firestore collection.
 * This helps admins track which messages have been reviewed.
 * @param {string} id - The ID of the message to update.
 * @param {boolean} currentStatus - The current 'read' status of the message.
 * @returns {Promise<{ success: boolean; error?: string }>} An object indicating success or failure.
 */
export async function toggleMessageReadStatus(id: string, currentStatus: boolean): Promise<{ success: boolean; error?: string }> {
  try {
    await updateDoc(doc(db, 'Messages', id), { read: !currentStatus });
    return { success: true };
  } catch (err: any) {
    console.error('Error updating message status:', err);
    return { success: false, error: err.message };
  }
}
