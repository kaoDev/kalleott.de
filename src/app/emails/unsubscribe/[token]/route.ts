import { decryptEmail } from "@/lib/emailToken";
import { unsubscribeFromUpdates } from "@/lib/unsubscribeFromUpdates";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  _req: NextRequest,
  { params }: { params: { token: string } },
) {
  try {
    const email = decryptEmail(params.token);

    const result = await unsubscribeFromUpdates(
      { error: null, message: null },
      { email },
    );

    if (result.error) {
      redirect("/emails/unsubscribe");
    }
  } catch (error) {
    redirect("/emails/unsubscribe");
  }

  const response = new NextResponse(
    `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="refresh" content="20;url=/">
  <title>Successfully unsubscribed</title>
</head>
<body>
  <p>
    You have been successfully unsubscribed from updates.
  </p>
</body>
</html>    
`,
    { status: 202 },
  );

  return response;
}

export async function GET(
  req: NextRequest,
  { params }: { params: { token: string } },
) {
  redirect(`/emails/unsubscribe/?email=${params.token}`);
}
