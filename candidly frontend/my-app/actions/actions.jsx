"use server";
// import { revalidatePath } from "next/dist/client/router";

export async function submitRegistrationForm(formData) {
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
    const response = await fetch("http://localhost:3001/api/users", {
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
