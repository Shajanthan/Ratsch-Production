import { useState, useCallback, type FormEvent } from "react";
import { useToast } from "@/context/ToastContext";
import { sendContactForm } from "@/services/contactService";

export interface UseContactFormOptions {
  /** When true, errors use `formError` only (for themed inline alerts); toasts are not used for errors. */
  inlineErrorsOnly?: boolean;
}

export function useContactForm(options?: UseContactFormOptions) {
  const inlineErrorsOnly = options?.inlineErrorsOnly === true;
  const toast = useToast();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const submit = useCallback(
    async (e?: FormEvent) => {
      e?.preventDefault();
      setFormError(null);
      if (!name.trim() || !email.trim() || !message.trim()) {
        const msg = "Please fill in all fields.";
        setFormError(msg);
        if (!inlineErrorsOnly) toast.error(msg);
        return;
      }
      setSubmitting(true);
      try {
        await sendContactForm({
          name: name.trim(),
          email: email.trim(),
          message: message.trim(),
        });
        toast.success("Message sent. We'll get back to you soon.");
        setName("");
        setEmail("");
        setMessage("");
        setFormError(null);
      } catch (err: unknown) {
        const msg =
          err instanceof Error ? err.message : "Failed to send message.";
        setFormError(msg);
        if (!inlineErrorsOnly) toast.error(msg);
      } finally {
        setSubmitting(false);
      }
    },
    [name, email, message, toast, inlineErrorsOnly],
  );

  return {
    name,
    setName,
    email,
    setEmail,
    message,
    setMessage,
    submitting,
    submit,
    formError,
  };
}
