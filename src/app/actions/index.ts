import { cookies, headers } from "next/headers";

export async function getUpcomingEvents() {
  // const delay = (ms) => new Promise((res) => setTimeout(res, ms));
  const token = cookies().get("AUTH_SESSION_TOKEN");
  console.log(token);

  try {
    const response = await fetch("http://localhost:3000/api/tournaments", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: `${process.env.TOKEN_NAME}=${token?.value}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}
