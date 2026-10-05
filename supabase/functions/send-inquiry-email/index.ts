import { createClient } from "npm:@supabase/supabase-js@2.57.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const { package_name, name, phone, email, event_name, message } = await req.json();

    if (!package_name || !name || !phone || !email || !event_name) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    const notifyEmail = Deno.env.get("NOTIFY_EMAIL") || "kanavuthirai03@gmail.com";

    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f9f5f0; padding: 30px; border-radius: 8px;">
        <div style="text-align: center; margin-bottom: 25px;">
          <h1 style="color: #19002d; font-size: 22px; letter-spacing: 2px; margin: 0;">KANAVU THIRAI</h1>
          <p style="color: #e9b93f; font-size: 12px; letter-spacing: 3px; margin: 5px 0 0;">NEW PACKAGE INQUIRY</p>
        </div>
        <div style="background: #fff; padding: 30px; border-radius: 6px; border: 1px solid #e0d8cc;">
          <h2 style="color: #19002d; font-size: 18px; margin: 0 0 20px;">New inquiry for ${package_name}</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; color: #8a808c; font-size: 13px; width: 120px;">Package</td><td style="padding: 8px 0; color: #19002d; font-size: 14px; font-weight: bold;">${package_name}</td></tr>
            <tr><td style="padding: 8px 0; color: #8a808c; font-size: 13px;">Name</td><td style="padding: 8px 0; color: #19002d; font-size: 14px;">${name}</td></tr>
            <tr><td style="padding: 8px 0; color: #8a808c; font-size: 13px;">Phone</td><td style="padding: 8px 0; color: #19002d; font-size: 14px;">${phone}</td></tr>
            <tr><td style="padding: 8px 0; color: #8a808c; font-size: 13px;">Email</td><td style="padding: 8px 0; color: #19002d; font-size: 14px;">${email}</td></tr>
            <tr><td style="padding: 8px 0; color: #8a808c; font-size: 13px;">Event</td><td style="padding: 8px 0; color: #19002d; font-size: 14px;">${event_name}</td></tr>
            ${message ? `<tr><td style="padding: 8px 0; color: #8a808c; font-size: 13px; vertical-align: top;">Message</td><td style="padding: 8px 0; color: #19002d; font-size: 14px;">${message}</td></tr>` : ""}
          </table>
        </div>
        <p style="text-align: center; color: #b0a8b0; font-size: 11px; margin-top: 20px;">This inquiry was submitted from the Kanavu Thirai website.</p>
      </div>
    `;

    if (resendApiKey) {
      const resendResponse = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${resendApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Kanavu Thirai <onboarding@resend.dev>",
          to: [notifyEmail],
          subject: `New inquiry: ${package_name} — ${name}`,
          html: emailHtml,
        }),
      });

      if (!resendResponse.ok) {
        const errText = await resendResponse.text();
        console.error("Resend error:", errText);
        return new Response(
          JSON.stringify({ error: "Failed to send email", details: errText }),
          { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      return new Response(
        JSON.stringify({ success: true, message: "Email sent" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ success: true, message: "Inquiry received (email not configured)" }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
