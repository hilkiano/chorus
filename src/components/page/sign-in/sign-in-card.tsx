"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

export default function SignInCard() {
  const handleGoogleSignIn = async () => {
    await authClient.signIn.social({
      provider: "google",
    });
  };

  return (
    <Card className="w-full sm:w-96 mx-auto">
      <CardHeader className="typography">
        <h3>Sign In</h3>
      </CardHeader>
      <CardContent>
        <Button onClick={handleGoogleSignIn} className="w-full">
          Sign In with Google
        </Button>
      </CardContent>
    </Card>
  );
}
