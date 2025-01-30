import { Button, Card, CardBody, CardFooter, CardHeader, Input } from "@heroui/react";

export function SignIn() {
  return (
    <main className="w-screen h-screen gird place-items-center">
      <Card>
        <CardHeader>Iniciar sesión</CardHeader>
        <CardBody>
          <Input placeholder="Correo electrónico" />
        </CardBody>
        <CardFooter>
          <Button>Iniciar sesión</Button>
        </CardFooter>
      </Card>
    </main>
  );
}
