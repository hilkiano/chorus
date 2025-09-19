"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { H3, Muted } from "@/components/ui/typography";

export default function SignInCard() {
  const handleGoogleSignIn = async () => {
    const data = await authClient.signIn.social({
      provider: "google",
    });
  };

  return (
    <Card className="w-full sm:w-96 mx-auto">
      <CardHeader>
        <H3>Sign In</H3>
        <Muted className="font-medium text-md">
          Use following social provider below
        </Muted>
      </CardHeader>
      <CardContent>
        <Button onClick={handleGoogleSignIn} className="w-full">
          Sign In with Google
        </Button>
      </CardContent>
    </Card>
  );
}
