'use server';

import { headers } from 'next/headers';
import { z } from 'zod';
import { sendContactEmail } from '@/lib/email';
import { checkContactRateLimit } from '@/lib/rate-limit';

const messages = {
  pl: {
    name: 'Podaj imię (minimum 2 znaki).',
    email: 'Podaj poprawny adres e-mail.',
    project: 'Wybierz rodzaj projektu.',
    messageMin: 'Napisz co najmniej 20 znaków.',
    messageMax: 'Wiadomość może mieć maksymalnie 2000 znaków.',
    fast: 'Formularz został wysłany zbyt szybko. Spróbuj ponownie.',
    origin: 'Nie udało się potwierdzić źródła formularza. Odśwież stronę i spróbuj ponownie.',
    rate: 'Osiągnięto limit wiadomości. Spróbuj ponownie za godzinę.',
    send: 'Nie udało się wysłać wiadomości. Spróbuj ponownie lub napisz bezpośrednio na e-mail.',
  },
  en: {
    name: 'Enter your name (at least 2 characters).',
    email: 'Enter a valid email address.',
    project: 'Select a project type.',
    messageMin: 'Write at least 20 characters.',
    messageMax: 'The message can contain up to 2000 characters.',
    fast: 'The form was submitted too quickly. Try again.',
    origin: 'The form source could not be confirmed. Refresh the page and try again.',
    rate: 'The message limit has been reached. Try again in one hour.',
    send: 'The message could not be sent. Try again or email me directly.',
  },
} as const;

const contactSchema = (locale: 'pl' | 'en') => {
  const t = messages[locale];
  return z.object({
    name: z.string().trim().min(2, t.name).max(100, t.name),
    email: z.string().trim().email(t.email).max(254, t.email),
    projectType: z.string().trim().min(1, t.project).max(100, t.project),
    budget: z.string().trim().max(100).optional(),
    deadline: z.string().trim().max(100).optional(),
    message: z.string().trim().min(20, t.messageMin).max(2000, t.messageMax),
    website: z.string().optional(),
  });
};

export type ContactFormErrors = Partial<Record<
  'name' | 'email' | 'projectType' | 'budget' | 'deadline' | 'message' | 'form',
  string
>>;

export type ContactFormResponse =
  | { success: true }
  | { success: false; errors: ContactFormErrors };

function isTrustedOrigin(origin: string | null, host: string | null) {
  if (!origin || !host) return process.env.NODE_ENV !== 'production';
  try {
    const originUrl = new URL(origin);
    return originUrl.host === host || (originUrl.hostname === 'localhost' && host.startsWith('localhost'));
  } catch {
    return false;
  }
}
export async function submitContact(
  _prevState: unknown,
  formData: FormData,
): Promise<ContactFormResponse> {
  const locale = formData.get('locale') === 'en' ? 'en' : 'pl';
  const t = messages[locale];
  const headerList = headers();

  if (!isTrustedOrigin(headerList.get('origin'), headerList.get('host'))) {
    return { success: false, errors: { form: t.origin } };
  }

  const rawData = {
    name: String(formData.get('name') ?? ''),
    email: String(formData.get('email') ?? ''),
    projectType: String(formData.get('projectType') ?? ''),
    budget: String(formData.get('budget') ?? ''),
    deadline: String(formData.get('deadline') ?? ''),
    message: String(formData.get('message') ?? ''),
    website: String(formData.get('website') ?? ''),
  };

  if (rawData.website) return { success: true };

  const startedAt = Number(formData.get('startedAt'));
  if (!Number.isFinite(startedAt) || Date.now() - startedAt < 2500) {
    return { success: false, errors: { form: t.fast } };
  }

  const forwardedFor = headerList.get('x-forwarded-for');
  const clientIp = forwardedFor?.split(',')[0]?.trim() || headerList.get('x-real-ip') || 'unknown';
  if (!checkContactRateLimit(clientIp)) {
    return { success: false, errors: { form: t.rate } };
  }

  const result = contactSchema(locale).safeParse(rawData);
  if (!result.success) {
    const fieldErrors: ContactFormErrors = {};
    for (const issue of result.error.issues) {
      const fieldName = issue.path[0] as keyof ContactFormErrors;
      fieldErrors[fieldName] ??= issue.message;
    }
    return { success: false, errors: fieldErrors };
  }

  try {
    await sendContactEmail({
      name: result.data.name,
      email: result.data.email,
      company: [result.data.projectType, result.data.budget, result.data.deadline].filter(Boolean).join(' · '),
      subject: `[${locale.toUpperCase()}] ${result.data.projectType}`,
      message: result.data.message,
    });
    return { success: true };
  } catch {
    return { success: false, errors: { form: t.send } };
  }
}
