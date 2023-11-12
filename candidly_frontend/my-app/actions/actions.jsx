"use server";

import { revalidatePath } from "next/cache";

export async function submitRegistrationForm(formData) {
  revalidatePath("/sign_up");
  const name = formData.get("name")?.toString();
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();
  const confirmPassword = formData.get("confirmPassword")?.toString();

  if (!name || !email || !password) throw new Error("BLANK_FIELD");

  if (password !== confirmPassword) {
    throw new Error("PASSWORD_MISMATCH");
  }

  const formFields = {
    name,
    email,
    password,
  };

  try {
    const response = await fetch(`${process.env.LOCAL_ENDPOINT}/api/users`, {
      method: "POST",
      body: JSON.stringify(formFields),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      return { success: true };
    } else {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function submitResetPasswordMail(formData) {
  const email = formData.get("email")?.toString();

  if (!email) throw new Error("BLANK_FIELD");

  const formFields = {
    email,
  };
  revalidatePath("/forgot_password");

  try {
    const response = await fetch(
      `${process.env.LOCAL_ENDPOINT}/api/users/forgot-password`,
      {
        method: "POST",
        body: JSON.stringify(formFields),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function submitNewPasswordForm(formData) {
  const password = formData.get("password")?.toString();
  const confirmPassword = formData.get("confirmPassword")?.toString();
  const token = formData.get("token")?.toString();

  if (!password) throw new Error("BLANK_FIELD");

  if (password !== confirmPassword) {
    throw new Error("PASSWORD_MISMATCH");
  }

  const formFields = {
    password,
  };
  revalidatePath("/reset_password/[reset]");

  try {
    const response = await fetch(
      `${process.env.LOCAL_ENDPOINT}/api/users/reset_password/${token}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formFields),
      }
    );
    if (response.ok) {
      // return { success: true };
      const data = await response.json();
      return data;
    } else {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function sendMessage(formData) {
  revalidatePath("/sign_up");
  const header = formData.get("header")?.toString();
  const content = formData.get("content")?.toString();
  const receiverId = formData.get("receiverId")?.toString();
  const imageFile = formData.get("imageFile")?.toString();

  if (!header || !content || !receiverId) throw new Error("BLANK_FIELD");

  const formFields = {
    header,
    content,
    receiverId,
    imageFile,
  };

  try {
    const response = await fetch(
      `${process.env.LOCAL_ENDPOINT}/api/messages/send-message/${header}`, {
      method: "POST",
      body: JSON.stringify(formFields),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      return { success: true };
    } else {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    throw new Error(error.message);
  }
}
