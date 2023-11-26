"use server";

// import { response } from "express";
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
    // const response = await fetch(`${process.env.LOCAL_ENDPOINT}/api/users`, {
      const response = await fetch(`${process.env.PRODUCTION_ENDPOINT}/api/users`, {
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
      // `${process.env.LOCAL_ENDPOINT}/api/users/forgot-password`,
      `${process.env.PRODUCTION_ENDPOINT}/api/users/forgot-password`,
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
      // `${process.env.LOCAL_ENDPOINT}/api/users/reset_password/${token}`,
      `${process.env.PRODUCTION_ENDPOINT}/api/users/reset_password/${token}`,
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
  const imageFile = formData.get("imageFile");

  if (!header || !content || !receiverId) throw new Error("BLANK_FIELD");

  const form = new FormData();

  // Append fields to the FormData object
  form.append("header", header);
  form.append("content", content);
  form.append("receiverId", receiverId);
  // if (imageFile.name === "undefined") {
  //   form.append("imageFile", imageFile);
  // }
  if (imageFile && imageFile.type.startsWith("image/")) {
    form.append("imageFile", imageFile);
  }
  

  console.log(imageFile.name)
  console.log(form)


  try {
    const response = await fetch(
      // `${process.env.LOCAL_ENDPOINT}/api/messages/send-message/${header}`, {
        `${process.env.PRODUCTION_ENDPOINT}/api/messages/send-message/${header}`, {
      method: "POST",
      body: form,
      // headers: {
      //   "Content-Type": "application/json",
      // },
    });
    if (response.ok) {
      return { success: true };
    } else {
      const errorData = await response.json();
      console.log(errorData)
      throw new Error(errorData.message || errorData.error);
    }
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
}

export async function getMessages(token) {
  revalidatePath("/dashboard");
  try {
    const response = await fetch(
      // `${process.env.LOCAL_ENDPOINT}/api/messages/my_messages`, {
        `${process.env.PRODUCTION_ENDPOINT}/api/messages/my_messages`, {
        method: "GET",
        headers: {
          // Authorization: `Bearer ${session.accessToken}`,
          "x-authentication": `${token}`,
        },
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function verifyMail(token) {
  // revalidatePath("/dashboard");
  try {
    const response = await fetch(
      // `${process.env.LOCAL_ENDPOINT}/verify/${token}`, {
        `${process.env.PRODUCTION_ENDPOINT}/verify/${token}`, {
        method: "GET",
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
}
