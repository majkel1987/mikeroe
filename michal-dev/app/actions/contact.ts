'use server';

import { z } from 'zod';
import { sendContactEmail } from '@/lib/email';

const contactSchema = z.object({
  name: z.string().min(2, 'Imię musi mieć co najmniej 2 znaki'),
  email: z.string().email('Niepoprawny adres email'),
  company: z.string().optional(),
  subject: z.string().min(1, 'Wybierz temat wiadomości'),
  message: z.string().min(10, 'Wiadomość musi mieć co najmniej 10 znaków').max(2000, 'Maksymalnie 2000 znaków'),
  website: z.string().optional(), // honeypot
});

type ContactFormErrors = {
  [key: string]: string;
} | {
  form: string;
};

type ContactFormResponse =
  | { success: true }
  | { success: false; errors: ContactFormErrors };

export async function submitContact(
  _prevState: unknown,
  formData: FormData
): Promise<ContactFormResponse> {
  // Extract fields from FormData
  const rawData = {
    name: formData.get('name') as string | null,
    email: formData.get('email') as string | null,
    company: formData.get('company') as string | null,
    subject: formData.get('subject') as string | null,
    message: formData.get('message') as string | null,
    website: formData.get('website') as string | null,
  };

  // Honeypot check - if filled, it's a bot - silently return success
  if (rawData.website && rawData.website.length > 0) {
    return { success: true };
  }

  // Validate with Zod
  const result = contactSchema.safeParse({
    name: rawData.name ?? '',
    email: rawData.email ?? '',
    company: rawData.company ?? '',
    subject: rawData.subject ?? '',
    message: rawData.message ?? '',
    website: rawData.website ?? '',
  });

  if (!result.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of result.error.issues) {
      const fieldName = issue.path[0] as string;
      if (!fieldErrors[fieldName]) {
        fieldErrors[fieldName] = issue.message;
      }
    }
    return { success: false, errors: fieldErrors };
  }

  // Send email
  try {
    await sendContactEmail({
      name: result.data.name,
      email: result.data.email,
      company: result.data.company,
      subject: result.data.subject,
      message: result.data.message,
    });

    return { success: true };
  } catch (error) {
    console.error('Failed to send contact email:', error);
    return {
      success: false,
      errors: { form: 'Nie udało się wysłać wiadomości. Spróbuj ponownie.' },
    };
  }
}
