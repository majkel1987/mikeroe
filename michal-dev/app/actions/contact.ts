'use server';

import { headers } from 'next/headers';
import { z } from 'zod';
import { sendContactEmail } from '@/lib/email';
import { checkContactRateLimit } from '@/lib/rate-limit';

const contactSchema = z.object({
  name: z.string().min(2, 'Imię i nazwisko jest wymagane.'),
  email: z.string().email('Podaj poprawny adres email.'),
  company: z.string().optional(),
  subject: z.string().min(1, 'Wybierz typ projektu.'),
  message: z
    .string()
    .min(20, 'Opisz swój projekt (min. 20 znaków).')
    .max(2000, 'Maksymalnie 2000 znaków.'),
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

  const headerList = headers();
  const forwardedFor = headerList.get('x-forwarded-for');
  const clientIp =
    forwardedFor?.split(',')[0]?.trim() ||
    headerList.get('x-real-ip') ||
    'unknown';

  if (!checkContactRateLimit(clientIp)) {
    return {
      success: false,
      errors: {
        form: 'Zbyt wiele wiadomości. Spróbuj ponownie za godzinę.',
      },
    };
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
