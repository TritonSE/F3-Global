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
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(contactRequest),
    });

    if (!response.ok) {
      const errorData = (await response.json()) as { error?: string };
      throw new Error(errorData.error || "Failed to send contact request.");
    }
    return (await response.json()) as ContactResponse;
  } catch (error) {
    console.error("Error sending contact request:", error);
    throw error;
  }
};
