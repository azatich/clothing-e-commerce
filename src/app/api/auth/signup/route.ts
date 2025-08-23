import { supabase } from "@/app/lib/supabaseClient";

export async function POST(req: Request) {
  try {
    const { email, password, username, phone } = await req.json();

    if (!email || !password || !username || !phone) {
      return new Response(
        JSON.stringify({ message: "All fields are required" }),
        { status: 400 }
      );
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { username, phone },
      },
    });

    if (error) {
      return new Response(JSON.stringify({ message: error.message }), {
        status: 400,
      });
    }

    return new Response(
      JSON.stringify({
        message: "User registered successfully",
        user: data.user,
      }),
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: "Internal server error" }), {
      status: 500,
    });
  }
}
