import { post } from "./requests";

export type ContactRequest = {
  fullName: string;
  email: string;
  interestedInBecoming?: string;
  message?: string;
};

type ContactResponse = { message: string } | { error: string };

export const sendContactRequest = async (
  contactRequest: ContactRequest,
): Promise<ContactResponse> => {
  try {
    const res = await post("/contact", contactRequest);
    return (await res.json()) as ContactResponse;
  } catch (error) {
    console.error("Error sending contact request:", error);
    throw error;
  }
};
